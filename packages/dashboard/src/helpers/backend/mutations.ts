import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
  mutation CreateProject($title: String!) {
    createProject(title: $title) {
      id
      title
      createdAt
    }
  }
`;

export const ACCEPT_USER_REQUEST = gql`
  mutation AcceptUserRequest($userRequestId: String!) {
    acceptUserRequest(userRequestId: $userRequestId) {
      id
    }
  }
`;

export const REJECT_USER_REQUEST = gql`
  mutation RejectUserRequest($userRequestId: String!) {
    rejectUserRequest(userRequestId: $userRequestId)
  }
`;

export const CREATE_NEW_FEATURE = gql`
  mutation CreateFeature(
    $featureTitle: String!
    $projectId: String!
    $tags: [Tags!]!
  ) {
    createFeature(
      featureTitle: $featureTitle
      projectID: $projectId
      tags: $tags
    ) {
      id
    }
  }
`;
