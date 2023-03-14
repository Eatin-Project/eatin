import "./HomePage.css";

import { FC, useEffect, useState } from "react";
import { RecommendedFeed } from "./RecommendedFeed";
import { Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SearchRecipes } from "./SearchRecipes";
import {
    useGetTopRatedRecipesByCategoryQuery,
    useGetTopRatedRecipesByCuisineQuery,
} from "../generated/graphql";
import { Category } from "./categories.enum";
import { Cuisine } from "./cuisines.enum";
import { Recipe } from "../components/types";
import AsyncDataLoaderWrapper from "../components/ui/AsyncDataLoaderWrapper";

export const HomePage: FC = () => {
    const [genreFilterVal, setGenreFilterVal] = useState("1");
    const [difficultyFilterVal, setDifficultyFilterVal] = useState("1");
    const [ratingFilterVal, setRatingFilterVal] = useState("1");
    const [filterSearchVal, setFilterSearchVal] = useState("");
    const [SearchResult, setSearchResult] = useState("");
    const [loading, setLoading] = useState(true);

    const [currentShownRecipes, setCurrentShownRecipes] = useState<
        {
            name: string;
            items: Recipe[];
        }[]
    >([]);

    const { data: chicken, loading: chickenLoading, error: chickenErrors } = useGetTopRatedRecipesByCategoryQuery({variables: {category: Category.Chicken}});
    const { data: cakes, loading: cakesLoading, error: cakesErrors } = useGetTopRatedRecipesByCategoryQuery({variables: {category: Category.Cake}});
    const { data: japanese, loading: japaneseLoading, error: japaneseErrors } = useGetTopRatedRecipesByCuisineQuery({variables: {cuisine: Cuisine.Japanese}});
    const { data: greek, loading: greekLoading, error: greekErrors } = useGetTopRatedRecipesByCuisineQuery({variables: {cuisine: Cuisine.Greek}});

    useEffect(() => {
        // TODO: get the recommended recipes
        setCurrentShownRecipes([
            {name: Category.Chicken.toString(), items: chicken?.topRecipesByCategory?.length ? chicken?.topRecipesByCategory : []},
            {name: Category.Cake.toString(), items: cakes?.topRecipesByCategory?.length ? cakes?.topRecipesByCategory : []},
            {name: Cuisine.Japanese.toString(), items: japanese?.topRecipesByCuisine?.length ? japanese.topRecipesByCuisine : []},
            {name: Cuisine.Greek.toString(), items: greek?.topRecipesByCuisine?.length ? greek.topRecipesByCuisine : []},
        ]);
        handleLoading();

    }, [currentShownRecipes, chicken?.topRecipesByCategory, cakes?.topRecipesByCategory, japanese?.topRecipesByCuisine, greek?.topRecipesByCuisine]);

    function handleLoading() {
        if (!chickenLoading && !cakesLoading && !japaneseLoading && !greekLoading)
            setLoading(false);
    }

    const currentFilterOptions: {
        // TODO: for now the options are hardcoded until we get all the recommended recipes and can have the filter accordingly
        name: string;
        options: string[];
        funcToUpdate: (arg0: string) => void;
    }[] = [
        {
            name: "Genre",
            options: ["None", "Asian", "Italian", "Indian", "French", "Mediterranean"],
            funcToUpdate: setGenreFilterVal,
        },
        {
            name: "Difficulty",
            options: ["None", "Easy", "Medium", "Hard", "Chef"],
            funcToUpdate: setDifficultyFilterVal,
        },
        {
            name: "Rating",
            options: ["None", "Under 1", "2+", "3+", "4+", "5"],
            funcToUpdate: setRatingFilterVal,
        },
    ];

    const updateSearchResult = () => {
        setSearchResult(filterSearchVal);
        setFilterSearchVal("");
    };

    const showMyRecipes = () => {
        // TODO: here we will update the shown recipes....
    };

    const showSavedRecipes = () => {
        // TODO: here we will update the shown recipes....
    };

    return (
        <div>
            <AsyncDataLoaderWrapper loading={loading} text="loading recipes...">
            <div className="header">
                {<SearchRecipes searchOptions={currentFilterOptions}/>}
                <div className="searchManually">
                    <span className="searchResult">{SearchResult}</span>
                    <div className="completeSearchBar">
                        <TextField
                            onChange={(event) => {
                                setFilterSearchVal(event.target.value);
                            }}
                            className="searchbar"
                            variant={undefined}
                            type="text"
                        />
                        <Button onClick={updateSearchResult} className="searchButton">
                            <SearchIcon/>
                        </Button>
                    </div>
                </div>
            </div>
            <div>
                <Button className="recipesBtn" onClick={showMyRecipes}>
                    My Recipes
                </Button>
                <Button className="recipesBtn" onClick={showSavedRecipes}>
                    Saved Recipes
                </Button>
            </div>
            <RecommendedFeed currentRecipes={currentShownRecipes}/>
            <div></div>
            </AsyncDataLoaderWrapper>
        </div>
    );
};
