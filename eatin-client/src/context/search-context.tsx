import {
    createContext,
    ReactNode,
    useContext,
    useState,
} from "react";

interface Props {
    children?: ReactNode;
}

export const SearchContext = createContext({
    searchValue: "" as string,
    setSearchValue: (value: string) => {
    }
});

export const SearchProvider = ({children}: Props) => {
    const [searchValue, setSearchValue] = useState<string>("");
    const value = {
        searchValue: searchValue,
        setSearchValue: setSearchValue,
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};

export function useSearch() {
    return useContext(SearchContext);
}
