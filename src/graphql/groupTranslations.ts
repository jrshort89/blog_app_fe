import { gql } from "@apollo/client";

export const GROUP_TRANSLATIONS = gql`
  query ($groupId: Int!) {
    groupTranslations(groupId: $groupId) {
      id
      spanishText
      englishText
    }
  }
`;

export const groupTranslationsVariables = (groupId: number) => {
  return {
    variables: {
      input: {
        groupId: groupId,
      },
    },
  };
};
