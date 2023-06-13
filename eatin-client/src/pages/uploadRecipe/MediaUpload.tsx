import "./MediaUpload.css";

import { FileUpload } from "../../components/ui/FileUpload";
import { FC, useState } from "react";

export type Image = {
    url: string;
    name: string;
    type: string;
};

interface Props {
    error?: boolean;
    helperText?: string;
    onChange: (image: File) => void;
}

export const MediaUpload: FC<Props> = ({ onChange, error, helperText }) => {
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
            {error ? <span className="error-text">{helperText}</span> : null}
            {image && (
                <div key={image.url} className="image-item">
                    <img src={image.url} alt={image.name} />
                    <div className="image-card">{image.name}</div>
                </div>
            )}
        </div>
    );
};
