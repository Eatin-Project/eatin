import "./FilterRecipes.css";

import {
    Checkbox, Fab,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent
} from "@mui/material";
import {FC, useState} from "react";
import {FilterOptions} from "../../components/types";
import styled from "styled-components";

interface Props {
    filterOptions: FilterOptions[];
}

export const FilterRecipes: FC<Props> = ({filterOptions}) => {
    const [filterValues, setFilterValues] = useState<string[][]>([[]]);

    const setNewValues = (optionIndex: number, event: SelectChangeEvent<string[]>) => {
        const newFilterValues = filterValues;
        let values: string[] = typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value;
        newFilterValues[optionIndex] = values;
        filterOptions[optionIndex].setState(values);
        setFilterValues([...newFilterValues]);
    };

    return (
        <FiltersContainer>
            <div className="filter-recipes">
                {filterOptions.map((filterOption, optionIndex) => (
                    <FormControl variant="standard" className="w-50 me-3">
                        <InputLabel>{filterOption.name}</InputLabel>
                        <Select
                            key={`${optionIndex}-${filterOption.name}}`}
                            value={!!filterValues[optionIndex] ? filterValues[optionIndex] : []}
                            onChange={(event) => {
                                setNewValues(optionIndex, event);
                            }}
                            input={<OutlinedInput label="Tag"/>}
                            renderValue={(selected) => selected.join(', ')}
                            multiple={filterOption.isMulti}
                            label={filterOption.name}
                        >
                            {filterOption.options.map((option, i) => (
                                <MenuItem value={option} key={`${i}-${option}`}>
                                    <Checkbox
                                        checked={!!filterValues[optionIndex] && filterValues[optionIndex].indexOf(option) > -1}/>
                                    <ListItemText primary={option}/>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                ))}
            </div>
        </FiltersContainer>
    );
};


export const FiltersContainer = styled.div`
  margin: 1em;
  background-color: #F8F8F8;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 40px;
  padding-bottom: 1em;
`;