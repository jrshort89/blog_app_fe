import { gql } from "@apollo/client";

export const ALL_GROUPS = gql`
  query {
    allGroups {
      createdAt
      id
      name
      totalFlashcards
    }
  }
`;
