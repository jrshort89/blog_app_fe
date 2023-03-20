import { gql } from "@apollo/client";

export const GROUP_CREATE = gql(`
mutation ($input: GroupCreateInput!) {
groupCreate(input: $input) {
    group {
      id
      name
    }
  }
}`);

export const groupCreateVariables = (groupName: string) => {
  return {
    variables: {
      input: {
        groupInput: { name: groupName },
      },
    },
  };
};
