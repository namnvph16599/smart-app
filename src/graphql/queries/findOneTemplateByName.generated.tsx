import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FindOneTemplateByNameQueryVariables = Types.Exact<{
  name: Types.Scalars['String']['input'];
}>;


export type FindOneTemplateByNameQueryResponse = (
  { __typename?: 'Query' }
  & { findOneTemplateByName: (
    { __typename?: 'TemplateType' }
    & Pick<Types.TemplateType, 'dynamicFields' | 'id' | 'name'>
  ) }
);


export const FindOneTemplateByNameDocument = gql`
    query findOneTemplateByName($name: String!) {
  findOneTemplateByName(name: $name) {
    dynamicFields
    id
    name
  }
}
    `;
export function useFindOneTemplateByNameQuery(baseOptions: Apollo.QueryHookOptions<FindOneTemplateByNameQueryResponse, FindOneTemplateByNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindOneTemplateByNameQueryResponse, FindOneTemplateByNameQueryVariables>(FindOneTemplateByNameDocument, options);
      }
export function useFindOneTemplateByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOneTemplateByNameQueryResponse, FindOneTemplateByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindOneTemplateByNameQueryResponse, FindOneTemplateByNameQueryVariables>(FindOneTemplateByNameDocument, options);
        }
export function useFindOneTemplateByNameSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindOneTemplateByNameQueryResponse, FindOneTemplateByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindOneTemplateByNameQueryResponse, FindOneTemplateByNameQueryVariables>(FindOneTemplateByNameDocument, options);
        }
export type FindOneTemplateByNameQueryHookResult = ReturnType<typeof useFindOneTemplateByNameQuery>;
export type FindOneTemplateByNameLazyQueryHookResult = ReturnType<typeof useFindOneTemplateByNameLazyQuery>;
export type FindOneTemplateByNameSuspenseQueryHookResult = ReturnType<typeof useFindOneTemplateByNameSuspenseQuery>;
export type FindOneTemplateByNameQueryResult = Apollo.QueryResult<FindOneTemplateByNameQueryResponse, FindOneTemplateByNameQueryVariables>;