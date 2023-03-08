import "./SearchRecipes.css";

import { MenuItem, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";

interface Props {
  searchOptions: {
    name: string;
    options: string[];
    funcToUpdate: (arg0: string) => void;
  }[];
}

export const SearchRecipes: FC<Props> = ({ searchOptions }) => {
  const [searchVals, setSearchVals] = useState<string[]>([]);

  useEffect(() => {
    const newSearchVals: string[] = [];
    for (let optionIndex = 0; optionIndex < searchOptions.length; optionIndex++) {
      const newVal = "0";
      newSearchVals.push(newVal);
    }
    setSearchVals(newSearchVals);
  }, []);

  const setNewValues = (optionIndex: number, value: string) => {
    const newSearchVals = searchVals;
    newSearchVals[optionIndex] = value;
    setSearchVals([...newSearchVals]);
  };

  return (
    <div className="search-recipes">
      {searchOptions.map((searchOption, optionIndex) => (
        <TextField
          key={`${optionIndex}-${searchOption.name}`}
          className="search-dropdown"
          label={searchOption.name}
          value={searchVals[optionIndex] || ""}
          select
          defaultValue={"0"}
          onChange={(event) => {
            setNewValues(optionIndex, event.target.value);
          }}
        >
          {searchOption.options.map((option, i) => (
            <MenuItem value={i.toString()} key={`${i}-${searchOption.name}`}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      ))}
    </div>
  );
};
