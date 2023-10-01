import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Project } from "@/types/Project";
import moment from "moment";
import TagsList from "./TagsList";

interface IProps {
  data: Project[];
}

function FeaturesTable({ data }: IProps) {
  return (
    <Table>
      <TableCaption>All project features</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Feature</TableHead>
          <TableHead>Upvotes</TableHead>
          <TableHead>Tags</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow>
            <TableCell className="font-medium">{item.feature}</TableCell>
            <TableCell>{item.upvotes}</TableCell>
            <TableCell>
              <TagsList tags={item.tags} />
            </TableCell>
            <TableCell>
              {moment(item.createdAt).format("MMMM Do YYYY")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default FeaturesTable;
