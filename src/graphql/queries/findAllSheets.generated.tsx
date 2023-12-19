import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FindAllSheetsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FindAllSheetsQueryResponse = (
  { __typename?: 'Query' }
  & { findAllSheets: Array<(
    { __typename?: 'SheetType' }
    & Pick<Types.SheetType, 'dynamicFields' | 'id' | 'name' | 'quotationId'>
  )> }
);


export const FindAllSheetsDocument = gql`
    query findAllSheets {
  findAllSheets {
    dynamicFields
    id
    name
    quotationId
  }
}
    `;
export function useFindAllSheetsQuery(baseOptions?: Apollo.QueryHookOptions<FindAllSheetsQueryResponse, FindAllSheetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllSheetsQueryResponse, FindAllSheetsQueryVariables>(FindAllSheetsDocument, options);
      }
export function useFindAllSheetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllSheetsQueryResponse, FindAllSheetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllSheetsQueryResponse, FindAllSheetsQueryVariables>(FindAllSheetsDocument, options);
        }
export function useFindAllSheetsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindAllSheetsQueryResponse, FindAllSheetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllSheetsQueryResponse, FindAllSheetsQueryVariables>(FindAllSheetsDocument, options);
        }
export type FindAllSheetsQueryHookResult = ReturnType<typeof useFindAllSheetsQuery>;
export type FindAllSheetsLazyQueryHookResult = ReturnType<typeof useFindAllSheetsLazyQuery>;
export type FindAllSheetsSuspenseQueryHookResult = ReturnType<typeof useFindAllSheetsSuspenseQuery>;
export type FindAllSheetsQueryResult = Apollo.QueryResult<FindAllSheetsQueryResponse, FindAllSheetsQueryVariables>;