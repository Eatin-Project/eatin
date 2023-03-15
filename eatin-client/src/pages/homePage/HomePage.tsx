import "./HomePage.css";

import { FC, useEffect, useState } from "react";
import { RecommendedFeed } from "./RecommendedFeed";
import { Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FilterRecipes } from "./FilterRecipes";
import {
    useGetTopRatedRecipesByCategoryQuery,
    useGetTopRatedRecipesByCuisineQuery,
} from "../../generated/graphql";
import { Category } from "./categories.enum";
import { Cuisine } from "./cuisines.enum";
import { FilterWrapper, FilterOptions, Recipe, RecipesSection } from "../../components/types";
import { Difficulty } from "./difficulties.enum";
import { Diet } from "./diets.enum";
import AsyncDataLoaderWrapper from "../../components/ui/AsyncDataLoaderWrapper";
import { Rating } from "./ratings.enum";
import { CookingTime } from "./cooking-times.enum";

const _ = require("lodash");

export const HomePage: FC = () => {
    const [categoryFilter, setCategoryFilter] = useState("");
    const [cuisineFilter, setCuisineFilter] = useState("");
    const [dietFilter, setDietFilter] = useState("");
    const [difficultyFilter, setDifficultyFilter] = useState("");
    const [ratingFilter, setRatingFilter] = useState("");
    const [totalTimeFilter, setTotalTimeFilter] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentShownRecipes, setCurrentShownRecipes] = useState<RecipesSection[]>([]);
    const [allRecipes, setAllRecipes] = useState<RecipesSection[]>();

    const filters: FilterWrapper[] = [
        { field: "category", filter: categoryFilter, operator: assertEquals },
        { field: "cuisine", filter: cuisineFilter, operator: assertEquals },
        { field: "diet", filter: dietFilter, operator: assertEquals },
        { field: "difficulty", filter: difficultyFilter, operator: assertEquals },
        { field: "rating", filter: ratingFilter, operator: assertBigger },
        { field: "total_time", filter: totalTimeFilter, operator: assertSmaller },
    ];

    const {
        data: chicken,
        loading: chickenLoading,
        error: chickenErrors,
    } = useGetTopRatedRecipesByCategoryQuery({ variables: { category: Category.Chicken } });
    const {
        data: cakes,
        loading: cakesLoading,
        error: cakesErrors,
    } = useGetTopRatedRecipesByCategoryQuery({ variables: { category: Category.Cake } });
    const {
        data: japanese,
        loading: japaneseLoading,
        error: japaneseErrors,
    } = useGetTopRatedRecipesByCuisineQuery({ variables: { cuisine: Cuisine.Japanese } });
    const {
        data: greek,
        loading: greekLoading,
        error: greekErrors,
    } = useGetTopRatedRecipesByCuisineQuery({ variables: { cuisine: Cuisine.Greek } });

    function initRecipes() {
        const initialRecipes = [
            {
                name: Category.Chicken.toString(),
                items: chicken?.topRecipesByCategory?.length ? chicken?.topRecipesByCategory : [],
            },
            {
                name: Category.Cake.toString(),
                items: cakes?.topRecipesByCategory?.length ? cakes?.topRecipesByCategory : [],
            },
            {
                name: Cuisine.Japanese.toString(),
                items: japanese?.topRecipesByCuisine?.length ? japanese.topRecipesByCuisine : [],
            },
            {
                name: Cuisine.Greek.toString(),
                items: greek?.topRecipesByCuisine?.length ? greek.topRecipesByCuisine : [],
            },
        ];
        setCurrentShownRecipes(initialRecipes);
        setAllRecipes(initialRecipes);
    }

    useEffect(() => {
        // TODO: get the recommended recipes
        initRecipes();
    }, [
        chicken?.topRecipesByCategory,
        cakes?.topRecipesByCategory,
        japanese?.topRecipesByCuisine,
        greek?.topRecipesByCuisine,
    ]);

    useEffect(() => {
        const tempRecipes: RecipesSection[] = _.cloneDeep(allRecipes);
        tempRecipes?.forEach((section) => (section.items = filterRecipes(section.items)));
        setCurrentShownRecipes(tempRecipes);
    }, [
        categoryFilter,
        cuisineFilter,
        dietFilter,
        difficultyFilter,
        ratingFilter,
        totalTimeFilter,
    ]);

    function assertEquals(item: Recipe, field: string, filter: string) {
        return item[field as keyof Recipe] === filter;
    }

    function assertBigger(item: Recipe, field: string, filter: string) {
        return item[field as keyof Recipe] >= Number(filter.slice(0, 1));
    }

    function assertSmaller(item: Recipe, field: string, filter: string) {
        return item[field as keyof Recipe] <= Number(filter);
    }

    function filterRecipes(items: Recipe[]) {
        filters.forEach(
            (filterOption) =>
                (items = !!filterOption.filter
                    ? items.filter((item) =>
                          filterOption.operator(item, filterOption.field, filterOption.filter),
                      )
                    : items),
        );

        return items;
    }

    useEffect(() => {
        if (!chickenLoading && !cakesLoading && !japaneseLoading && !greekLoading)
            setLoading(false);
    }, [chickenLoading, cakesLoading, japaneseLoading, greekLoading]);

    const currentFilterOptions: // TODO: for now the options are hardcoded until we get all the recommended recipes and can have the filter accordingly

    FilterOptions[] = [
        {
            name: "Category",
            options: Object.values(Category),
            setState: setCategoryFilter,
        },
        {
            name: "Cuisine",
            options: Object.values(Cuisine),
            setState: setCuisineFilter,
        },
        {
            name: "Diet",
            options: Object.values(Diet),
            setState: setDietFilter,
        },
        {
            name: "Difficulty",
            options: Object.values(Difficulty),
            setState: setDifficultyFilter,
        },
        {
            name: "Rating",
            options: Object.values(Rating),
            setState: setRatingFilter,
        },
        {
            name: "Max Time",
            options: Object.values(CookingTime),
            setState: setTotalTimeFilter,
        },
    ];

    const updateSearchResult = () => {
        setSearchValue("");
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
                    <div className="d-flex flex-row">
                        <Button className="recipes-btn" onClick={showMyRecipes}>
                            My Recipes
                        </Button>
                        <Button className="recipes-btn" onClick={showSavedRecipes}>
                            Saved Recipes
                        </Button>
                    </div>
                </div>
                <RecommendedFeed currentRecipes={currentShownRecipes} />
            </AsyncDataLoaderWrapper>
        </div>
    );
};
