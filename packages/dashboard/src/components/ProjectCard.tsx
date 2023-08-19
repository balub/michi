import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

import { Button } from "./ui/button";

interface InputProps {
  projectID: string;
  projectTitle: string;
}

function ProjectCard(props: InputProps) {
  const navigate = useNavigate();

  return (
    <Card
      className="m-4"
      onClick={() => navigate(`/project/${props.projectID}`)}
    >
      <CardHeader className="flex flex-row items-center justify-between ">
        <CardTitle>{props.projectTitle}</CardTitle>
        <Button>View</Button>
      </CardHeader>
    </Card>
  );
}

export default ProjectCard;
