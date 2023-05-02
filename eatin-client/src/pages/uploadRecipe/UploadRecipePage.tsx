import "./UploadRecipePage.css";

import { FC } from "react";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { MediaUpload } from "./MediaUpload";
import { RecipeStages } from "./RecipeStages";

import { AutocompleteItem } from "../../components/ui/Autocomplete";
import { useCreateRecipeMutation } from "../../generated/graphql";
import { SelectInput, UploadRecipeSelect } from "./UploadRecipeSelect";
import { UploadRecipeAutocomplete } from "./UploadRecipeAutocomplete";
import { Recipe } from "../../components/types";

export interface SelectRecipeMetadata {
    cuisine: string;
    course: string;
    diet: string;
    category: string;
    difficulty: string;
}

export interface AutocompleteRecipeMetadata {
    ingredients: AutocompleteItem[];
    tags: AutocompleteItem[];
}

interface NumericRecipeMetadata {
    prep_time: number;
    cook_time: number;
}

export interface RecipeMetadata
    extends SelectRecipeMetadata,
        AutocompleteRecipeMetadata,
        NumericRecipeMetadata {
    title: string;
    description: string;
    record_health: string;
    stages: string[];
    image: string;
}

const selectInputsKeys: Array<keyof SelectRecipeMetadata> = [
    "category",
    "course",
    "cuisine",
    "diet",
    "difficulty",
];

const RecordHealthOptions = ["good", "bad", "normal"];

const initialValues: RecipeMetadata = {
    title: "",
    cuisine: "",
    course: "",
    diet: "",
    category: "",
    description: "",
    stages: [""],
    ingredients: [],
    tags: [],
    image: "",
    difficulty: "",
    record_health: "",
    prep_time: 0,
    cook_time: 0,
};

export const UploadRecipePage: FC = () => {
    const [createRecipe, { data, loading, error }] = useCreateRecipeMutation();
    console.log("🚀 ~ file: UploadRecipePage.tsx:36 ~ data, loading,error:", data, loading, error);

    const formik = useFormik<RecipeMetadata>({
        initialValues,
        onSubmit: (values) => {
            const recipe: Recipe = {
                recipe_title: values.title,
                author: "shirley",
                category: values.category,
                diet: values.diet,
                course: values.course,
                cuisine: values.cuisine,
                difficulty: values.difficulty,
                description: values.description,
                image: values.image,
                ingredients: values.ingredients.map((_) => _.title).join(","),
                instructions: values.stages.join(","),
                tags: values.tags.map((_) => _.title).join(","),
                prep_time: Number(values.prep_time),
                cook_time: Number(values.cook_time),
                total_time: Number(values.prep_time) + Number(values.cook_time),
                record_health: values.record_health,
                url: "",
                vote_count: 0,
                index: 20000000,
                rating: 0,
            };
            createRecipe({ variables: recipe });
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
                    <h4>Create a New Recipe</h4>
                    <TextField
                        label="title"
                        name="title"
                        size="small"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        {...getErrorProps("title")}
                    />
                    <TextField
                        label="description"
                        name="description"
                        size="small"
                        multiline
                        fullWidth
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        {...getErrorProps("description")}
                    />
                    <div className="select-inputs">
                        <TextField
                            label="prep time"
                            name="prep_time"
                            size="small"
                            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                            onChange={formik.handleChange}
                            value={formik.values.prep_time}
                            {...getErrorProps("prep_time")}
                        />
                        <TextField
                            label="cook time"
                            name="cook_time"
                            size="small"
                            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                            onChange={formik.handleChange}
                            value={formik.values.cook_time}
                            {...getErrorProps("cook_time")}
                        />
                    </div>
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
                        {selectInputsKeys.map((field) => (
                            <UploadRecipeSelect
                                key={field}
                                field={field}
                                values={formik.values}
                                onChange={handleChange}
                            />
                        ))}
                        <SelectInput
                            label="record health"
                            value={formik.values.record_health}
                            minSize={150}
                            onChange={(value) => handleChange("record_health", value)}
                            options={RecordHealthOptions}
                        />
                    </div>
                    <h5 className="instructions-title">Instructions:</h5>
                    <RecipeStages
                        stages={formik.values.stages}
                        onChange={(value) => handleChange("stages", value)}
                    />
                </div>
                <MediaUpload onChange={(value) => handleChange("image", value)} />
                <Button className="form-button red-button" variant="contained" type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
};
