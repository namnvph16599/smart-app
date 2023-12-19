import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateQuotationMutationVariables = Types.Exact<{
  updateQuoteInput: Types.UpdateQuotationInput;
}>;


export type UpdateQuotationMutationResponse = (
  { __typename?: 'Mutation' }
  & { updateQuotation: (
    { __typename?: 'QuotationType' }
    & Pick<Types.QuotationType, 'id' | 'itemNumber' | 'poNumber'>
  ) }
);


export const UpdateQuotationDocument = gql`
    mutation updateQuotation($updateQuoteInput: UpdateQuotationInput!) {
  updateQuotation(updateQuoteInput: $updateQuoteInput) {
    id
    itemNumber
    poNumber
  }
}
    `;
export function useUpdateQuotationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateQuotationMutationResponse, UpdateQuotationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateQuotationMutationResponse, UpdateQuotationMutationVariables>(UpdateQuotationDocument, options);
      }
export type UpdateQuotationMutationHookResult = ReturnType<typeof useUpdateQuotationMutation>;
export type UpdateQuotationMutationResult = Apollo.MutationResult<UpdateQuotationMutationResponse>;
export type UpdateQuotationMutationOptions = Apollo.BaseMutationOptions<UpdateQuotationMutationResponse, UpdateQuotationMutationVariables>;