import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FindAllQuotesByStatusQueryVariables = Types.Exact<{
  status: Types.Scalars['String']['input'];
}>;


export type FindAllQuotesByStatusQueryResponse = (
  { __typename?: 'Query' }
  & { findAllQuotesByStatus: Array<(
    { __typename?: 'QuotationType' }
    & Pick<Types.QuotationType, 'category' | 'id' | 'itemNumber' | 'poNumber' | 'stage' | 'status' | 'supplier'>
  )> }
);


export const FindAllQuotesByStatusDocument = gql`
    query findAllQuotesByStatus($status: String!) {
  findAllQuotesByStatus(status: $status) {
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
export function useFindAllQuotesByStatusQuery(baseOptions: Apollo.QueryHookOptions<FindAllQuotesByStatusQueryResponse, FindAllQuotesByStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllQuotesByStatusQueryResponse, FindAllQuotesByStatusQueryVariables>(FindAllQuotesByStatusDocument, options);
      }
export function useFindAllQuotesByStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllQuotesByStatusQueryResponse, FindAllQuotesByStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllQuotesByStatusQueryResponse, FindAllQuotesByStatusQueryVariables>(FindAllQuotesByStatusDocument, options);
        }
export function useFindAllQuotesByStatusSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindAllQuotesByStatusQueryResponse, FindAllQuotesByStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllQuotesByStatusQueryResponse, FindAllQuotesByStatusQueryVariables>(FindAllQuotesByStatusDocument, options);
        }
export type FindAllQuotesByStatusQueryHookResult = ReturnType<typeof useFindAllQuotesByStatusQuery>;
export type FindAllQuotesByStatusLazyQueryHookResult = ReturnType<typeof useFindAllQuotesByStatusLazyQuery>;
export type FindAllQuotesByStatusSuspenseQueryHookResult = ReturnType<typeof useFindAllQuotesByStatusSuspenseQuery>;
export type FindAllQuotesByStatusQueryResult = Apollo.QueryResult<FindAllQuotesByStatusQueryResponse, FindAllQuotesByStatusQueryVariables>;