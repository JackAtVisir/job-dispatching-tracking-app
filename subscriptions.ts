/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateJobs = /* GraphQL */ `subscription OnCreateJobs(
  $filter: ModelSubscriptionJobsFilterInput
  $owner: String
) {
  onCreateJobs(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateJobsSubscriptionVariables,
  APITypes.OnCreateJobsSubscription
>;
export const onDeleteJobs = /* GraphQL */ `subscription OnDeleteJobs(
  $filter: ModelSubscriptionJobsFilterInput
  $owner: String
) {
  onDeleteJobs(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteJobsSubscriptionVariables,
  APITypes.OnDeleteJobsSubscription
>;
export const onUpdateJobs = /* GraphQL */ `subscription OnUpdateJobs(
  $filter: ModelSubscriptionJobsFilterInput
  $owner: String
) {
  onUpdateJobs(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateJobsSubscriptionVariables,
  APITypes.OnUpdateJobsSubscription
>;
