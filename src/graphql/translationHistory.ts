import { gql } from "@apollo/client";

export const TRANSLATION_HISTORY = gql`
  query {
    translationHistory {
      englishText
      id
      spanishText
    }
  }
`;
