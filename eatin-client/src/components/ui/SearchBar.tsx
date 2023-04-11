import "./SearchBar.css";

import {FC, useState} from "react";
import {Button, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useSearch} from "../../context/search-context";

export const SearchBar: FC = ({}) => {
    const [typeValue, setTypeValue] = useState("");
    const {setSearchValue} = useSearch();
    const updateSearchValue = () => {
        setSearchValue(typeValue);
    };

    return (
        <div className="search-manually">
            <div className="complete-search-bar">
                <TextField
                    onBlur={(event) => {
                        setTypeValue(event.target.value);
                    }}
                    variant='standard'
                    className="search-bar"
                    type="text"
                />
                <Button onClick={updateSearchValue} className="search-button">
                    <SearchIcon/>
                </Button>
            </div>
        </div>
    );
};
