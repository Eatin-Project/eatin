import "./HomePage.css";

import {FC, useEffect, useState} from "react";
import {RecommentedFeed} from "./RecommentedFeed";
import {Button, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {Item} from "./Carousel";
import {SearchRecipes} from "./SearchRecipes";
import {
    useGetTopRatedRecipesByCategoryQuery,
    useGetTopRatedRecipesByCuisineQuery
} from "../generated/graphql";
import {Category} from "./categories.enum";
import {Cuisine} from "./cuisines.enum";

export const HomePage: FC = () => {
    const [searchFilter, setSearchFilter] = useState(false);
    const [genreFilterVal, setGenreFilterVal] = useState("1");
    const [difficultyFilterVal, setDifficultyFilterVal] = useState("1");
    const [ratingFilterVal, setRatingFilterVal] = useState("1");
    const [filterSearchVal, setfilterSearchVal] = useState("");
    const [SearchResult, setSearchResult] = useState("");
    const [currentShownRecipes, setCurrentShownRecipes] = useState<{
        name: string;
        items: Item[];
    }[]>([]);

    const eggs = useGetTopRatedRecipesByCategoryQuery({variables: {category: Category.Egg}}).data?.topRecipesByCategory;
    const cakes = useGetTopRatedRecipesByCategoryQuery({variables: {category: Category.Cake}}).data?.topRecipesByCategory;
    const japanese = useGetTopRatedRecipesByCuisineQuery({variables: {cuisine: Cuisine.Japanese}}).data?.topRecipesByCuisine;

  // This is temp
  function getItemsArray(recipes: any) {
        const items: Item[] = [];
        recipes?.forEach((recipe: { index: string; recipe_title: string; url: string; record_health: string; vote_count: string; rating: string; description: string; cuisine: string; course: string; diet: string; prep_time: string; cook_time: string; ingredients: string; instructions: string; author: string; tags: string; category: string; image: string; difficulty: string; }) => items.push(new Item(recipe.index, recipe.recipe_title, recipe.url, recipe.record_health, recipe.vote_count, recipe.rating, recipe.description, recipe.cuisine, recipe.course, recipe.diet, recipe.prep_time, recipe.cook_time, recipe.ingredients, recipe.instructions, recipe.author, recipe.tags, recipe.category, recipe.image, recipe.difficulty)));
        return items;
    }

  // This is temp
  useEffect(() => {
        const eggItems = getItemsArray(eggs);
        const cakeItems = getItemsArray(cakes);
        const japaneseItems = getItemsArray(japanese);
        setCurrentShownRecipes([{name: Category.Egg.toString(), items: eggItems},
            {name: Category.Cake.toString(), items: cakeItems},
            {name: Cuisine.Japanese.toString(), items: japaneseItems}]);
    }, [currentShownRecipes]);

    const currentFilterOptions: {
        name: string;
        options: string[];
        funcToUpdate: (arg0: string) => void;
    }[] = [
        {
            name: "Genre",
            options: [
                "None",
                "Asian",
                "Italian",
                "Indian",
                "French",
                "Mediterranean",
            ],
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
        // here we will update the shown recipes....
    };

    const showSavedRecipes = () => {
        // here we will update the shown recipes....
    };

    return (
        <div>
            <div className="header">
                {<SearchRecipes searchOptions={currentFilterOptions}/>}
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

            {!searchFilter ? (
                <RecommentedFeed currentRecipes={currentShownRecipes}/>
            ) : (
                <div></div>
            )}

            <div></div>
        </div>
    );
};
