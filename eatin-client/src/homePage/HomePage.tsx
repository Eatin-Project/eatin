import "./HomePage.css";

import { FC, useState } from "react";
import { RecommentedFeed } from "./RecommentedFeed";
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const HomePage: FC = () => {
  const [searchFilter, setSearchFilter] = useState(false);
  const [genreFilterVal, setGenreFilterVal] = useState("1");
  const [difficultyFilterVal, setDifficultyFilterVal] = useState("1");
  const [ratingFilterVal, setRatingFilterVal] = useState("1");
  const [mustIncludeFilterVal, setMustIncludeFilterVal] = useState("1");
  const [filterSearchVal, setfilterSearchVal] = useState("");

  const checkIfNoFilterApply = () => {
    if (
      filterSearchVal === "" &&
      mustIncludeFilterVal === "1" &&
      ratingFilterVal === "1" &&
      difficultyFilterVal === "1" &&
      genreFilterVal === "1"
    ) {
      setSearchFilter(false);
    } else {
      setSearchFilter(true);
    }
  };

  return (
    <div>
      <div className="header">
        <TextField
          onChange={(event) => {
            setfilterSearchVal(event.target.value);
          }}
          className="searchbar"
          title="Search"
          variant={undefined}
          InputProps={{ endAdornment: <SearchIcon />, disableUnderline: true }}
          type="text"
        />
        <div className="search-recipes">
          <TextField
            className="search-dropdown"
            label="Genre"
            value={genreFilterVal}
            select
            onChange={(event) => {
              setGenreFilterVal(event.target.value);
            }}
          >
            <MenuItem value="1">None</MenuItem>
            <MenuItem value="2">Asian</MenuItem>
            <MenuItem value="3">Italian</MenuItem>
            <MenuItem value="4">Indian</MenuItem>
            <MenuItem value="5">French</MenuItem>
            <MenuItem value="6">Mediterranean</MenuItem>
          </TextField>
          <TextField
            label="Difficulty"
            value={difficultyFilterVal}
            select
            className="search-dropdown"
            onChange={(event) => {
              setDifficultyFilterVal(event.target.value);
            }}
          >
            <MenuItem value="1">None</MenuItem>
            <MenuItem value="2">Easy</MenuItem>
            <MenuItem value="3">Medium</MenuItem>
            <MenuItem value="4">Hard</MenuItem>
            <MenuItem value="5">Chef</MenuItem>
          </TextField>
          <TextField
            select
            label="Must Include"
            onChange={(event) => {
              setMustIncludeFilterVal(event.target.value);
            }}
            value={mustIncludeFilterVal}
            className="search-dropdown"
          >
            <MenuItem value="1">None</MenuItem>
            <MenuItem value="2">Milk</MenuItem>
            <MenuItem value="3">Flour</MenuItem>
            <MenuItem value="4">Salt</MenuItem>
            <MenuItem value="5">Chocolate</MenuItem>
          </TextField>
          <TextField
            select
            label="Rating"
            className="search-dropdown"
            onChange={(event) => {
              setRatingFilterVal(event.target.value);
            }}
            value={ratingFilterVal}
          >
            <MenuItem value="1">None</MenuItem>
            <MenuItem value="2">Under 1</MenuItem>
            <MenuItem value="3">2+</MenuItem>
            <MenuItem value="4">3+</MenuItem>
            <MenuItem value="5">4+</MenuItem>
            <MenuItem value="5">5</MenuItem>
          </TextField>
        </div>
      </div>

      {!searchFilter ? <RecommentedFeed /> : <div></div>}

      <div></div>
    </div>
  );
};
