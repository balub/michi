export enum Tags{
    ALL="",
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

export const upvoteFeature = async (featureId:string,email:string) =>{
  const response = await fetch(`/features/upvote/${featureId}`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({email})
  });

  if (!response.ok) {
    console.error(response);
    if(response?.status === 409){
      throw new Error("You have already voted");  
    }
    throw new Error(`${response?.status}`);
  } 
  
  const responseData = await response.json()
  return responseData
}