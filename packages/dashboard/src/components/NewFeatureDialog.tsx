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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@apollo/client";
import { CREATE_NEW_FEATURE } from "@/helpers/backend/mutations";

interface IProps {
  projectID: string;
}

interface TagProp {
  tag: string;
}

function NewFeatureDialog({ projectID }: IProps) {
  const [feature, setFeature] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [createFeature, { data, loading, error }] =
    useMutation(CREATE_NEW_FEATURE);

  function handleClick() {
    createFeature({
      variables: { featureTitle: feature, projectId: projectID, tags: tags },
    });
    setFeature("");
    setTags([]);
    window.location.reload(false);
  }

  function FeatureDropDownItem({ tag }: TagProp) {
    return (
      <DropdownMenuItem onClick={() => setTags([...tags, tag])}>
        {tags.includes(tag) ? `* ${tag}` : tag}
      </DropdownMenuItem>
    );
  }

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New Feature</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Feature</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue={feature}
              className="col-span-3"
              onChange={(e) => setFeature(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tags" className="text-right">
              Tags
            </Label>
            <DropdownMenu id="tags">
              <DropdownMenuTrigger>Add Tags</DropdownMenuTrigger>
              <DropdownMenuContent>
                <FeatureDropDownItem tag={"IN_PROGRESS"} />
                <FeatureDropDownItem tag={"BUILT"} />
                <FeatureDropDownItem tag={"CANCELLED"} />
                <FeatureDropDownItem tag={"BACKLOG"} />
                <FeatureDropDownItem tag={"NEWLY_ADDED"} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleClick}>Create Feature</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default NewFeatureDialog;
