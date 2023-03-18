import "./HomePage.css";

import { FC, useCallback, useEffect, useState } from "react";
import { RecommendedFeed } from "./RecommendedFeed";
import { Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FilterRecipes } from "./FilterRecipes";

import {
    useGetTopRatedRecipesByCategoryQuery,
    useGetTopRatedRecipesByCuisineQuery,
} from "../../generated/graphql";
import { Category } from "./entities/categories.enum";
import { Cuisine } from "./entities/cuisines.enum";
import { FilterOptions, FilterWrapper, Recipe, RecipesSection } from "../../components/types";
import { Difficulty } from "./entities/difficulties.enum";
import { Diet } from "./entities/diets.enum";
import AsyncDataLoaderWrapper from "../../components/ui/AsyncDataLoaderWrapper";
import { Rating } from "./entities/ratings.enum";
import { CookingTime } from "./entities/cooking-times.enum";
import { useGetSections } from "../../graphql/queries/sections.query";
import { useAuth } from "../../context/auth-context";

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
    const [allRecipes, setAllRecipes] = useState<RecipesSection[]>([]);
    const { currentUser } = useAuth();
    const { data: recommendedRecipes, loading: recommendedRecipesLoading } = useGetSections(
        currentUser ? currentUser.uid : "",
    );

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

    const initRecipes = useCallback(() => {
        const initialRecipes = [
            {
                name: Category.Chicken.toString(),
                recipes: chicken?.topRecipesByCategory?.length ? chicken?.topRecipesByCategory : [],
            },
            {
                name: Category.Cake.toString(),
                recipes: cakes?.topRecipesByCategory?.length ? cakes?.topRecipesByCategory : [],
            },
            {
                name: Cuisine.Japanese.toString(),
                recipes: japanese?.topRecipesByCuisine?.length ? japanese.topRecipesByCuisine : [],
            },
            {
                name: Cuisine.Greek.toString(),
                recipes: greek?.topRecipesByCuisine?.length ? greek.topRecipesByCuisine : [],
            },
        ];
        recommendedRecipes?.forEach((section) =>
            initialRecipes.push({ name: section.name, recipes: section.recipes }),
        );
        setCurrentShownRecipes(initialRecipes);
        setAllRecipes(initialRecipes);
    }, [
        cakes?.topRecipesByCategory,
        chicken?.topRecipesByCategory,
        currentUser,
        greek?.topRecipesByCuisine,
        japanese?.topRecipesByCuisine,
        recommendedRecipes,
    ]);

    useEffect(() => {
        const tempRecipes: RecipesSection[] = _.cloneDeep(allRecipes);
        tempRecipes?.forEach((section) => (section.recipes = filterRecipes(section.recipes)));
        setCurrentShownRecipes(tempRecipes);
    }, [
        allRecipes,
        categoryFilter,
        cuisineFilter,
        dietFilter,
        difficultyFilter,
        ratingFilter,
        totalTimeFilter,
    ]);

    useEffect(() => {
        if (
            !chickenLoading &&
            !cakesLoading &&
            !japaneseLoading &&
            !greekLoading &&
            !recommendedRecipesLoading
        ) {
            setLoading(false);
            initRecipes();
        }
    }, [
        chickenLoading,
        cakesLoading,
        japaneseLoading,
        greekLoading,
        initRecipes,
        recommendedRecipesLoading,
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
