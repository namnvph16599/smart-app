import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveQuotationMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type RemoveQuotationMutationResponse = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'removeQuotation'>
);


export const RemoveQuotationDocument = gql`
    mutation removeQuotation($id: String!) {
  removeQuotation(id: $id)
}
    `;
export function useRemoveQuotationMutation(baseOptions?: Apollo.MutationHookOptions<RemoveQuotationMutationResponse, RemoveQuotationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveQuotationMutationResponse, RemoveQuotationMutationVariables>(RemoveQuotationDocument, options);
      }
export type RemoveQuotationMutationHookResult = ReturnType<typeof useRemoveQuotationMutation>;
export type RemoveQuotationMutationResult = Apollo.MutationResult<RemoveQuotationMutationResponse>;
export type RemoveQuotationMutationOptions = Apollo.BaseMutationOptions<RemoveQuotationMutationResponse, RemoveQuotationMutationVariables>;