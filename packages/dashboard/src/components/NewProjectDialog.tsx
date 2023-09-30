import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@apollo/client";
import { CREATE_PROJECT } from "@/helpers/backend/mutations";

function NewProjectDialog() {
  const [project, setProject] = useState<string>("");
  const [createProject, { data, loading, error }] = useMutation(CREATE_PROJECT);

  function handleClick() {
    createProject({ variables: { title: project } });
    setProject("");
    window.location.reload(false);
  }

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue={project}
              className="col-span-3"
              onChange={(e) => setProject(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleClick}>Create Project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default NewProjectDialog;
