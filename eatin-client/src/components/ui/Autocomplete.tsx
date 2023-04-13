import TextField from "@mui/material/TextField";
import MuiAutocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { UseAutocompleteProps } from "@mui/material/useAutocomplete";

export type AutocompleteItem = {
    id?: string;
    title: string;
    value: string;
};

type AutocompleteValue<Multiple extends boolean | undefined> = Multiple extends true
    ? AutocompleteItem[]
    : AutocompleteItem | null;

interface Props<Multiple extends boolean | undefined> {
    options: AutocompleteItem[];
    multiple: Multiple;
    item: AutocompleteValue<Multiple>;
    value?: string;
    loading?: boolean;
    title?: string;
    error?: boolean;
    placeholder?: string;
    helperText?: React.ReactNode;
    onItemSelected: (item: AutocompleteValue<Multiple>) => void;
    onInputChange?: (value: string) => void;
}

type MuiAutocompleteProps<T extends boolean | undefined> = UseAutocompleteProps<
    AutocompleteItem,
    T,
    undefined,
    undefined
>;

export function Autocomplete<T extends boolean | undefined>({
    options,
    value,
    item,
    multiple,
    onInputChange,
    onItemSelected,
    loading,
    title,
    error,
    helperText,
    placeholder,
}: Props<T>) {
    const handleItemSelected: MuiAutocompleteProps<T>["onChange"] = (e, item) => {
        onItemSelected(item);
    };

    const handeValueChange: MuiAutocompleteProps<T>["onInputChange"] = (e, value) => {
        onInputChange?.(value);
    };

    return (
        <MuiAutocomplete
            multiple={multiple}
            isOptionEqualToValue={(option, value) => option.title === value.title}
            getOptionLabel={(option) => option.title}
            options={options}
            loading={loading}
            inputValue={value}
            value={item}
            onChange={handleItemSelected}
            onInputChange={handeValueChange}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={title}
                    error={error}
                    size="small"
                    placeholder={placeholder}
                    helperText={helperText}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    );
}
