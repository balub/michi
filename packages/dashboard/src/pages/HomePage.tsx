import DashboardContainer from "@/components/DashboardContainer";
import NewProjectDialog from "@/components/NewProjectDialog";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { CREATE_PROJECT } from "@/helpers/backend/mutations";
import { LIST_ALL_PROJECTS } from "@/helpers/backend/queries";
import { useMutation, useQuery } from "@apollo/client";

function HomePage() {
  const { loading, error, data } = useQuery(LIST_ALL_PROJECTS);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <DashboardContainer
      title="View Projects"
      actionElement={<NewProjectDialog />}
    >
      <div>
        {data.listAllProjects.map((item) => (
          <ProjectCard projectID={item.id} projectTitle={item.title} />
        ))}
      </div>
    </DashboardContainer>
  );
}

export default HomePage;
