import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveTemplateMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type RemoveTemplateMutationResponse = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'removeTemplate'>
);


export const RemoveTemplateDocument = gql`
    mutation removeTemplate($id: String!) {
  removeTemplate(id: $id)
}
    `;
export function useRemoveTemplateMutation(baseOptions?: Apollo.MutationHookOptions<RemoveTemplateMutationResponse, RemoveTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveTemplateMutationResponse, RemoveTemplateMutationVariables>(RemoveTemplateDocument, options);
      }
export type RemoveTemplateMutationHookResult = ReturnType<typeof useRemoveTemplateMutation>;
export type RemoveTemplateMutationResult = Apollo.MutationResult<RemoveTemplateMutationResponse>;
export type RemoveTemplateMutationOptions = Apollo.BaseMutationOptions<RemoveTemplateMutationResponse, RemoveTemplateMutationVariables>;