import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FindOneSheetQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type FindOneSheetQueryResponse = (
  { __typename?: 'Query' }
  & { findOneSheet: (
    { __typename?: 'SheetType' }
    & Pick<Types.SheetType, 'dynamicFields' | 'id' | 'name' | 'quotationId'>
  ) }
);


export const FindOneSheetDocument = gql`
    query findOneSheet($id: String!) {
  findOneSheet(id: $id) {
    dynamicFields
    id
    name
    quotationId
  }
}
    `;
export function useFindOneSheetQuery(baseOptions: Apollo.QueryHookOptions<FindOneSheetQueryResponse, FindOneSheetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindOneSheetQueryResponse, FindOneSheetQueryVariables>(FindOneSheetDocument, options);
      }
export function useFindOneSheetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOneSheetQueryResponse, FindOneSheetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindOneSheetQueryResponse, FindOneSheetQueryVariables>(FindOneSheetDocument, options);
        }
export function useFindOneSheetSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindOneSheetQueryResponse, FindOneSheetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindOneSheetQueryResponse, FindOneSheetQueryVariables>(FindOneSheetDocument, options);
        }
export type FindOneSheetQueryHookResult = ReturnType<typeof useFindOneSheetQuery>;
export type FindOneSheetLazyQueryHookResult = ReturnType<typeof useFindOneSheetLazyQuery>;
export type FindOneSheetSuspenseQueryHookResult = ReturnType<typeof useFindOneSheetSuspenseQuery>;
export type FindOneSheetQueryResult = Apollo.QueryResult<FindOneSheetQueryResponse, FindOneSheetQueryVariables>;