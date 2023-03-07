import "./UploadRecipePage.css";

import { FC } from "react";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { AutocompleteItem } from "../ui/Autocomplete";
import { IngredientsAutocomplete } from "./IngredientsAutocomplete";
import { MediaUpload } from "./MediaUpload";
import { RecipeStages } from "./RecipeStages";
import { GenreSelect } from "./GenreSelect";
import { DifficultySelect } from "./DifficultySelect";

interface Stage {
  instruction: string;
  title?: string;
  image?: string;
}

interface RecipeMetadata {
  title: string;
  ingredients: AutocompleteItem[];
    stages: string[];
  images: string[];
  genre: string;
  difficulty: string;
}

export const UploadRecipePage: FC = () => {
  const formik = useFormik<RecipeMetadata>({
    initialValues: {
      title: "",
      genre: "",
            stages: [""],
      ingredients: [],
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
          <IngredientsAutocomplete
            values={formik.values.ingredients}
            onChange={(value) => handleChange("ingredients", value)}
            {...getErrorProps("ingredients")}
          />
                    <div className="select-inputs">
                        <GenreSelect
                            value={formik.values.genre}
                            onChange={(value) => handleChange("genre", value)}
                        />
                        <DifficultySelect
                            value={formik.values.difficulty}
                            onChange={(value) => handleChange("difficulty", value)}
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
