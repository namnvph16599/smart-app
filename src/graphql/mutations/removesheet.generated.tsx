import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemovesheetMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type RemovesheetMutationResponse = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'removesheet'>
);


export const RemovesheetDocument = gql`
    mutation removesheet($id: String!) {
  removesheet(id: $id)
}
    `;
export function useRemovesheetMutation(baseOptions?: Apollo.MutationHookOptions<RemovesheetMutationResponse, RemovesheetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemovesheetMutationResponse, RemovesheetMutationVariables>(RemovesheetDocument, options);
      }
export type RemovesheetMutationHookResult = ReturnType<typeof useRemovesheetMutation>;
export type RemovesheetMutationResult = Apollo.MutationResult<RemovesheetMutationResponse>;
export type RemovesheetMutationOptions = Apollo.BaseMutationOptions<RemovesheetMutationResponse, RemovesheetMutationVariables>;