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
import { useAddIsSavedToRecipesSection } from "../../components/functions/SavedStateInRecipes";

const _ = require("lodash");

export const HomePage: FC = () => {
    const [searchValue, setSearchValue] = useState("");
    const [allRecipes, setAllRecipes] = useState<RecipesSection[]>([]);

    const { currentFilterOptions, filteredRecipes } = useFilterRecipes(allRecipes);
    const { currentUser } = useAuth();
    const { data: recommendedRecipes, loading: recommendedRecipesLoading } = useGetSections(
        currentUser ? currentUser.uid : "",
    );

    const {
        updatedRecipes: recipesData,
        isLoading: updateSavedStateLoading,
        updateSavedStateInRecipesSection,
    } = useAddIsSavedToRecipesSection(recommendedRecipes);

    useEffect(() => {
        const initialRecipes: { name: string; recipes: Recipe[] }[] = recipesData?.map(
            (section: { name: any; recipes: any }) => ({
                name: section.name,
                recipes: section.recipes,
            }),
        );
        setAllRecipes(initialRecipes);
    }, [currentUser, recipesData]);

    const updateSearchResult = () => {
        setSearchValue("");
    };

    return (
        <div>
            <AsyncDataLoaderWrapper
                loading={recommendedRecipesLoading || updateSavedStateLoading}
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
                <RecommendedFeed
                    currentRecipes={filteredRecipes}
                    isLoadingCurrentRecipes={updateSavedStateLoading}
                    updateSavedStateInRecipesSection={updateSavedStateInRecipesSection}
                />
            </AsyncDataLoaderWrapper>
        </div>
    );
};
