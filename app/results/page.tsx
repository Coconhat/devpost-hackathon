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
    <div className="flex">
      <Card className="w-[450px] m-20 ">
        <CardHeader>
          <CardTitle>HIGH RISK</CardTitle>
          <CardDescription>
            Based on your inputs, you are at High Risk of diabetes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h1>Key Factors:</h1>
          <ul>
            <li>high blood pressure</li>
            <li>abc</li>
            <li>abc</li>
            <li>abc</li>
          </ul>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p>
            Personalized Recommendations: Provide actionable recommendations to
            help the user reduce their risk or manage their condition. Example:
            We recommend increasing your physical activity to at least 30
            minutes per day. Consider reducing your intake of sugary and
            processed foods.
          </p>
        </CardFooter>
      </Card>

      <Card className="w-[750px] m-20">
        <CardHeader>
          <CardTitle>Whats next?</CardTitle>
          <CardDescription>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h1>Key Factors:</h1>
          <ul>
            <li>high blood pressure</li>
            <li>abc</li>
            <li>abc</li>
            <li>abc</li>
          </ul>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p>
            Personalized Recommendations: Provide actionable recommendations to
            help the user reduce their risk or manage their condition. Example:
            We recommend increasing your physical activity to at least 30
            minutes per day. Consider reducing your intake of sugary and
            processed foods.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
