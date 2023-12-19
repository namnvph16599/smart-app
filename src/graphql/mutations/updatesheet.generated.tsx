import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdatesheetMutationVariables = Types.Exact<{
  updateSheetInput: Types.UpdatesheetInput;
}>;


export type UpdatesheetMutationResponse = (
  { __typename?: 'Mutation' }
  & { updatesheet: (
    { __typename?: 'SheetType' }
    & Pick<Types.SheetType, 'dynamicFields' | 'id' | 'name' | 'quotationId'>
  ) }
);


export const UpdatesheetDocument = gql`
    mutation updatesheet($updateSheetInput: UpdatesheetInput!) {
  updatesheet(updateSheetInput: $updateSheetInput) {
    dynamicFields
    id
    name
    quotationId
  }
}
    `;
export function useUpdatesheetMutation(baseOptions?: Apollo.MutationHookOptions<UpdatesheetMutationResponse, UpdatesheetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatesheetMutationResponse, UpdatesheetMutationVariables>(UpdatesheetDocument, options);
      }
export type UpdatesheetMutationHookResult = ReturnType<typeof useUpdatesheetMutation>;
export type UpdatesheetMutationResult = Apollo.MutationResult<UpdatesheetMutationResponse>;
export type UpdatesheetMutationOptions = Apollo.BaseMutationOptions<UpdatesheetMutationResponse, UpdatesheetMutationVariables>;