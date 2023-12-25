import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateQuotationStageAndStatusMutationVariables = Types.Exact<{
  quotationId: Types.Scalars['String']['input'];
  stage: Types.Scalars['String']['input'];
  status: Types.Scalars['String']['input'];
}>;


export type UpdateQuotationStageAndStatusMutationResponse = (
  { __typename?: 'Mutation' }
  & { updateQuotationStageAndStatus: (
    { __typename?: 'QuotationType' }
    & Pick<Types.QuotationType, 'category' | 'id' | 'itemNumber' | 'poNumber' | 'stage' | 'status' | 'supplier'>
  ) }
);


export const UpdateQuotationStageAndStatusDocument = gql`
    mutation updateQuotationStageAndStatus($quotationId: String!, $stage: String!, $status: String!) {
  updateQuotationStageAndStatus(
    quotationId: $quotationId
    stage: $stage
    status: $status
  ) {
    category
    id
    itemNumber
    poNumber
    stage
    status
    supplier
  }
}
    `;
export function useUpdateQuotationStageAndStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateQuotationStageAndStatusMutationResponse, UpdateQuotationStageAndStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateQuotationStageAndStatusMutationResponse, UpdateQuotationStageAndStatusMutationVariables>(UpdateQuotationStageAndStatusDocument, options);
      }
export type UpdateQuotationStageAndStatusMutationHookResult = ReturnType<typeof useUpdateQuotationStageAndStatusMutation>;
export type UpdateQuotationStageAndStatusMutationResult = Apollo.MutationResult<UpdateQuotationStageAndStatusMutationResponse>;
export type UpdateQuotationStageAndStatusMutationOptions = Apollo.BaseMutationOptions<UpdateQuotationStageAndStatusMutationResponse, UpdateQuotationStageAndStatusMutationVariables>;