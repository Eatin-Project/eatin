import "./FilterRecipes.css";

import { MenuItem, TextField } from "@mui/material";
import { FC, useState } from "react";
import { FilterOptions } from "../../components/types";

interface Props {
    filterOptions: FilterOptions[];
}

export const FilterRecipes: FC<Props> = ({ filterOptions }) => {
    const [filterValues, setFilterValues] = useState<string[]>([]);

    const setNewValues = (optionIndex: number, value: string) => {
        const newFilterValues = filterValues;
        newFilterValues[optionIndex] = value;
        filterOptions[optionIndex].setState(value);
        setFilterValues([...newFilterValues]);
    };

    return (
        <div className="filter-recipes">
            {filterOptions.map((filterOption, optionIndex) => (
                <TextField
                    key={`${optionIndex}-${filterOption.name}`}
                    className="filter-dropdown"
                    label={filterOption.name}
                    value={filterValues[optionIndex] || ""}
                    select
                    onChange={(event) => {
                        setNewValues(optionIndex, event.target.value);
                    }}
                >
                    {filterOption.options.map((option, i) => (
                        <MenuItem value={option} key={`${i}-${filterOption.name}`}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            ))}
        </div>
    );
};
