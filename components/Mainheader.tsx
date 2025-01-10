import React from "react";
import { Activity } from "lucide-react";

export default function MainHeader() {
  return (
    <header className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Logo and Title Section */}
          <div className="flex items-center space-x-3">
            <Activity className="w-10 h-10 text-blue-600" />
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Diabeat
            </h1>
          </div>

          {/* Subtitle */}
          <h2 className="text-2xl text-gray-700 font-medium">
            Your Personal Diabetes Prediction Assistant
          </h2>

          {/* Divider */}
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />

          {/* Description */}
          <p className="text-lg text-gray-600 text-center max-w-2xl leading-relaxed">
            Powered by advanced AI and trained on the comprehensive Pima Indians
            Diabetes Dataset, Diabeat combines{" "}
            <span className="text-blue-600 font-medium">
              FHIR-first technology
            </span>{" "}
            with precision analytics to provide you with accurate diabetes risk
            assessments and personalized insights.
          </p>
        </div>
      </div>
    </header>
  );
}
