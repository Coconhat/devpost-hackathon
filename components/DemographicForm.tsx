"use client";
import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "./ui/progress";
import { supabase } from "@/lib/supabaseClient";

interface FormData {
  [key: string]: string | number;
}

const formSteps = [
  {
    id: "demographic",
    title: "Demographic Information",
    description: "Enter your demographic here",
    fields: [
      {
        id: "name",
        label: "Name",
        type: "text",
        placeholder: "Name",
      },
      {
        id: "age",
        label: "Age",
        type: "number",
        placeholder: "Age",
      },
      {
        id: "gender",
        label: "Gender",
        type: "select",
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "other", label: "Other" },
        ],
      },
    ],
  },
  {
    id: "Health-metric",
    title: "Health Metric",
    description: "Enter your health metric here",
    fields: [
      {
        id: "height",
        label: "Height (cm)",
        type: "number",
        placeholder: "Enter your height",
      },
      {
        id: "weight",
        label: "Weight (kg)",
        type: "number",
        placeholder: "Enter your weight",
      },
      {
        id: "bloodPressure",
        label: "Blood Pressure",
        type: "number",
        placeholder: "Enter your blood pressure",
      },
    ],
  },
  {
    id: "Medical-history",
    title: "Medical History",
    description: "Enter your medical history here",
    fields: [
      {
        id: "familyHistory",
        label: "Family History of Diabetes",
        type: "select",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "historyofHypertension",
        label: "History of Hypertension",
        type: "select",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "historyofHighCholesterol",
        label: "History of High Cholesterol",
        type: "select",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
    ],
  },
  {
    id: "lifestyle-factors",
    title: "Lifestyle Factors",
    description: "Enter your lifestyle factors",
    fields: [
      {
        id: "physicalActivityLevel",
        label: "Physical Activity Level",
        type: "select",
        options: [
          { value: "sedentary", label: "sedentary" },
          { value: "moderate", label: "moderate" },
          { value: "active", label: "active" },
        ],
      },
      {
        id: "smokingStatus",
        label: "Smoking Status",
        type: "select",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "alcoholConsumption",
        label: "Alcohol Consumption",
        type: "select",
        options: [
          { value: "none", label: "none" },
          { value: "occasional", label: "occasional" },
          { value: "regular", label: "regular" },
        ],
      },
      {
        id: "dietAndNutrition",
        label: "frequency of Sugary/Processed Foods",
        type: "select",
        options: [
          { value: "none", label: "none" },
          { value: "occasional", label: "occasional" },
          { value: "regular", label: "regular" },
        ],
      },
    ],
  },
  {
    id: "clinicalMeasurements",
    title: "Clinical Measurements",
    description: "Enter your Clinical Measurements",
    fields: [
      {
        id: "fastingBloodGlucoseLevel",
        label: "Fasting Blood Glucose Level",
        type: "number",
        placeholder: "Enter number",
      },
      {
        id: "hbA1cLevel",
        label: "HbA1c Level",
        type: "number",
        placeholder: "Enter number",
      },
      {
        id: "triglycerideLevels",
        label: "Triglyceride Levels",
        type: "number",
        placeholder: "Enter number",
      },
      {
        id: "HDLCholestero",
        label: "HDL cholestero",
        type: "number",
        placeholder: "Enter number",
      },
      {
        id: "LDLCholesterol",
        label: "LDL cholesterol",
        type: "number",
        placeholder: "Enter number",
      },
    ],
  },
  {
    id: "symptoms",
    title: "Symptoms ",
    description: "Enter your symptoms ",
    fields: [
      {
        id: "frequentUrination",
        label: "Frequent Urination",
        type: "select",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "increasedThirst",
        label: "Increased Thirst",
        type: "select",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "blurredVision",
        label: "Blurred Vision",
        type: "select",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "slowHealing",
        label: "Slow-healing wounds",
        type: "select",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "fatigue",
        label: "Fatigue",
        type: "select",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "tinglingOrNumbnessInHandsOrFeet",
        label: "Tingling or numbness in hands/feet",
        type: "select",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "unexplainedWeightLoss",
        label: "Unexplained weight loss",
        type: "select",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "other",
        label: "Other",
        type: "text",
        placeholder: "Enter other symptoms",
      },
    ],
  },
];
interface TransformedData {
  name: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  blood_pressure: number;
  family_history: string;
  history_of_hypertension: string;
  history_of_high_cholesterol: string;
  physical_activity_level: string;
  smoking_status: string;
  alcohol_consumption: string;
  diet_and_nutrition: string;
  fasting_blood_glucose: number;
  hba1c_level: number;
  triglyceride_levels: number;
  hdl_cholesterol: number;
  ldl_cholesterol: number;
  frequent_urination: string;
  increased_thirst: string;
  blurred_vision: string;
  slow_healing: string;
  fatigue: string;
  tingling_or_numbness: string;
  unexplained_weight_loss: string;
  other_symptoms: string;
}

