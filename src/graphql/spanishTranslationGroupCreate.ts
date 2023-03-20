import { gql } from "@apollo/client";

export const SPANISH_TRANSLATION_GROUP_CREATE = gql`
  mutation ($input: SpanishTranslationGroupCreateInput!) {
    spanishTranslationGroupCreate(input: $input) {
      spanishTranslationGroup {
        id
        groupId
        spanishTranslationId
      }
    }
  }
`;

export const spanishTranslationGroupVariables = (
  groupId: number,
  selectedKeys: number[]
) => {
  return {
    variables: {
      input: {
        spanishTranslationGroupInput: {
          groupId: groupId,
          spanishTranslationId: selectedKeys,
        },
      },
    },
  };
};
