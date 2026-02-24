import { upload } from "@vercel/blob/client";

/**
 * 파일을 받아 Vercel Blob에 업로드하고 URL을 반환합니다.
 *
 * @param file - 업로드할 File 객체
 *
 * @returns 업로드된 이미지의 URL
 */
export const uploadImage = async (file: File): Promise<string> => {
  try {
    const uniqueFilename = `${Date.now()}_${file.name}`;

    const response = await upload(uniqueFilename, file, {
      access: "public",
      handleUploadUrl: "/api/upload",
    });

    return response.url;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};
