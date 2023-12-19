import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateQuotationMutationVariables = Types.Exact<{
  CreateQuotationInput: Types.CreateQuotationInput;
}>;


export type CreateQuotationMutationResponse = (
  { __typename?: 'Mutation' }
  & { createQuotation: (
    { __typename?: 'QuotationType' }
    & Pick<Types.QuotationType, 'id' | 'itemNumber' | 'poNumber'>
  ) }
);


export const CreateQuotationDocument = gql`
    mutation createQuotation($CreateQuotationInput: CreateQuotationInput!) {
  createQuotation(CreateQuotationInput: $CreateQuotationInput) {
    id
    itemNumber
    poNumber
  }
}
    `;
export function useCreateQuotationMutation(baseOptions?: Apollo.MutationHookOptions<CreateQuotationMutationResponse, CreateQuotationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateQuotationMutationResponse, CreateQuotationMutationVariables>(CreateQuotationDocument, options);
      }
export type CreateQuotationMutationHookResult = ReturnType<typeof useCreateQuotationMutation>;
export type CreateQuotationMutationResult = Apollo.MutationResult<CreateQuotationMutationResponse>;
export type CreateQuotationMutationOptions = Apollo.BaseMutationOptions<CreateQuotationMutationResponse, CreateQuotationMutationVariables>;