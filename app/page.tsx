import { Progress } from "@/components/ui/progress";
import Mainheader from "../components/Mainheader";
import { DemographicForm } from "@/components/DemographicForm";

export default function Home() {
  return (
    <div>
      <Mainheader />

      <div className="flex justify-center mt-7">
        <Progress value={33} />
      </div>

      <div className="flex justify-center mt-7">
        <DemographicForm />
      </div>
    </div>
  );
}
