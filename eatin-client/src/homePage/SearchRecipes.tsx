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
    for (let index = 0; index < searchOptions.length; index++) {
      const newVal = "0";
      newSearchVals.push(newVal);
    }
    setSearchVals(newSearchVals);
  }, []);

  const setNewValues = (index: number, value: string) => {
    const newSearchVals = searchVals;
    newSearchVals[index] = value;
    setSearchVals([...newSearchVals]);
  };

  return (
    <div className="search-recipes">
      {searchOptions.map((searchOption, index) => (
        <TextField
          key={`${index}-${searchOption.name}`}
          className="search-dropdown"
          label={searchOption.name}
          value={searchVals[index] || ""}
          select
          defaultValue={"0"}
          onChange={(event) => {
            setNewValues(index, event.target.value);
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
