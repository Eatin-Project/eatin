import "./HomePage.css";

import { FC, useEffect, useState } from "react";
import { RecommendedFeed } from "./RecommendedFeed";
import { Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FilterRecipes } from "./FilterRecipes";
import { Recipe, RecipesSection } from "../../components/types";
import AsyncDataLoaderWrapper from "../../components/ui/AsyncDataLoaderWrapper";
import { useGetSections } from "../../graphql/queries/sections.query";
import { useAuth } from "../../context/auth-context";
import { useFilterRecipes } from "../../components/hooks/useFilterRecipes";

const _ = require("lodash");

export const HomePage: FC = () => {
    const [searchValue, setSearchValue] = useState("");
    const [allRecipes, setAllRecipes] = useState<RecipesSection[]>([]);

    const { currentFilterOptions, filteredRecipes } = useFilterRecipes(allRecipes);
    const { currentUser } = useAuth();
    const { data: recommendedRecipes, loading: recommendedRecipesLoading } = useGetSections(
        currentUser ? currentUser.uid : "",
    );

    useEffect(() => {
        const initialRecipes: { name: string; recipes: Recipe[] }[] = recommendedRecipes?.map(
            (section: { name: any; recipes: any }) => ({
                name: section.name,
                recipes: section.recipes,
            }),
        );
        setAllRecipes(initialRecipes);
    }, [currentUser, recommendedRecipes]);

    const updateSearchResult = () => {
        setSearchValue("");
    };

    return (
        <div>
            <AsyncDataLoaderWrapper
                loading={recommendedRecipesLoading}
                text="Finding the perfect recipes for you..."
            >
                <div className="header">
                    {<FilterRecipes filterOptions={currentFilterOptions} />}
                    <div className="search-manually">
                        <div className="complete-search-bar">
                            <TextField
                                onChange={(event) => {
                                    setSearchValue(event.target.value);
                                }}
                                className="search-bar"
                                variant={undefined}
                                type="text"
                            />
                            <Button onClick={updateSearchResult} className="search-button">
                                <SearchIcon />
                            </Button>
                        </div>
                    </div>
                </div>
                <RecommendedFeed currentRecipes={filteredRecipes} />
            </AsyncDataLoaderWrapper>
        </div>
    );
};
