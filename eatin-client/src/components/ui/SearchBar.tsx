import "./SearchBar.css";

import {FC, useState} from "react";
import {Fab, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";

interface Props {
    getSearchValue: (typeValue: string) => void;
}

export const SearchBar: FC<Props> = ({getSearchValue}) => {
    const [typeValue, setTypeValue] = useState("");
    let searchButton: HTMLButtonElement;

    return (
        <div className="search-manually">
            <div className="complete-search-bar">
                <TextField
                    onChange={(event) => {
                        setTypeValue(event.target.value);
                    }}
                    onKeyDown={(event: { keyCode: number; }) => event.keyCode === 13 ? searchButton.click() : ''}
                    placeholder="Search Recipe..."
                    variant='standard'
                    className="search-bar"
                    type="text"
                    autoComplete="off"
                />
                <SearchFab variant='extended' size="small" onClick={() => getSearchValue(typeValue)} color="primary"
                           aria-label="search" ref={node => (!!node ? searchButton = node : '')}>
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
