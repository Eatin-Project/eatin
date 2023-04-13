import "./UploadImagesList.css";

import CancelIcon from "@mui/icons-material/Cancel";
import { FC } from "react";

import { Image } from "./MediaUpload";

interface Props {
    images: Image[];
}

export const UploadImagesList: FC<Props> = ({ images }) => {
    return (
        <div className="upload-images-list">
            <div className="images">
                {images.map((image) => (
                    <div key={image.url} className="image-item">
                        <img src={image.url} alt={image.name} />
                        <CancelIcon className="delete-image" fontSize="small" />
                        <div className="image-card">{image.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
