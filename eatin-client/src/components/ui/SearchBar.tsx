import "./SearchBar.css";

import {FC, useState} from "react";
import {Fab, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useSearch} from "../../context/search-context";
import styled from "styled-components";

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
                    placeholder="Search Recipe..."
                    variant='standard'
                    className="search-bar"
                    type="text"
                />
                <SearchFab variant='extended' size="small" onClick={updateSearchValue} color="primary"
                     aria-label="search">
                    <SearchIcon/>
                </SearchFab>
            </div>
        </div>
    );
};

export const SearchFab = styled(Fab)`
  background: linear-gradient(90deg, #E04490 0%, #E14026 47.92%, #E5622D 98.44%);
  &:hover {
    opacity: 0.9;
  }

  .css-i4bv87-MuiSvgIcon-root {
    font-size: 1rem !important;
  }
`;
