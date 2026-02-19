import { upload } from "@vercel/blob/client";
import { PropsWithChildren, useCallback } from "react";
import { useEditor } from "../../context/editor/hooks";

const ImageDropZone = ({ children }: PropsWithChildren) => {
  const { addPendingImage, updateImageBlock, deleteBlock } = useEditor();

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    const blockId = addPendingImage();

    try {
      const uniqueFilename = `${Date.now()}_${file.name}`;

      const blob = await upload(uniqueFilename, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
      });

      updateImageBlock(blockId, blob.url);
    } catch (error) {
      deleteBlock(blockId);

      alert("이미지 업로드에 실패하였습니다.");
      console.error("업로드 실패:", error);
    }
  };

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.currentTarget.contains(e.relatedTarget as Node)) {
      return;
    }
  }, []);

  const onDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      await handleUpload(file);
    }
  }, []);

  return (
    <div
      className="relative w-full h-full group"
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {children}
    </div>
  );
};

export default ImageDropZone;
