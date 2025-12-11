export function request(ctx) {
  const ingredients = ctx.args.ingredients || [];
  const prompt = "Suggest a recipe idea using these ingredients: " + ingredients.join(", ") + ".";

  return {
    resourcePath: "/model/us.anthropic.claude-3-5-haiku-20241022-v1:0/converse",
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
  
  return {
    body: parsedBody.output.message.content[0].text
  };
}
