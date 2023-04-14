import "./FilterRecipes.css";

import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {FC, useState} from "react";
import {FilterOptions} from "../../components/types";

interface Props {
    filterOptions: FilterOptions[];
}

export const FilterRecipes: FC<Props> = ({filterOptions}) => {
    const [filterValues, setFilterValues] = useState<string[][]>([[]]);

    const setNewValues = (optionIndex: number, event: SelectChangeEvent<string[]>) => {
        const newFilterValues = filterValues;
        let values: string[] = typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value ;
        // let newVal = typeof value === 'string' ? value.split(',') : value;
        newFilterValues[optionIndex] = values;
        filterOptions[optionIndex].setState(values);
        setFilterValues([...newFilterValues]);
    };

    return (
        <div className="filter-recipes">
            {filterOptions.map((filterOption, optionIndex) => (
                <FormControl variant="standard" className="w-50 me-3">
                    <>{console.log(filterValues[optionIndex])}</>
                    <InputLabel>{filterOption.name}</InputLabel>
                    <Select
                        key={`${optionIndex}-${filterOption.name}}`}
                        value={filterValues[optionIndex]}
                        onChange={(event) => {
                            setNewValues(optionIndex, event);
                        }}
                        multiple
                        label={filterOption.name}
                    >
                        {filterOption.options.map((option, i) => (
                            <MenuItem value={option} key={`${i}-${option}`}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                // <div className="filter-dropdown" key={optionIndex}>
                //     {!!filterValues[optionIndex] && (
                //         <GiTrashCan
                //             size="1.5rem"
                //             className="trash-icon"
                //             onClick={() => onClear(optionIndex)}
                //         />
                //     )}
                //     <TextField
                //         key={`${optionIndex}-${filterOption.name}`}
                //         label={filterOption.name}
                //         value={filterValues[optionIndex] || ""}
                //         select
                //         onChange={(event) => {
                //             setNewValues(optionIndex, event.target.value);
                //         }}
                //     >
                //         {filterOption.options.map((option, i) => (
                //             <MenuItem value={option} key={`${i}-${filterOption.name}`}>
                //                 {option}
                //             </MenuItem>
                //         ))}
                //     </TextField>
                // </div>
            ))}
        </div>
    );
};
