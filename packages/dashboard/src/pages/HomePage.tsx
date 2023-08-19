import DashboardContainer from "@/components/DashboardContainer";
import ProjectCard from "@/components/ProjectCard";

function HomePage() {
  return (
    <DashboardContainer
      title="View Projects"
      buttonTitle="New Project"
      onClick={() => console.log("New project Create")}
    >
      <div>
        {Array(5)
          .fill(null)
          .map((u, i) => (
            <ProjectCard
              projectID={i.toString()}
              projectTitle={`Project ${i}`}
            />
          ))}
      </div>
    </DashboardContainer>
  );
}

export default HomePage;
