export default function Mainheader() {
  return (
    <div className="text-center">
      <div className="flex flex-col items-center justify-center mx-auto">
        <h1 className="text-4xl font-bold text-gray-900">Diabeat</h1>
        <h2 className="text-xl text-gray-600 mt-2">
          Your Personal Diabetes Prediction Assistant
        </h2>
      </div>

      <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
        Powered by AI trained on the Pima Indians Diabetes Dataset and
        FHIR-first technology, Diabeat helps you predict your risk of diabetes
        with precision and confidence.
      </p>
    </div>
  );
}
