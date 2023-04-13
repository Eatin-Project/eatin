import { InputLabel, Select, MenuItem, FormControl, SelectChangeEvent } from "@mui/material";
import { FC } from "react";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export const GenreSelect: FC<Props> = ({ value, onChange }) => {
    const handleChange = (e: SelectChangeEvent<string>) => onChange(e.target.value);

    return (
        <FormControl sx={{ minWidth: 90 }}>
            <InputLabel size="small">Genre</InputLabel>
            <Select value={value} onChange={handleChange} size="small" autoWidth label="Genre">
                <MenuItem value={"indian"}>indian</MenuItem>
                <MenuItem value={"italian"}>italian</MenuItem>
            </Select>
        </FormControl>
    );
};
