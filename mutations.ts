/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createJobs = /* GraphQL */ `mutation CreateJobs(
  $condition: ModelJobsConditionInput
  $input: CreateJobsInput!
) {
  createJobs(condition: $condition, input: $input) {
    completed
    condition
    createdAt
    id
    image
    owner
    time
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateJobsMutationVariables,
  APITypes.CreateJobsMutation
>;
export const deleteJobs = /* GraphQL */ `mutation DeleteJobs(
  $condition: ModelJobsConditionInput
  $input: DeleteJobsInput!
) {
  deleteJobs(condition: $condition, input: $input) {
    completed
    condition
    createdAt
    id
    image
    owner
    time
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteJobsMutationVariables,
  APITypes.DeleteJobsMutation
>;
export const updateJobs = /* GraphQL */ `mutation UpdateJobs(
  $condition: ModelJobsConditionInput
  $input: UpdateJobsInput!
) {
  updateJobs(condition: $condition, input: $input) {
    completed
    condition
    createdAt
    id
    image
    owner
    time
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateJobsMutationVariables,
  APITypes.UpdateJobsMutation
>;
