import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FindOneQuoteQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type FindOneQuoteQueryResponse = (
  { __typename?: 'Query' }
  & { findOneQuote: (
    { __typename?: 'QuotationType' }
    & Pick<Types.QuotationType, 'id' | 'itemNumber' | 'poNumber'>
  ) }
);


export const FindOneQuoteDocument = gql`
    query findOneQuote($id: String!) {
  findOneQuote(id: $id) {
    id
    itemNumber
    poNumber
  }
}
    `;
export function useFindOneQuoteQuery(baseOptions: Apollo.QueryHookOptions<FindOneQuoteQueryResponse, FindOneQuoteQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindOneQuoteQueryResponse, FindOneQuoteQueryVariables>(FindOneQuoteDocument, options);
      }
export function useFindOneQuoteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOneQuoteQueryResponse, FindOneQuoteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindOneQuoteQueryResponse, FindOneQuoteQueryVariables>(FindOneQuoteDocument, options);
        }
export function useFindOneQuoteSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindOneQuoteQueryResponse, FindOneQuoteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindOneQuoteQueryResponse, FindOneQuoteQueryVariables>(FindOneQuoteDocument, options);
        }
export type FindOneQuoteQueryHookResult = ReturnType<typeof useFindOneQuoteQuery>;
export type FindOneQuoteLazyQueryHookResult = ReturnType<typeof useFindOneQuoteLazyQuery>;
export type FindOneQuoteSuspenseQueryHookResult = ReturnType<typeof useFindOneQuoteSuspenseQuery>;
export type FindOneQuoteQueryResult = Apollo.QueryResult<FindOneQuoteQueryResponse, FindOneQuoteQueryVariables>;