const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

// Helper function to calculate age from birthdate
function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

// Example diabetes risk calculation logic
function calculateDiabetesRisk(age, bloodGlucose, hba1c) {
  if (bloodGlucose > 126 || hba1c > 6.5) {
    return "high";
  }
  if (age > 45 && (bloodGlucose > 100 || hba1c > 5.7)) {
    return "moderate";
  }
  return "low";
}

// CDS Services Discovery Endpoint
app.get("/cds-services", (req, res) => {
  res.json({
    services: [
      {
        hook: "patient-view",
        title: "Diabetes Prediction",
        description: "Predicts the risk of diabetes based on patient data.",
        id: "diabetes-prediction",
        prefetch: {
          Patient: "Patient/{{context.patientId}}",
          Observation:
            "Observation?patient={{context.patientId}}&code=2339-0,4548-4",
        },
      },
    ],
  });
});

// CDS Hook Endpoint
app.post("/cds-services/diabetes-prediction", (req, res) => {
  const { hook, context, prefetch } = req.body;

  // Extract patient data from the prefetch
  const patient = prefetch?.Patient;
  const observations = prefetch?.Observation;

  if (!patient || !observations) {
    return res
      .status(400)
      .json({ error: "Missing patient or observation data" });
  }

  // Extract relevant data for diabetes prediction
  const age = patient.birthDate ? calculateAge(patient.birthDate) : null;
  const bloodGlucose = observations.find(
    (obs) => obs.code?.coding?.[0]?.code === "2339-0" // LOINC code for blood glucose
  )?.valueQuantity?.value;

  const hba1c = observations.find(
    (obs) => obs.code?.coding?.[0]?.code === "4548-4" // LOINC code for HbA1c
  )?.valueQuantity?.value;

  // Perform diabetes risk calculation
  const riskLevel = calculateDiabetesRisk(age, bloodGlucose, hba1c);

  // Prepare the CDS Hook response
  const cards = [];
  if (riskLevel === "high") {
    cards.push({
      summary: "High Risk of Diabetes",
      detail:
        "This patient has a high risk of diabetes. Consider ordering an HbA1c test.",
      indicator: "warning",
      source: {
        label: "Diabetes Prediction App",
      },
      links: [
        {
          label: "Learn more about diabetes screening",
          url: "https://www.cdc.gov/diabetes/basics/getting-tested.html",
        },
      ],
    });
  } else if (riskLevel === "moderate") {
    cards.push({
      summary: "Moderate Risk of Diabetes",
      detail:
        "This patient has a moderate risk of diabetes. Consider lifestyle counseling.",
      indicator: "info",
      source: {
        label: "Diabetes Prediction App",
      },
      links: [
        {
          label: "Learn more about diabetes prevention",
          url: "https://www.cdc.gov/diabetes/prevention/index.html",
        },
      ],
    });
  }

  res.json({ cards });
});

// Start the server
const PORT = 4433;
app.listen(PORT, () => {
  console.log(`CDS Hook service running at https://localhost:${PORT}`);
});
