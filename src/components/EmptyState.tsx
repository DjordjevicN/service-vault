import { Link } from "react-router-dom";
import { Button } from "./ui/Button";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">No Meets Found</h2>
      <p className="text-muted-foreground mb-2">
        You can create your own meet or join an existing one to get started.
      </p>
      <p className="text-muted-foreground">
        Click below to view the full calendar of meets for this year.
      </p>
      <Link className="mt-6" to="/calendar">
        <Button>Full calendar</Button>
      </Link>
    </div>
  );
};

export default EmptyState;
