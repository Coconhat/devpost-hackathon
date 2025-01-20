import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function page() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[450px] m-4">
        <CardHeader>
          <CardTitle>
            <p className="text-lg">HIGH RISK</p>
          </CardTitle>
          <CardDescription>
            Based on your inputs, you are at High Risk of diabetes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h1 className="text-lg font-bold">Key Factors:</h1>
          <ul>
            <li>High blood pressure (140/90 mmHg)</li>
            <li>BMI of 32 (Obese)</li>
            <li>Family history of diabetes</li>
            <li>Sedentary lifestyle</li>
          </ul>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p>
            <span className="font-semibold">Personalized Recommendations:</span>{" "}
            Increase physical activity to at least 30 minutes per day. Focus on
            a balanced diet with reduced sugar and processed foods. Schedule
            regular check-ups with your doctor.
          </p>
        </CardFooter>
      </Card>

      <Card className="w-[750px] m-4">
        <CardHeader>
          <CardTitle>
            <p className="text-lg">What&apos;s Next?</p>
          </CardTitle>
          <CardDescription>
            Here are some steps you can take to manage your health effectively.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h1 className="text-lg font-semibold">Action Plan:</h1>
          <ul>
            <li>Start a daily 30-minute walking routine.</li>
            <li>
              Switch to a Mediterranean diet rich in vegetables and whole
              grains.
            </li>
            <li>Monitor your blood pressure weekly.</li>
            <li>Consult a nutritionist for a personalized meal plan.</li>
          </ul>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p>
            <span className="font-semibold">Additional Tips: </span> Stay
            hydrated, avoid sugary drinks, and get at least 7-8 hours of sleep
            each night. Consider joining a support group for motivation and
            guidance.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
