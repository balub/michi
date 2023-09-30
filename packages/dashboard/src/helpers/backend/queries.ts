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
