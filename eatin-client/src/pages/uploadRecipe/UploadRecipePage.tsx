import "./UploadRecipePage.css";

import { FC } from "react";
import { ReactComponent as BookImg } from "../../assets/Book.svg";
import { UploadRecipeForm } from "./UploadRecipeForm";

export const UploadRecipePage: FC = () => {
    return (
        <div className="upload-recipe-page">
            <UploadRecipeForm />
            <div className="book-img">
                <BookImg />
            </div>
        </div>
    );
};
