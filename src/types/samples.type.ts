export type CreateSamples = {
  highRisk: boolean;
  repeatedOrder: boolean;
  poNumber: string;
  actionItemNo: string;
  category: string;
  season: string;
  ageGrade?: string;
  sizeRange?: string;
  productDimension: string;
  productWeight: string;
  firstDeliveryDate: string;
  orderQuantity: string;
  articleDescription: string;
  vendor: string;
  factory: string;
  specification: string;
  materialComposition: string;
  stage: string;
};

export type UpdateSamples = { id: string } & CreateSamples;

export type ApproveSamples = {
  id: string;
  sizeSelect?: string;
  approvedDate: string;
  lastSeasonProduction: boolean;
  buyingMeeting: boolean;
  size?: string;
  weight?: string;
  overallComment: string;
  remark: string;
  colorPositiveFinding: boolean;
  colorRemark?: string;
  materialPositiveFinding: boolean;
  materialRemark?: string;
  texturePositiveFinding: boolean;
  textureRemark?: string;
  hardnessPositiveFinding: boolean;
  hardnessRemark?: string;
};
