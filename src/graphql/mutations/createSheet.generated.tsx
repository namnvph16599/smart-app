import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateSheetMutationVariables = Types.Exact<{
  createSheetInput: Types.CreatesheetInput;
}>;


export type CreateSheetMutationResponse = (
  { __typename?: 'Mutation' }
  & { createSheet: (
    { __typename?: 'SheetType' }
    & Pick<Types.SheetType, 'dynamicFields' | 'id' | 'name' | 'quoteId' | 'stage' | 'status' | 'updateBy' | 'version'>
  ) }
);


export const CreateSheetDocument = gql`
    mutation createSheet($createSheetInput: CreatesheetInput!) {
  createSheet(createSheetInput: $createSheetInput) {
    dynamicFields
    id
    name
    quoteId
    stage
    status
    updateBy
    version
  }
}
    `;
export function useCreateSheetMutation(baseOptions?: Apollo.MutationHookOptions<CreateSheetMutationResponse, CreateSheetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSheetMutationResponse, CreateSheetMutationVariables>(CreateSheetDocument, options);
      }
export type CreateSheetMutationHookResult = ReturnType<typeof useCreateSheetMutation>;
export type CreateSheetMutationResult = Apollo.MutationResult<CreateSheetMutationResponse>;
export type CreateSheetMutationOptions = Apollo.BaseMutationOptions<CreateSheetMutationResponse, CreateSheetMutationVariables>;