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

export function DemographicForm() {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<Record<string, string | number>>({});

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
  };
  return (
    <Card className="w-[350px]">
      <Progress value={progressPercentage} />
      <CardHeader>
        <CardTitle>{currentStepData.title}</CardTitle>
        <CardDescription>{currentStepData.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
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
                      {field.options.map((option) => (
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
          disabled={step === 0}
        >
          Previous
        </Button>
        <Button onClick={handleNext} disabled={step === formSteps.length - 1}>
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
