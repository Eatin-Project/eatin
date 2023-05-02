import { SelectChangeEvent, InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import { FC } from "react";
import { upperCaseFirstLetter } from "../functions/stringFunctions";

interface SelectInputProps {
    value: string;
    label: string;
    options?: string[];
    minSize?: number;
    onChange: (value: string) => void;
}

export const SelectInput: FC<SelectInputProps> = ({ value, onChange, options, minSize, label }) => {
    const handleChange = (e: SelectChangeEvent<string>) => onChange(e.target.value);

    return (
        <FormControl sx={{ minWidth: minSize ?? 100 }}>
            <InputLabel size="small">{upperCaseFirstLetter(label)}</InputLabel>
            <Select value={value} onChange={handleChange} size="small" autoWidth label={label}>
                {options?.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
