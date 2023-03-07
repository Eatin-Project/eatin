
import { FileUpload } from "../ui/FileUpload";
import { FC, useState } from "react";
import { UploadImagesList } from "./UploadImagesList";


export type Image = {
  url: string;
  name: string;
  type: string;
};

export const MediaUpload: FC = () => {
  const [images, setImages] = useState<Image[]>([]);

  const uploadMedia = (file: File) => {
    setImages((prev) => [
      ...prev,
      {
        url: URL.createObjectURL(file),
        name: file.name,
        type: file.type,
      },
    ]);
  };

  return (
    <div className="media-upload">
      <h3>Add photos and videos</h3>
      <FileUpload onUploadFile={uploadMedia} />
      <UploadImagesList images={images} />
    </div>
  );
};
