import { defineBackend } from "@aws-amplify/backend";
import { data } from "./data/resource";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { BEDROCK_REGION, getModelArn } from "./data/bedrockConfig";
// import { auth } from "./auth/resource";

const backend = defineBackend({
  data,
});

const bedrockDataSource = backend.data.resources.graphqlApi.addHttpDataSource(
  "bedrockDS",
  `https://bedrock-runtime.${BEDROCK_REGION}.amazonaws.com`,
  {
    authorizationConfig: {
      signingRegion: BEDROCK_REGION,
      signingServiceName: "bedrock",
    },
  },
);

bedrockDataSource.grantPrincipal.addToPrincipalPolicy(
  new PolicyStatement({
    resources: [getModelArn()],
    actions: ["bedrock:InvokeModel"],
  }),
);
