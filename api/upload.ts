import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  const body = request.body as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,

      onBeforeGenerateToken: async (pathname: string) => {
        return {
          allowedContentTypes: ["image/jpeg", "image/png"],
          tokenPayload: JSON.stringify({}),
        };
      },
    });

    response.status(200).json(jsonResponse);
  } catch (error) {
    response.status(400).json({ error: (error as Error).message });
  }
}
