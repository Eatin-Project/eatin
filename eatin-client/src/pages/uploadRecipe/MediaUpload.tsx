import "./MediaUpload.css";

import { FileUpload } from "../../components/ui/FileUpload";
import { FC, useState } from "react";
import { UploadImagesList } from "./UploadImagesList";

export type Image = {
    url: string;
    name: string;
    type: string;
};

interface Props {
    onChange: (image: File) => void;
}

export const MediaUpload: FC<Props> = ({ onChange }) => {
    const [image, setImage] = useState<Image>();

    const uploadMedia = (file: File) => {
        const url = URL.createObjectURL(file);

        setImage({
            url,
            name: file.name,
            type: file.type,
        });

        onChange(file);
    };

    return (
        <div className="media-upload">
            <FileUpload onUploadFile={uploadMedia} />
            {image && (
                <div key={image.url} className="image-item">
                    <img src={image.url} alt={image.name} />
                    <div className="image-card">{image.name}</div>
                </div>
            )}
            {/* <UploadImagesList images={images} /> */}
        </div>
    );
};
