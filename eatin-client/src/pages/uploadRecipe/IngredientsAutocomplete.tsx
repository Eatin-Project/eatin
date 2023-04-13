import { FC } from "react";
import { Autocomplete, AutocompleteItem } from "../../components/ui/Autocomplete";

interface Props {
    values: AutocompleteItem[]; // TODO: change to ingredient type
    onChange: (values: AutocompleteItem[]) => void;
    error?: boolean;
    helperText?: React.ReactNode;
}

export const IngredientsAutocomplete: FC<Props> = ({ onChange, values, error, helperText }) => {
    return (
        <Autocomplete
            item={values}
            multiple
            title="Ingredients"
            error={error}
            helperText={helperText}
            onItemSelected={onChange}
            options={ingredientsOptions}
        />
    );
};

const ingredientsOptions = [
    "milk",
    "bread",
    "salt",
    "suger",
    "cheese",
    "carrot",
    "water",
    "jam",
].map((_) => ({ title: _, value: _ }));
