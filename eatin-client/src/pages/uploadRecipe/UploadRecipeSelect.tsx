import { FC } from "react";
import { SelectInput } from "../../components/ui/SelectInput";
import { useGetRecipeFieldOptionsQuery } from "../../generated/graphql";
import type { RecipeMetadata, SelectRecipeMetadata } from "./UploadRecipePage";

type Field = SelectRecipeMetadata;

interface Props {
    field: keyof Field;
    values: RecipeMetadata;
    onChange: (field: keyof Field, value: string) => void;
}

export const UploadRecipeSelect: FC<Props> = ({ field, values, onChange }) => {
    const { data } = useGetRecipeFieldOptionsQuery({
        variables: { field, value: "" },
    });

    const handleChange = (value: string) => onChange(field, value);
    return (
        <SelectInput
            label={field}
            value={values[field]}
            onChange={handleChange}
            options={data?.recipeFieldOptions}
        />
    );
};
