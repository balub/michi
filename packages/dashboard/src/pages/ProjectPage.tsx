import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import DashboardContainer from "@/components/DashboardContainer";
import FeaturesTable from "@/components/FeaturesTable";
import UserRequestsTable from "@/components/UserRequestsTable";

function ProjectPage() {
  return (
    <DashboardContainer
      title="Project Title"
      buttonTitle="ProjectID"
      onClick={() => console.log("copied")}
    >
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="user_requests">User Requests</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="features">
          <FeaturesTable />
        </TabsContent>
        <TabsContent value="user_requests">
          <UserRequestsTable />
        </TabsContent>
        <TabsContent value="settings">To Add</TabsContent>
      </Tabs>
    </DashboardContainer>
  );
}

export default ProjectPage;
