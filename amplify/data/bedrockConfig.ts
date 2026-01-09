// Centralized Bedrock model configuration
// Update the model ID here to change it across the entire application

export const BEDROCK_MODEL_ID = "us.anthropic.claude-3-5-haiku-20241022-v1:0";
export const BEDROCK_REGION = "us-east-1";
export const BEDROCK_ACCOUNT_ID = "814930134533";

// Derived values
export const getModelArn = () =>
  `arn:aws:bedrock:${BEDROCK_REGION}:${BEDROCK_ACCOUNT_ID}:inference-profile/${BEDROCK_MODEL_ID}`;

export const getConverseEndpoint = () =>
  `/model/${BEDROCK_MODEL_ID}/converse`;
