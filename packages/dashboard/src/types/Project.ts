export type Project = {
  id: string;
  feature: string;
  upvotes: number;
  votedUsers: string[];
  tags: string[];
  createdAt: string;
};

export enum Tags {
  IN_PROGRESS = "IN_PROGRESS",
  BUILT = "BUILT",
  CANCELLED = "CANCELLED",
  BACKLOG = "BACKLOG",
  NEWLY_ADDED = "NEWLY_ADDED",
}
