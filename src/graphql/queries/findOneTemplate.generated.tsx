import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FindOneTemplateQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type FindOneTemplateQueryResponse = (
  { __typename?: 'Query' }
  & { findOneTemplate: (
    { __typename?: 'TemplateType' }
    & Pick<Types.TemplateType, 'dynamicFields' | 'id' | 'name'>
  ) }
);


export const FindOneTemplateDocument = gql`
    query findOneTemplate($id: String!) {
  findOneTemplate(id: $id) {
    dynamicFields
    id
    name
  }
}
    `;
export function useFindOneTemplateQuery(baseOptions: Apollo.QueryHookOptions<FindOneTemplateQueryResponse, FindOneTemplateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindOneTemplateQueryResponse, FindOneTemplateQueryVariables>(FindOneTemplateDocument, options);
      }
export function useFindOneTemplateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOneTemplateQueryResponse, FindOneTemplateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindOneTemplateQueryResponse, FindOneTemplateQueryVariables>(FindOneTemplateDocument, options);
        }
export function useFindOneTemplateSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindOneTemplateQueryResponse, FindOneTemplateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindOneTemplateQueryResponse, FindOneTemplateQueryVariables>(FindOneTemplateDocument, options);
        }
export type FindOneTemplateQueryHookResult = ReturnType<typeof useFindOneTemplateQuery>;
export type FindOneTemplateLazyQueryHookResult = ReturnType<typeof useFindOneTemplateLazyQuery>;
export type FindOneTemplateSuspenseQueryHookResult = ReturnType<typeof useFindOneTemplateSuspenseQuery>;
export type FindOneTemplateQueryResult = Apollo.QueryResult<FindOneTemplateQueryResponse, FindOneTemplateQueryVariables>;