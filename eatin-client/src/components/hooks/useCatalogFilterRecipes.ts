import { useState, useEffect } from "react";
import { CookingTime } from "../../pages/homePage/entities/cooking-times.enum";
import { Cuisine } from "../../pages/homePage/entities/cuisines.enum";
import { Diet } from "../../pages/homePage/entities/diets.enum";
import { Difficulty } from "../../pages/homePage/entities/difficulties.enum";
import { FilterWrapper, Recipe, FilterOptions } from "../types";
import { Category } from "../../pages/homePage/entities/categories.enum";
import { Rating } from "../../pages/homePage/entities/ratings.enum";
import { assertBigger, assertEquals, assertSmaller, filterRecipes } from "./FilterUtils";

const _ = require("lodash");

export function useCatalogFilterRecipes(initialRecipes: Recipe[]) {
    const [catalogFilteredRecipes, setCatalogFilteredRecipes] = useState(initialRecipes);
    const [categoryFilter, setCategoryFilter] = useState([""]);
    const [cuisineFilter, setCuisineFilter] = useState([""]);
    const [dietFilter, setDietFilter] = useState([""]);
    const [difficultyFilter, setDifficultyFilter] = useState([""]);
    const [ratingFilter, setRatingFilter] = useState([""]);
    const [totalTimeFilter, setTotalTimeFilter] = useState([""]);

    const filters: FilterWrapper[] = [
        { field: "category", filter: categoryFilter, operator: assertEquals },
        { field: "cuisine", filter: cuisineFilter, operator: assertEquals },
        { field: "diet", filter: dietFilter, operator: assertEquals },
        { field: "difficulty", filter: difficultyFilter, operator: assertEquals },
        { field: "rating", filter: ratingFilter, operator: assertBigger },
        { field: "total_time", filter: totalTimeFilter, operator: assertSmaller },
    ];

    useEffect(() => {
        const tempRecipes: Recipe[] = _.cloneDeep(initialRecipes);
        setCatalogFilteredRecipes(filterRecipes(tempRecipes, filters));
    }, [
        initialRecipes,
        categoryFilter,
        cuisineFilter,
        dietFilter,
        difficultyFilter,
        ratingFilter,
        totalTimeFilter,
    ]);

    useEffect(() => {
        resetFilters();
    }, [initialRecipes]);

    function resetFilters() {
        setCategoryFilter([]);
        setCuisineFilter([]);
        setDietFilter([]);
        setDifficultyFilter([]);
        setRatingFilter([]);
        setTotalTimeFilter([]);
    }

    // TODO: for now the options are hardcoded until we get all the recommended recipes and can have the filter accordingly
    const currentCatalogFilterOptions: FilterOptions[] = [
        {
            name: "Diet",
            options: Object.values(Diet),
            isMulti: true,
            setState: setDietFilter,
        },
        {
            name: "Difficulty",
            options: Object.values(Difficulty),
            isMulti: true,
            setState: setDifficultyFilter,
        },
        {
            name: "Rating",
            options: Object.values(Rating),
            isMulti: false,
            setState: setRatingFilter,
        },
        {
            name: "Max Time",
            options: Object.values(CookingTime),
            isMulti: false,
            setState: setTotalTimeFilter,
        },
        {
            name: "Category",
            options: Object.values(Category),
            isMulti: true,
            setState: setCategoryFilter,
        },
        {
            name: "Cuisine",
            options: Object.values(Cuisine),
            isMulti: true,
            setState: setCuisineFilter,
        },
    ];

    return { catalogFilteredRecipes, currentCatalogFilterOptions };
}
