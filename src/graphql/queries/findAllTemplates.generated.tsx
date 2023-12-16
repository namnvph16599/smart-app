import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FindAllTemplatesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FindAllTemplatesQueryResponse = (
  { __typename?: 'Query' }
  & { findAllTemplates: Array<(
    { __typename?: 'TemplateType' }
    & Pick<Types.TemplateType, 'dynamicFields' | 'id' | 'name'>
  )> }
);


export const FindAllTemplatesDocument = gql`
    query findAllTemplates {
  findAllTemplates {
    dynamicFields
    id
    name
  }
}
    `;
export function useFindAllTemplatesQuery(baseOptions?: Apollo.QueryHookOptions<FindAllTemplatesQueryResponse, FindAllTemplatesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllTemplatesQueryResponse, FindAllTemplatesQueryVariables>(FindAllTemplatesDocument, options);
      }
export function useFindAllTemplatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllTemplatesQueryResponse, FindAllTemplatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllTemplatesQueryResponse, FindAllTemplatesQueryVariables>(FindAllTemplatesDocument, options);
        }
export function useFindAllTemplatesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindAllTemplatesQueryResponse, FindAllTemplatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllTemplatesQueryResponse, FindAllTemplatesQueryVariables>(FindAllTemplatesDocument, options);
        }
export type FindAllTemplatesQueryHookResult = ReturnType<typeof useFindAllTemplatesQuery>;
export type FindAllTemplatesLazyQueryHookResult = ReturnType<typeof useFindAllTemplatesLazyQuery>;
export type FindAllTemplatesSuspenseQueryHookResult = ReturnType<typeof useFindAllTemplatesSuspenseQuery>;
export type FindAllTemplatesQueryResult = Apollo.QueryResult<FindAllTemplatesQueryResponse, FindAllTemplatesQueryVariables>;