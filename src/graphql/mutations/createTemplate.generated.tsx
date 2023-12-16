import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateTemplateMutationVariables = Types.Exact<{
  createTemplateInput: Types.CreateTemplateInput;
}>;


export type CreateTemplateMutationResponse = (
  { __typename?: 'Mutation' }
  & { createTemplate: (
    { __typename?: 'TemplateType' }
    & Pick<Types.TemplateType, 'dynamicFields' | 'id' | 'name'>
  ) }
);


export const CreateTemplateDocument = gql`
    mutation createTemplate($createTemplateInput: CreateTemplateInput!) {
  createTemplate(createTemplateInput: $createTemplateInput) {
    dynamicFields
    id
    name
  }
}
    `;
export function useCreateTemplateMutation(baseOptions?: Apollo.MutationHookOptions<CreateTemplateMutationResponse, CreateTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTemplateMutationResponse, CreateTemplateMutationVariables>(CreateTemplateDocument, options);
      }
export type CreateTemplateMutationHookResult = ReturnType<typeof useCreateTemplateMutation>;
export type CreateTemplateMutationResult = Apollo.MutationResult<CreateTemplateMutationResponse>;
export type CreateTemplateMutationOptions = Apollo.BaseMutationOptions<CreateTemplateMutationResponse, CreateTemplateMutationVariables>;