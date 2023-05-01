import { InputLabel, Select, MenuItem, FormControl, SelectChangeEvent } from "@mui/material";
import { FC } from "react";
import { upperCaseFirstLetter } from "../../components/functions/stringFunctions";
import { useGetRecipeFieldOptionsQuery } from "../../generated/graphql";
import type { RecipeMetadata, SelectRecipeMetadata } from "./UploadRecipePage";

type Field = SelectRecipeMetadata;

interface Props {
    field: keyof Field;
    title?: string;
    values: RecipeMetadata;
    onChange: (field: keyof Field, value: string) => void;
}

export const UploadRecipeSelect: FC<Props> = ({ field, title, values, onChange }) => {
    const { data } = useGetRecipeFieldOptionsQuery({
        variables: { field, value: "" },
    });

    const handleChange = (e: SelectChangeEvent<string>) => onChange(field, e.target.value);

    return (
        <FormControl sx={{ minWidth: 100 }}>
            <InputLabel size="small">{title ?? upperCaseFirstLetter(field)}</InputLabel>
            <Select
                value={values[field]}
                onChange={handleChange}
                size="small"
                autoWidth
                label={field}
            >
                {data?.recipeFieldOptions?.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
