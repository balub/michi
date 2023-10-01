import { gql } from "@apollo/client";

export const LIST_ALL_PROJECTS = gql`
  query ListAllProjects {
    listAllProjects {
      id
      title
      createdAt
    }
  }
`;

export const LIST_PROJECT_INFO = gql`
  query Project($projectId: String!) {
    project(projectID: $projectId) {
      id
      title
      createdAt
      features {
        id
        feature
        upvotes
        votedUsers
        tags
        createdAt
      }
      userRequests {
        id
        request
        requestBy
        createdAt
      }
    }
  }
`;
