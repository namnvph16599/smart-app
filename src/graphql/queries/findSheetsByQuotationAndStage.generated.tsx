import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FindSheetsByQuotationAndStageQueryVariables = Types.Exact<{
  quoteId: Types.Scalars['String']['input'];
  stage: Types.Scalars['String']['input'];
}>;


export type FindSheetsByQuotationAndStageQueryResponse = (
  { __typename?: 'Query' }
  & { findSheetsByQuotationAndStage: Array<(
    { __typename?: 'SheetType' }
    & Pick<Types.SheetType, 'dynamicFields' | 'id' | 'name' | 'quoteId' | 'stage' | 'status' | 'updateBy' | 'version'>
  )> }
);


export const FindSheetsByQuotationAndStageDocument = gql`
    query findSheetsByQuotationAndStage($quoteId: String!, $stage: String!) {
  findSheetsByQuotationAndStage(quoteId: $quoteId, stage: $stage) {
    dynamicFields
    id
    name
    quoteId
    stage
    status
    updateBy
    version
  }
}
    `;
export function useFindSheetsByQuotationAndStageQuery(baseOptions: Apollo.QueryHookOptions<FindSheetsByQuotationAndStageQueryResponse, FindSheetsByQuotationAndStageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindSheetsByQuotationAndStageQueryResponse, FindSheetsByQuotationAndStageQueryVariables>(FindSheetsByQuotationAndStageDocument, options);
      }
export function useFindSheetsByQuotationAndStageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindSheetsByQuotationAndStageQueryResponse, FindSheetsByQuotationAndStageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindSheetsByQuotationAndStageQueryResponse, FindSheetsByQuotationAndStageQueryVariables>(FindSheetsByQuotationAndStageDocument, options);
        }
export function useFindSheetsByQuotationAndStageSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindSheetsByQuotationAndStageQueryResponse, FindSheetsByQuotationAndStageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindSheetsByQuotationAndStageQueryResponse, FindSheetsByQuotationAndStageQueryVariables>(FindSheetsByQuotationAndStageDocument, options);
        }
export type FindSheetsByQuotationAndStageQueryHookResult = ReturnType<typeof useFindSheetsByQuotationAndStageQuery>;
export type FindSheetsByQuotationAndStageLazyQueryHookResult = ReturnType<typeof useFindSheetsByQuotationAndStageLazyQuery>;
export type FindSheetsByQuotationAndStageSuspenseQueryHookResult = ReturnType<typeof useFindSheetsByQuotationAndStageSuspenseQuery>;
export type FindSheetsByQuotationAndStageQueryResult = Apollo.QueryResult<FindSheetsByQuotationAndStageQueryResponse, FindSheetsByQuotationAndStageQueryVariables>;