import {
    SelectChangeEvent,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    FormHelperText,
} from "@mui/material";
import { FC } from "react";
import { upperCaseFirstLetter } from "../functions/stringFunctions";

export interface SelectInputProps {
    value: string;
    label: string;
    options?: string[];
    minSize?: number;
    error?: boolean;
    helperText?: string;
    onChange: (value: string) => void;
}

export const SelectInput: FC<SelectInputProps> = ({
    value,
    onChange,
    options,
    minSize,
    label,
    error,
    helperText,
}) => {
    const handleChange = (e: SelectChangeEvent<string>) => onChange(e.target.value);

    return (
        <FormControl sx={{ minWidth: minSize ?? 100 }} error={error}>
            <InputLabel size="small">{upperCaseFirstLetter(label)}</InputLabel>

            <Select
                value={value}
                onChange={handleChange}
                size="small"
                variant="standard"
                autoWidth
                label={label}
            >
                {options?.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
            {error ? <FormHelperText>{helperText}</FormHelperText> : undefined}
        </FormControl>
    );
};
