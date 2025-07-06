/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Jobs = {
  __typename: "Jobs",
  completed?: boolean | null,
  condition?: string | null,
  createdAt: string,
  id: string,
  image?: string | null,
  owner?: string | null,
  time?: number | null,
  updatedAt: string,
};

export type ModelJobsFilterInput = {
  and?: Array< ModelJobsFilterInput | null > | null,
  completed?: ModelBooleanInput | null,
  condition?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  image?: ModelStringInput | null,
  not?: ModelJobsFilterInput | null,
  or?: Array< ModelJobsFilterInput | null > | null,
  owner?: ModelStringInput | null,
  time?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelBooleanInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  eq?: boolean | null,
  ne?: boolean | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export type ModelIntInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelJobsConnection = {
  __typename: "ModelJobsConnection",
  items:  Array<Jobs | null >,
  nextToken?: string | null,
};

export type ModelJobsConditionInput = {
  and?: Array< ModelJobsConditionInput | null > | null,
  completed?: ModelBooleanInput | null,
  condition?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  image?: ModelStringInput | null,
  not?: ModelJobsConditionInput | null,
  or?: Array< ModelJobsConditionInput | null > | null,
  owner?: ModelStringInput | null,
  time?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateJobsInput = {
  completed?: boolean | null,
  condition?: string | null,
  id?: string | null,
  image?: string | null,
  time?: number | null,
};

export type DeleteJobsInput = {
  id: string,
};

export type UpdateJobsInput = {
  completed?: boolean | null,
  condition?: string | null,
  id: string,
  image?: string | null,
  time?: number | null,
};

export type ModelSubscriptionJobsFilterInput = {
  and?: Array< ModelSubscriptionJobsFilterInput | null > | null,
  completed?: ModelSubscriptionBooleanInput | null,
  condition?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  image?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionJobsFilterInput | null > | null,
  owner?: ModelStringInput | null,
  time?: ModelSubscriptionIntInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionBooleanInput = {
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
};

export type GetJobsQueryVariables = {
  id: string,
};

export type GetJobsQuery = {
  getJobs?:  {
    __typename: "Jobs",
    completed?: boolean | null,
    condition?: string | null,
    createdAt: string,
    id: string,
    image?: string | null,
    owner?: string | null,
    time?: number | null,
    updatedAt: string,
  } | null,
};

export type ListJobsQueryVariables = {
  filter?: ModelJobsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListJobsQuery = {
  listJobs?:  {
    __typename: "ModelJobsConnection",
    items:  Array< {
      __typename: "Jobs",
      completed?: boolean | null,
      condition?: string | null,
      createdAt: string,
      id: string,
      image?: string | null,
      owner?: string | null,
      time?: number | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CreateJobsMutationVariables = {
  condition?: ModelJobsConditionInput | null,
  input: CreateJobsInput,
};

export type CreateJobsMutation = {
  createJobs?:  {
    __typename: "Jobs",
    completed?: boolean | null,
    condition?: string | null,
    createdAt: string,
    id: string,
    image?: string | null,
    owner?: string | null,
    time?: number | null,
    updatedAt: string,
  } | null,
};

export type DeleteJobsMutationVariables = {
  condition?: ModelJobsConditionInput | null,
  input: DeleteJobsInput,
};

export type DeleteJobsMutation = {
  deleteJobs?:  {
    __typename: "Jobs",
    completed?: boolean | null,
    condition?: string | null,
    createdAt: string,
    id: string,
    image?: string | null,
    owner?: string | null,
    time?: number | null,
    updatedAt: string,
  } | null,
};

export type UpdateJobsMutationVariables = {
  condition?: ModelJobsConditionInput | null,
  input: UpdateJobsInput,
};

export type UpdateJobsMutation = {
  updateJobs?:  {
    __typename: "Jobs",
    completed?: boolean | null,
    condition?: string | null,
    createdAt: string,
    id: string,
    image?: string | null,
    owner?: string | null,
    time?: number | null,
    updatedAt: string,
  } | null,
};

export type OnCreateJobsSubscriptionVariables = {
  filter?: ModelSubscriptionJobsFilterInput | null,
  owner?: string | null,
};

export type OnCreateJobsSubscription = {
  onCreateJobs?:  {
    __typename: "Jobs",
    completed?: boolean | null,
    condition?: string | null,
    createdAt: string,
    id: string,
    image?: string | null,
    owner?: string | null,
    time?: number | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteJobsSubscriptionVariables = {
  filter?: ModelSubscriptionJobsFilterInput | null,
  owner?: string | null,
};

export type OnDeleteJobsSubscription = {
  onDeleteJobs?:  {
    __typename: "Jobs",
    completed?: boolean | null,
    condition?: string | null,
    createdAt: string,
    id: string,
    image?: string | null,
    owner?: string | null,
    time?: number | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateJobsSubscriptionVariables = {
  filter?: ModelSubscriptionJobsFilterInput | null,
  owner?: string | null,
};

export type OnUpdateJobsSubscription = {
  onUpdateJobs?:  {
    __typename: "Jobs",
    completed?: boolean | null,
    condition?: string | null,
    createdAt: string,
    id: string,
    image?: string | null,
    owner?: string | null,
    time?: number | null,
    updatedAt: string,
  } | null,
};
