import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateTemplateMutationVariables = Types.Exact<{
  updateTemplateInput: Types.UpdateTemplateInput;
}>;


export type UpdateTemplateMutationResponse = (
  { __typename?: 'Mutation' }
  & { updateTemplate: (
    { __typename?: 'TemplateType' }
    & Pick<Types.TemplateType, 'dynamicFields' | 'id' | 'name'>
  ) }
);


export const UpdateTemplateDocument = gql`
    mutation updateTemplate($updateTemplateInput: UpdateTemplateInput!) {
  updateTemplate(updateTemplateInput: $updateTemplateInput) {
    dynamicFields
    id
    name
  }
}
    `;
export function useUpdateTemplateMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTemplateMutationResponse, UpdateTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTemplateMutationResponse, UpdateTemplateMutationVariables>(UpdateTemplateDocument, options);
      }
export type UpdateTemplateMutationHookResult = ReturnType<typeof useUpdateTemplateMutation>;
export type UpdateTemplateMutationResult = Apollo.MutationResult<UpdateTemplateMutationResponse>;
export type UpdateTemplateMutationOptions = Apollo.BaseMutationOptions<UpdateTemplateMutationResponse, UpdateTemplateMutationVariables>;