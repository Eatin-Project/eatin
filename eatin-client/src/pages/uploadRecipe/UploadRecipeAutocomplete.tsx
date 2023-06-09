import { FC, useMemo, useState } from "react";
import { parseStringArray, upperCaseFirstLetter } from "../../components/functions/stringFunctions";
import { Autocomplete, AutocompleteItem } from "../../components/ui/Autocomplete";
import { useGetRecipeFieldOptionsQuery } from "../../generated/graphql";
import { AutocompleteRecipeMetadata } from "./UploadRecipeForm";

type Field = keyof AutocompleteRecipeMetadata;

interface MultiProps {
    field: Field;
    values: AutocompleteItem[];
    onChange: (field: Field, values: AutocompleteItem[]) => void;
    error?: boolean;
    helperText?: React.ReactNode;
}

export const UploadRecipeMultiAutocomplete: FC<MultiProps> = ({
    onChange,
    field,
    values,
    error,
    helperText,
}) => {
    const [value, setValue] = useState("");
    const { data, loading } = useGetRecipeFieldOptionsQuery({
        variables: { field, value },
    });

    const options = useMemo(() => {
        const results = data?.recipeFieldOptions
            ?.flatMap((_) => parseStringArray(_))
            .filter((_) => _.toLowerCase().includes(value.toLowerCase()));

        const noDupes = results ? [...new Set(results)] : [];

        return noDupes.map((_) => ({ title: _, value: _ }));
    }, [value, data?.recipeFieldOptions]);

    const handleChange = (items: AutocompleteItem[]) => {
        onChange(field, items);
    };

    return (
        <Autocomplete
            item={values}
            value={value}
            multiple
            freeSolo
            loading={loading}
            title={upperCaseFirstLetter(field)}
            error={error}
            helperText={helperText}
            onItemSelected={handleChange}
            onInputChange={setValue}
            options={options}
        />
    );
};


interface Props extends Omit<MultiProps, 'values' | 'onChange'> {
    value: AutocompleteItem | null;
    onChange: (field: Field, values: AutocompleteItem | null) => void;
}

export const UploadRecipeAutocomplete: FC<Props> = ({
    onChange,
    field,
    value,
    error,
    helperText,
}) => {
    const [userValue, setUserValue] = useState("");
    const { data, loading } = useGetRecipeFieldOptionsQuery({
        variables: { field, value: userValue },
    });

    const options = useMemo(() => {
        const results = data?.recipeFieldOptions ?? [];

        const noDupes = results ? [...new Set(results)] : [];

        return noDupes.map((_) => ({ title: _, value: _ }));
    }, [data?.recipeFieldOptions]);

    const handleChange = (item: AutocompleteItem | null) => {
        onChange(field, item);
    };

    return (
        <Autocomplete
            item={value}
            value={userValue}
            freeSolo
            multiple={false}
            loading={loading}
            title={upperCaseFirstLetter(field)}
            error={error}
            helperText={helperText}
            onItemSelected={handleChange}
            onInputChange={setUserValue}
            options={options}
        />
    );
};