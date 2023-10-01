import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import DashboardContainer from "@/components/DashboardContainer";
import FeaturesTable from "@/components/FeaturesTable";
import UserRequestsTable from "@/components/UserRequestsTable";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { LIST_PROJECT_INFO } from "@/helpers/backend/queries";
import { useToast } from "@/components/ui/use-toast";

function ProjectPage() {
  const params = useParams();
  const { toast } = useToast();

  const { loading, error, data } = useQuery(LIST_PROJECT_INFO, {
    variables: { projectId: params.projectID },
  });

  function handleClick() {
    toast({
      title: "Project ID Copied",
    });
    navigator.clipboard.writeText(params.projectID);
  }

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <DashboardContainer
      title={data.project.title}
      actionElement={<Button onClick={handleClick}>PROJECT ID</Button>}
    >
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="user_requests">User Requests</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="features">
          <FeaturesTable data={data.project.features} />
        </TabsContent>
        <TabsContent value="user_requests">
          <UserRequestsTable data={data.project.userRequests} />
        </TabsContent>
        <TabsContent value="settings">To Add</TabsContent>
      </Tabs>
    </DashboardContainer>
  );
}

export default ProjectPage;