const validateFormData = (
  data: TransformedData
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Add basic validation
  if (!data.name) errors.push("Name is required");
  if (data.age <= 0) errors.push("Age must be greater than 0");
  if (!data.gender) errors.push("Gender is required");

  // Add validation for numeric fields
  if (data.height <= 0) errors.push("Height must be greater than 0");
  if (data.weight <= 0) errors.push("Weight must be greater than 0");

  return {
    isValid: errors.length === 0,
    errors,
  };
};

const transformFormData = (formData: FormData): TransformedData => {
  return {
    name: String(formData.name || ""),
    age: Number(formData.age) || 0,
    gender: String(formData.gender || ""),
    height: Number(formData.height) || 0,
    weight: Number(formData.weight) || 0,
    blood_pressure: Number(formData.bloodPressure) || 0,
    family_history: String(formData.familyHistory || ""),
    history_of_hypertension: String(formData.historyofHypertension || ""),
    history_of_high_cholesterol: String(
      formData.historyofHighCholesterol || ""
    ),
    physical_activity_level: String(formData.physicalActivityLevel || ""),
    smoking_status: String(formData.smokingStatus || ""),
    alcohol_consumption: String(formData.alcoholConsumption || ""),
    diet_and_nutrition: String(formData.dietAndNutrition || ""),
    fasting_blood_glucose: Number(formData.fastingBloodGlucoseLevel) || 0,
    hba1c_level: Number(formData.hbA1cLevel) || 0,
    triglyceride_levels: Number(formData.triglycerideLevels) || 0,
    hdl_cholesterol: Number(formData.HDLCholestero) || 0,
    ldl_cholesterol: Number(formData.LDLCholesterol) || 0,
    frequent_urination: String(formData.frequentUrination || ""),
    increased_thirst: String(formData.increasedThirst || ""),
    blurred_vision: String(formData.blurredVision || ""),
    slow_healing: String(formData.slowHealing || ""),
    fatigue: String(formData.fatigue || ""),
    tingling_or_numbness: String(
      formData.tinglingOrNumbnessInHandsOrFeet || ""
    ),
    unexplained_weight_loss: String(formData.unexplainedWeightLoss || ""),
    other_symptoms: String(formData.other || ""),
  };
};

const saveFormData = async (
  formData: FormData
): Promise<{ success: boolean; error?: string }> => {
  try {
    // Transform the data
    const transformedData = transformFormData(formData);

    // Validate the data
    const { isValid, errors } = validateFormData(transformedData);
    if (!isValid) {
      return {
        success: false,
        error: `Validation failed: ${errors.join(", ")}`,
      };
    }

    // Log the data being sent
    console.log("Sending data to Supabase:", transformedData);

    // Attempt to insert the data
    const { data, error } = await supabase
      .from("datadata")
      .insert([transformedData])
      .select("*")
      .single();

    // Log the full response
    console.log("Supabase Response:", { data, error });

    if (error) {
      console.error("Detailed Supabase error:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      return {
        success: false,
        error: `Database error: ${error.message}`,
      };
    }

    if (!data) {
      return {
        success: false,
        error: "No data returned from the database",
      };
    }

    return { success: true };
  } catch (error) {
    // Log any unexpected errors
    console.error("Unexpected error in saveFormData:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
};

export function DemographicForm() {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<Record<string, string | number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentStepData = formSteps[step];
  const progressPercentage = (step / formSteps.length) * 100;

  const handleNext = () => {
    if (step < formSteps.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleChange = (id: string, value: string | number) => {
    setFormData({ ...formData, [id]: value });
    setError(null); // Clear any previous errors when user makes changes
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Log the current form data
      console.log("Form data before submission:", formData);

      const result = await saveFormData(formData);

      if (result.success) {
        alert("Form submitted successfully!");
        setFormData({});
        setStep(0);
      } else {
        setError(result.error || "Failed to save data");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-[350px]">
      <Progress value={progressPercentage} />
      <CardHeader>
        <CardTitle>{currentStepData.title}</CardTitle>
        <CardDescription>{currentStepData.description}</CardDescription>
        {error && (
          <div className="text-red-500 text-sm mt-2">Error: {error}</div>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid w-full items-center gap-4">
            {currentStepData.fields.map((field) => (
              <div key={field.id} className="flex flex-col space-y-1.5">
                <Label htmlFor={field.id}>{field.label}</Label>
                {field.type === "select" ? (
                  <Select
                    value={formData[field.id]?.toString() || ""}
                    onValueChange={(value) => handleChange(field.id, value)}
                  >
                    <SelectTrigger id={field.id}>
                      <SelectValue placeholder={`Select ${field.label}`} />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {field.options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.id]?.toString() || ""}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={step === 0 || isSubmitting}
        >
          Previous
        </Button>
        {step === formSteps.length - 1 ? (
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        ) : (
          <Button onClick={handleNext} disabled={isSubmitting}>
            Next
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
