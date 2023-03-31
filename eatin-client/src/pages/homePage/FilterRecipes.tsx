import "./FilterRecipes.css";

import { MenuItem, TextField } from "@mui/material";
import { FC, useState } from "react";
import { GiTrashCan } from "react-icons/gi";
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

    function onClear(optionIndex: number) {
        setNewValues(optionIndex, "");
    }

    return (
        <div className="filter-recipes">
            {filterOptions.map((filterOption, optionIndex) => (
                <div className="filter-dropdown" key={optionIndex}>
                    {!!filterValues[optionIndex] && (
                        <GiTrashCan
                            size="1.5rem"
                            className="trash-icon"
                            onClick={() => onClear(optionIndex)}
                        />
                    )}
                    <TextField
                        key={`${optionIndex}-${filterOption.name}`}
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
                </div>
            ))}
        </div>
    );
};
