import { InputLabel, Select, MenuItem, FormControl, SelectChangeEvent } from "@mui/material";
import { FC } from "react";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export const DifficultySelect: FC<Props> = ({ value, onChange }) => {
    const handleChange = (e: SelectChangeEvent<string>) => onChange(e.target.value);

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel size="small">Difficulty</InputLabel>
            <Select value={value} onChange={handleChange} size="small" autoWidth label="Difficulty">
                <MenuItem value={"easy"}>easy</MenuItem>
                <MenuItem value={"medium"}>medium</MenuItem>
                <MenuItem value={"hard"}>hard</MenuItem>
            </Select>
        </FormControl>
    );
};
