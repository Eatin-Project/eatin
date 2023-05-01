import "./UploadRecipePage.css";

import { FC } from "react";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { MediaUpload } from "./MediaUpload";
import { RecipeStages } from "./RecipeStages";

import { AutocompleteItem } from "../../components/ui/Autocomplete";
import { useGetRecipeFieldOptionsQuery } from "../../generated/graphql";
import { UploadRecipeSelect } from "./UploadRecipeSelect";
import { UploadRecipeAutocomplete } from "./UploadRecipeAutocomplete";

export interface SelectRecipeMetadata {
    cuisine: string;
    course: string;
    diet: string;
    difficulty: string;
}

export interface AutocompleteRecipeMetadata {
    ingredients: AutocompleteItem[];
    tags: AutocompleteItem[];
}

export interface RecipeMetadata extends SelectRecipeMetadata, AutocompleteRecipeMetadata {
    title: string;
    description: string;
    stages: string[];
    images: string[];
}

export const UploadRecipePage: FC = () => {
    const formik = useFormik<RecipeMetadata>({
        initialValues: {
            title: "",
            cuisine: "",
            course: "",
            diet: "",
            description: "",
            stages: [""],
            ingredients: [],
            tags: [],
            images: [],
            difficulty: "",
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    function handleChange<T extends keyof RecipeMetadata>(field: T, value: RecipeMetadata[T]) {
        formik.setFieldValue(field, value);
    }

    const getErrorProps = (field: keyof RecipeMetadata) => ({
        error: formik.touched[field] && !!formik.errors[field],
        helperText: formik.touched[field] && (formik.errors[field] as any),
    });

    return (
        <div className="upload-recipe-page">
            <form onSubmit={formik.handleSubmit}>
                <div className="recipe-inputs">
                    <h2>Share a recipe:</h2>
                    <TextField
                        label="title"
                        name="title"
                        size="small"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        {...getErrorProps("title")}
                    />
                    <UploadRecipeAutocomplete
                        field="ingredients"
                        values={formik.values.ingredients}
                        onChange={handleChange}
                        {...getErrorProps("ingredients")}
                    />
                    <UploadRecipeAutocomplete
                        field="tags"
                        values={formik.values.tags}
                        onChange={handleChange}
                        {...getErrorProps("tags")}
                    />
                    <div className="select-inputs">
                        <UploadRecipeSelect
                            field="cuisine"
                            values={formik.values}
                            onChange={handleChange}
                        />
                        <UploadRecipeSelect
                            field="course"
                            values={formik.values}
                            onChange={handleChange}
                        />
                        <UploadRecipeSelect
                            field="difficulty"
                            values={formik.values}
                            onChange={handleChange}
                        />
                        <UploadRecipeSelect
                            field="diet"
                            values={formik.values}
                            onChange={handleChange}
                        />
                    </div>
                    <h2>How to cook:</h2>
                    <RecipeStages
                        stages={formik.values.stages}
                        onChange={(value) => handleChange("stages", value)}
                    />
                </div>
                <MediaUpload />
                <Button className="form-button pink-button" variant="contained" type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
};
