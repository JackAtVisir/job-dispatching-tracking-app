/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getJobs = /* GraphQL */ `query GetJobs($id: ID!) {
  getJobs(id: $id) {
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
` as GeneratedQuery<APITypes.GetJobsQueryVariables, APITypes.GetJobsQuery>;
export const listJobs = /* GraphQL */ `query ListJobs($filter: ModelJobsFilterInput, $limit: Int, $nextToken: String) {
  listJobs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListJobsQueryVariables, APITypes.ListJobsQuery>;
