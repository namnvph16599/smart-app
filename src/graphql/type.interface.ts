export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: any; output: any; }
};

export type CreateTemplateInput = {
  dynamicFields: Array<Scalars['JSONObject']['input']>;
  name: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTemplate: TemplateType;
  removeTemplate: Scalars['Boolean']['output'];
  updateTemplate: TemplateType;
};


export type MutationCreateTemplateArgs = {
  createTemplateInput: CreateTemplateInput;
};


export type MutationRemoveTemplateArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateTemplateArgs = {
  updateTemplateInput: UpdateTemplateInput;
};

export type Query = {
  __typename?: 'Query';
  findAllTemplates: Array<TemplateType>;
  findOneTemplate: TemplateType;
};


export type QueryFindOneTemplateArgs = {
  id: Scalars['String']['input'];
};

export type TemplateType = {
  __typename?: 'TemplateType';
  dynamicFields: Array<Scalars['JSONObject']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type UpdateTemplateInput = {
  dynamicFields?: InputMaybe<Array<Scalars['JSONObject']['input']>>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};
