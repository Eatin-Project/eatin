import "./RecipeItem.css";

import {FC, useState} from "react";
import {Button, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const SearchBar: FC = ({}) => {
    const [typeValue, setTypeValue] = useState("");
    const [searchValue, setSearchValue] = useState("");

    const updateSearchResult = () => {
        setSearchValue(typeValue);
    };

    return (
        <div className="search-manually">
            <div className="complete-search-bar">
                <TextField
                    onBlur={(event) => {
                        setTypeValue(event.target.value);
                    }}
                    className="search-bar"
                    variant={undefined}
                    type="text"
                />
                <Button onClick={updateSearchResult} className="search-button">
                    <SearchIcon/>
                </Button>
            </div>
        </div>
    );
};
