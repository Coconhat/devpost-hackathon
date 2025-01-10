import Mainheader from "../components/Mainheader";
import { DemographicForm } from "@/components/DemographicForm";

export default function Home() {
  return (
    <div>
      <Mainheader />

      <div className="flex justify-center">
        <DemographicForm />
      </div>
    </div>
  );
}
