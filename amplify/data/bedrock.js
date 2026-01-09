// Note: Model ID must match BEDROCK_MODEL_ID in bedrockConfig.ts
const BEDROCK_MODEL_ID = "us.anthropic.claude-3-5-haiku-20241022-v1:0";

export function request(ctx) {
  const ingredients = ctx.args.ingredients || [];
  const prompt = "Suggest a recipe idea using these ingredients: " + ingredients.join(", ") + ".";

  return {
    resourcePath: `/model/${BEDROCK_MODEL_ID}/converse`,
    method: "POST",
    params: {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: prompt
              }
            ]
          }
        ],
        max_tokens: 1024
      })
    }
  };
}

export function response(ctx) {
  const parsedBody = JSON.parse(ctx.result.body);
    
  if (parsedBody && parsedBody.output && parsedBody.output.message && parsedBody.output.message.content && parsedBody.output.message.content.length > 0) {
    return {
      body: parsedBody.output.message.content[0].text,
      error: null
    };
  } else {
    return {
      body: JSON.stringify(ctx.result),
      error: "Unexpected response structure from Bedrock"
    };
  }
}
