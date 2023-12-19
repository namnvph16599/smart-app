import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FindAllQuotesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FindAllQuotesQueryResponse = (
  { __typename?: 'Query' }
  & { findAllQuotes: Array<(
    { __typename?: 'QuotationType' }
    & Pick<Types.QuotationType, 'id' | 'itemNumber' | 'poNumber'>
  )> }
);


export const FindAllQuotesDocument = gql`
    query findAllQuotes {
  findAllQuotes {
    id
    itemNumber
    poNumber
  }
}
    `;
export function useFindAllQuotesQuery(baseOptions?: Apollo.QueryHookOptions<FindAllQuotesQueryResponse, FindAllQuotesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllQuotesQueryResponse, FindAllQuotesQueryVariables>(FindAllQuotesDocument, options);
      }
export function useFindAllQuotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllQuotesQueryResponse, FindAllQuotesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllQuotesQueryResponse, FindAllQuotesQueryVariables>(FindAllQuotesDocument, options);
        }
export function useFindAllQuotesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindAllQuotesQueryResponse, FindAllQuotesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllQuotesQueryResponse, FindAllQuotesQueryVariables>(FindAllQuotesDocument, options);
        }
export type FindAllQuotesQueryHookResult = ReturnType<typeof useFindAllQuotesQuery>;
export type FindAllQuotesLazyQueryHookResult = ReturnType<typeof useFindAllQuotesLazyQuery>;
export type FindAllQuotesSuspenseQueryHookResult = ReturnType<typeof useFindAllQuotesSuspenseQuery>;
export type FindAllQuotesQueryResult = Apollo.QueryResult<FindAllQuotesQueryResponse, FindAllQuotesQueryVariables>;