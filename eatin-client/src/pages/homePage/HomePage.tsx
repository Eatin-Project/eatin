import "./HomePage.css";

import { FC, useEffect, useState } from "react";
import { RecommentedFeed } from "./RecommentedFeed";
import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SearchRecipes } from "./SearchRecipes";
import {
    useGetTopRatedRecipesByCategoryQuery,
    useGetTopRatedRecipesByCuisineQuery,
} from "../../generated/graphql";
import { Category } from "./categories.enum";
import { Cuisine } from "./cuisines.enum";
import { Recipe } from "../../components/types";

export const HomePage: FC = () => {
    const [genreFilterVal, setGenreFilterVal] = useState("1");
    const [difficultyFilterVal, setDifficultyFilterVal] = useState("1");
    const [ratingFilterVal, setRatingFilterVal] = useState("1");
    const [filterSearchVal, setfilterSearchVal] = useState("");
    const [SearchResult, setSearchResult] = useState("");
    const [currentShownRecipes, setCurrentShownRecipes] = useState<
        {
            name: string;
            items: Recipe[];
        }[]
    >([]);

    const eggs = useGetTopRatedRecipesByCategoryQuery({ variables: { category: Category.Egg } })
        .data?.topRecipesByCategory;
    const cakes = useGetTopRatedRecipesByCategoryQuery({ variables: { category: Category.Cake } })
        .data?.topRecipesByCategory;
    const japanese = useGetTopRatedRecipesByCuisineQuery({
        variables: { cuisine: Cuisine.Japanese },
    }).data?.topRecipesByCuisine;
    const greek = useGetTopRatedRecipesByCuisineQuery({ variables: { cuisine: Cuisine.Greek } })
        .data?.topRecipesByCuisine;

    const getItemAsRecipe = (item: any) => {
        const newItems: Recipe[] = [];
        item?.forEach((it: any) => {
            newItems.push({
                index: it.index,
                recipe_title: it.recipe_title,
                url: it.url,
                record_health: it.record_health,
                vote_count: it.vote_count,
                rating: it.rating,
                description: it.description,
                cuisine: it.cuisine,
                course: it.course,
                diet: it.diet,
                prep_time: it.prep_time,
                cook_time: it.cook_time,
                ingredients: it.ingredients,
                instructions: it.instructions,
                author: it.author,
                tags: it.tags,
                category: it.category,
                image: it.image,
                difficulty: it.difficulty,
            });
        });
        return newItems;
    };

    useEffect(() => {
        // TODO: get the recommented recipes
        setCurrentShownRecipes([
            { name: Category.Egg.toString(), items: getItemAsRecipe(eggs) },
            { name: Category.Cake.toString(), items: getItemAsRecipe(cakes) },
            { name: Cuisine.Japanese.toString(), items: getItemAsRecipe(japanese) },
            { name: Cuisine.Greek.toString(), items: getItemAsRecipe(greek) },
        ]);
    }, [currentShownRecipes, cakes, eggs, japanese, greek]);

    const currentFilterOptions: {
        // TODO: for now the options are hardcoded until we get all the recommented recipes and can have the filter accordently
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
        setfilterSearchVal("");
    };

    const showMyRecipes = () => {
        // TODO: here we will update the shown recipes....
    };

    const showSavedRecipes = () => {
        // TODO: here we will update the shown recipes....
    };

    return (
        <div>
            <div className="header">
                {<SearchRecipes searchOptions={currentFilterOptions} />}
                <div className="searchManually">
                    <span className="searchResult">{SearchResult}</span>
                    <div className="completeSearchBar">
                        <TextField
                            onChange={(event) => {
                                setfilterSearchVal(event.target.value);
                            }}
                            className="searchbar"
                            variant={undefined}
                            type="text"
                        />
                        <Button onClick={updateSearchResult} className="searchButton">
                            <SearchIcon />
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

            <RecommentedFeed currentRecipes={currentShownRecipes} />

            <div></div>
        </div>
    );
};
