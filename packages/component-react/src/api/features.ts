export enum Tags{
    IN_PROGRESS="IN_PROGRESS",
    BUILT="BUILT",
    CANCELLED="CANCELLED",
    BACKLOG="BACKLOG",
    NEWLY_ADDED="NEWLY_ADDED"
}

export interface IFeatures {
  createdAt: string;
  feature: string;
  id: string;
  tags: Tags[];
  upvotes: number;
  votedUsers: string[];
}

export const fetchFeatures = async (token: string): Promise<IFeatures[]> => {
  const response = await fetch(`/features/${token}`);

  if (!response.ok) {
    console.error(response);
    throw new Error("Something went wrong");
  }

  const responseData: IFeatures[] = await response.json();
  return responseData;
};
