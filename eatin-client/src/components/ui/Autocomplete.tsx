import TextField from "@mui/material/TextField";
import MuiAutocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { UseAutocompleteProps } from "@mui/material/useAutocomplete";

const filter = createFilterOptions<AutocompleteItem>();

export type AutocompleteItem = {
    id?: string;
    title: string;
    value: string;
    inputValue?: string;
};

type AutocompleteValue<Multiple extends boolean | undefined> = Multiple extends true
    ? AutocompleteItem[]
    : AutocompleteItem | null;

interface Props<Multiple extends boolean | undefined, FreeSolo extends boolean | undefined> {
    options: AutocompleteItem[];
    multiple: Multiple;
    item: AutocompleteValue<Multiple>;
    value?: string;
    loading?: boolean;
    title?: string;
    error?: boolean;
    placeholder?: string;
    helperText?: React.ReactNode;
    freeSolo?: FreeSolo;
    onAddValue?: FreeSolo extends true ? (value: string) => void : never;
    onItemSelected: (item: AutocompleteValue<Multiple>) => void;
    onInputChange?: (value: string) => void;
}

type MuiAutocompleteProps<
    Multipile extends boolean | undefined,
    FreeSolo extends boolean | undefined,
> = UseAutocompleteProps<AutocompleteItem, Multipile, undefined, FreeSolo>;

export function Autocomplete<
    Multipile extends boolean | undefined,
    FreeSolo extends boolean | undefined,
>({
    options,
    value,
    item,
    multiple,
    onInputChange,
    onItemSelected,
    loading,
    onAddValue,
    freeSolo,
    title,
    error,
    helperText,
    placeholder,
}: Props<Multipile, FreeSolo>) {
    const handleItemSelected: MuiAutocompleteProps<Multipile, FreeSolo>["onChange"] = (
        e,
        value,
    ) => {
        if (typeof value === "string") {
            // The user entered a new value that doesn't exist in the options array
            const newOption: AutocompleteItem = {
                title: value,
                value,
            };

            onAddValue?.(value);

            if (multiple) {
                const newItems = [...(item as AutocompleteValue<true>), newOption];
                return onItemSelectedMultiple(newItems);
            }
            return onItemSelected(newOption as any);
        }
        if (multiple && freeSolo)
            return onItemSelectedMultiple(
                (value as AutocompleteValue<true>).map(({ inputValue, ...item }) => item),
            );

        onItemSelected(value as AutocompleteValue<Multipile>);
    };

    const onItemSelectedMultiple = (items: AutocompleteValue<true>) => {
        onItemSelected(items as any);
    };

    const filterOptions: MuiAutocompleteProps<Multipile, FreeSolo>["filterOptions"] = (
        options,
        params,
    ) => {
        const filtered = filter(options, params);

        if (
            params.inputValue !== "" &&
            freeSolo &&
            !options.some((_) => _.title === params.inputValue)
        ) {
            filtered.push({
                value: params.inputValue,
                inputValue: `Add "${params.inputValue}"`,
                title: params.inputValue,
            });
        }

        return filtered;
    };

    const getOptionLabel: MuiAutocompleteProps<Multipile, FreeSolo>["getOptionLabel"] = (
        option,
    ) => {
        if (typeof option === "string") return option;

        if (option.inputValue) return option.inputValue;

        return option.title;
    };

    return (
        <MuiAutocomplete
            multiple={multiple}
            isOptionEqualToValue={(option, value) => option.title === value.title}
            onInputChange={(e, value) => onInputChange?.(value)}
            options={options}
            loading={loading}
            inputValue={value}
            value={item}
            freeSolo={freeSolo}
            getOptionLabel={getOptionLabel}
            onChange={handleItemSelected}
            filterOptions={filterOptions}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={title}
                    error={error}
                    size="small"
                    variant="standard"
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
