import "./FilterRecipes.css";

import {
    Checkbox, FormControl,
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {SearchBar} from "../../components/ui/SearchBar";

interface Props {
    filterOptions: FilterOptions[];
    isSearch: boolean;
    isHidden: boolean;
    getFilterSearchValue: (searchValue: string) => void;
}

export const FilterRecipes: FC<Props> = ({filterOptions, isSearch, isHidden, getFilterSearchValue}) => {
    const [filterValues, setFilterValues] = useState<string[][]>([[]]);

    const setNewValues = (optionIndex: number, event: SelectChangeEvent<string[]>) => {
        const newFilterValues = filterValues;
        let values: string[] = typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value;
        newFilterValues[optionIndex] = values;
        filterOptions[optionIndex].setState(values);
        setFilterValues([...newFilterValues]);
    };

    // const clearValue = () => {
    //     // const newFilterValues = filterValues;
    //     // newFilterValues[optionIndex] = [];
    //     // filterOptions[optionIndex].setState([]);
    //     // setFilterValues([...newFilterValues]);
    // }

    return (
        <FiltersContainer className={isHidden ? "hidden" : "" + "p-2 mb-0"}>
            <SearchBar getSearchValue={getFilterSearchValue}/>
            {isSearch && filterOptions.map((filterOption, optionIndex) => (
                <FormControlWrapper variant="standard" className="w-50 mx-2"
                                    key={`${optionIndex}-${filterOption.name}`}>
                    <InputLabel>{filterOption.name}</InputLabel>
                    <Select
                        key={`${optionIndex}-${filterOption.name}-s`}
                        value={!!filterValues[optionIndex] ? filterValues[optionIndex] : []}
                        onChange={(event) => {
                            setNewValues(optionIndex, event);
                        }}
                        input={<OutlinedInput label="Tag"/>}
                        renderValue={(selected) => selected.join(', ')}
                        multiple={filterOption.isMulti}
                        label={filterOption.name}
                        IconComponent={ExpandMoreIcon}
                    >
                        {filterOption.options.map((option, i) => (
                            <MenuItem value={option} key={`${i}-${option}`}>
                                <Checkbox
                                    checked={!!filterValues[optionIndex] && filterValues[optionIndex].indexOf(option) > -1}/>
                                <ListItemText primary={option}/>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControlWrapper>
            ))}
        </FiltersContainer>
    );
};


export const FiltersContainer = styled.div`
  display: flex;
  margin: 1em;
  padding: 1em 1.5em 1em 1.5em !important;
  background-color: #F8F8F8;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 40px;
  width: fit-content;

  .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root {
    border-radius: 25px !important;
    min-width: 6rem !important;
    max-height: 2em !important;
  }

  .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline, .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 1px solid #E14026 !important;
  }

  .css-1nrlq1o-MuiFormControl-root {
    max-width: 9em !important;
  }

  .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root {
    left: .8em !important;
    top: -.5em !important;
    z-index: 1;
    background-color: #F8F8F8;
  }

  .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root {
    top: -1em !important;
    left: .6em !important;
  }

  .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon, .css-1mf6u8l-MuiSvgIcon-root-MuiSelect-icon {
    color: #E14026 !important;
    font-size: 1.2em !important;
  }

  .css-vrp7az-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select {
    background-color: inherit !important;
  }
`;

export const FormControlWrapper = styled(FormControl)`
  :last-child {
    margin-right: 0 !important;
  }
`;