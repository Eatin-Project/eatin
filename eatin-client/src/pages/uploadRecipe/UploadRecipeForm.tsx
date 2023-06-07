import "./UploadRecipeForm.css";

import { FC } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import { MediaUpload } from "./MediaUpload";
import { RecipeStages } from "./RecipeStages";

import { AutocompleteItem } from "../../components/ui/Autocomplete";
import { useCreateRecipeMutation } from "../../generated/graphql";
import { UploadRecipeSelect } from "./UploadRecipeSelect";
import { UploadRecipeAutocomplete } from "./UploadRecipeAutocomplete";
import { Recipe } from "../../components/types";
import { SelectInput } from "../../components/ui/SelectInput";
import { arrayToString } from "../../components/functions/stringFunctions";
import { useNavigate } from "react-router";
import { CircularProgress } from "@mui/material";
import { useAuth } from "../../context/auth-context";
import { uploadImage } from "../../firebase/firebase-service";
import { v4 as uuidv4 } from "uuid";

import { useUpdateIsUploadedRecipe } from "../../components/functions/useInsertNewUserRecipe";
import { ButtonWrapper } from "../loginPage/auth-style";
import { useToastNotification } from "../../components/functions/useToastNotification";

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
    image: File | null;
}

type NotNeededRecipeFields = "url" | "vote_count" | "rating" | "index" | "is_saved" | "is_uploaded";

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
    image: null,
    difficulty: "",
    record_health: "",
    prep_time: 0,
    cook_time: 0,
};

const checkIfNumber = (schema: yup.StringSchema) => {
    return schema.test("is-number", "must be a number", (value) => {
        if (!value) return true;
        return /^\d*\.?\d+$/.test(value);
    });
};

const checkIfStringArray = (schema: yup.ArraySchema<any[], yup.AnyObject>) => {
    return schema.of(yup.string()).test("is-string-array", "should not be empty", (value) => {
        if (!value) return true;
        return Array.isArray(value) && value.every((item) => typeof item === "string");
    });
};

const ValidationSchema = yup.object({
    title: yup.string().required(),
    cuisine: yup.string().required(),
    course: yup.string().required(),
    diet: yup.string().required(),
    category: yup.string().required(),
    description: yup.string().required(),
    stages: checkIfStringArray(yup.array().min(3, "less then 3 instructions").required()),
    ingredients: yup.array().min(3, "less then 3 ingredients").required(),
    tags: yup.array().min(1, "add at least one tag").required(),
    image: yup.mixed().required(),
    difficulty: yup.string().required(),
    record_health: yup.string().required(),
    prep_time: checkIfNumber(yup.string().required()),
    cook_time: checkIfNumber(yup.string().required()),
});

export const UploadRecipeForm: FC = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const { notify } = useToastNotification();

    const [createRecipe, { data, loading, error }] = useCreateRecipeMutation();
    const { updateIsUploaded } = useUpdateIsUploadedRecipe();

    const formik = useFormik<RecipeMetadata>({
        initialValues,
        isInitialValid: false,
        validationSchema: ValidationSchema,
        onSubmit: async (values) => {
            if (!formik.isValid || !values.image) return;

            try {
                const image = await uploadImage(uuidv4().replaceAll("-", ""), values.image);

                const recipe: Omit<Recipe, NotNeededRecipeFields> = {
                    recipe_title: values.title,
                    author: currentUser?.displayName ?? "anonymous",
                    category: values.category,
                    diet: values.diet,
                    course: values.course,
                    cuisine: values.cuisine,
                    difficulty: values.difficulty,
                    description: values.description,
                    image,
                    ingredients: arrayToString(values.ingredients.map((_) => _.title)),
                    instructions: arrayToString(values.stages),
                    tags: arrayToString(values.tags.map((_) => _.title)),
                    prep_time: Number(values.prep_time),
                    cook_time: Number(values.cook_time),
                    total_time: Number(values.prep_time) + Number(values.cook_time),
                    record_health: values.record_health,
                };

                const res = await createRecipe({ variables: recipe });
                if (!res.data?.createRecipe?.index) throw "no recipe id";

                await updateIsUploaded(true, res.data.createRecipe.index);
                navigate(`recipe/${res.data.createRecipe.index}`);
            } catch (e) {
                console.log(e);
                notify("something went wrong...");
            }
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
        <div className="upload-recipe-page-form">
            <form onSubmit={formik.handleSubmit}>
                <div className="recipe-inputs">
                    <h4>Create a New Recipe</h4>
                    <TextField
                        label="title"
                        name="title"
                        size="small"
                        variant="standard"
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
                        variant="standard"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        {...getErrorProps("description")}
                    />
                    <div className="select-inputs">
                        <TextField
                            label="prep time"
                            name="prep_time"
                            size="small"
                            variant="standard"
                            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                            onChange={formik.handleChange}
                            value={formik.values.prep_time}
                            {...getErrorProps("prep_time")}
                        />
                        <TextField
                            label="cook time"
                            name="cook_time"
                            size="small"
                            variant="standard"
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
                                {...getErrorProps(field)}
                            />
                        ))}
                        <SelectInput
                            label="record health"
                            value={formik.values.record_health}
                            minSize={150}
                            onChange={(value) => handleChange("record_health", value)}
                            options={RecordHealthOptions}
                            {...getErrorProps("record_health")}
                        />
                    </div>
                    <h5 className="instructions-title">Instructions:</h5>
                    <RecipeStages
                        stages={formik.values.stages}
                        onChange={(value) => handleChange("stages", value)}
                        {...getErrorProps("stages")}
                    />
                </div>
                <MediaUpload onChange={(value) => handleChange("image", value)} />
                <ButtonWrapper
                    type="submit"
                    disabled={loading}
                    className="form-button btn btn-primary"
                >
                    {loading ? (
                        <>
                            <CircularProgress size={15} /> Uploading
                        </>
                    ) : (
                        "Submit"
                    )}
                </ButtonWrapper>
            </form>
        </div>
    );
};
