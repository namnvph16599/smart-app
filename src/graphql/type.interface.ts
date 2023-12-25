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

export type CreateQuotationInput = {
  category: Scalars['String']['input'];
  itemNumber?: InputMaybe<Scalars['String']['input']>;
  poNumber: Scalars['String']['input'];
  stage?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  supplier?: InputMaybe<Scalars['String']['input']>;
};

export type CreateTemplateInput = {
  dynamicFields: Array<Scalars['JSONObject']['input']>;
  name: Scalars['String']['input'];
};

export type CreatesheetInput = {
  dynamicFields: Array<Scalars['JSONObject']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  quoteId?: InputMaybe<Scalars['String']['input']>;
  stage?: InputMaybe<Scalars['String']['input']>;
  updateBy?: InputMaybe<Scalars['String']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createQuotation: QuotationType;
  createSheet: SheetType;
  createTemplate: TemplateType;
  removeQuotation: Scalars['Boolean']['output'];
  removeTemplate: Scalars['Boolean']['output'];
  removesheet: Scalars['Boolean']['output'];
  updateQuotation: QuotationType;
  updateTemplate: TemplateType;
  updatesheet: SheetType;
};


export type MutationCreateQuotationArgs = {
  CreateQuotationInput: CreateQuotationInput;
};


export type MutationCreateSheetArgs = {
  createSheetInput: CreatesheetInput;
};


export type MutationCreateTemplateArgs = {
  createTemplateInput: CreateTemplateInput;
};


export type MutationRemoveQuotationArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveTemplateArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemovesheetArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateQuotationArgs = {
  updateQuoteInput: UpdateQuotationInput;
};


export type MutationUpdateTemplateArgs = {
  updateTemplateInput: UpdateTemplateInput;
};


export type MutationUpdatesheetArgs = {
  updateSheetInput: UpdatesheetInput;
};

export type Query = {
  __typename?: 'Query';
  findAllQuotes: Array<QuotationType>;
  findAllSheets: Array<SheetType>;
  findAllTemplates: Array<TemplateType>;
  findOneQuote: QuotationType;
  findOneSheet: SheetType;
  findOneTemplate: TemplateType;
  findOneTemplateByName: TemplateType;
  findSheetsByQuotationAndStage: Array<SheetType>;
};


export type QueryFindOneQuoteArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindOneSheetArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindOneTemplateArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindOneTemplateByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryFindSheetsByQuotationAndStageArgs = {
  quoteId: Scalars['String']['input'];
  stage: Scalars['String']['input'];
};

export type QuotationType = {
  __typename?: 'QuotationType';
  category: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  itemNumber: Scalars['String']['output'];
  poNumber: Scalars['String']['output'];
  stage: Scalars['String']['output'];
  status: Scalars['String']['output'];
  supplier: Scalars['String']['output'];
};

export type SheetType = {
  __typename?: 'SheetType';
  dynamicFields: Array<Scalars['JSONObject']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  quoteId?: Maybe<Scalars['String']['output']>;
  stage?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updateBy?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['String']['output']>;
};

export type TemplateType = {
  __typename?: 'TemplateType';
  dynamicFields: Array<Scalars['JSONObject']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type UpdateQuotationInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  itemNumber?: InputMaybe<Scalars['String']['input']>;
  poNumber: Scalars['String']['input'];
  stage?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  supplier?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTemplateInput = {
  dynamicFields?: InputMaybe<Array<Scalars['JSONObject']['input']>>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatesheetInput = {
  dynamicFields?: InputMaybe<Array<Scalars['JSONObject']['input']>>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  quoteId?: InputMaybe<Scalars['String']['input']>;
  stage?: InputMaybe<Scalars['String']['input']>;
  updateBy?: InputMaybe<Scalars['String']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};
