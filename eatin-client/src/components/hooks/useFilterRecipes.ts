import { Category } from "@mui/icons-material";
import { Rating } from "@mui/material";
import { useState, useEffect } from "react";
import { CookingTime } from "../../pages/homePage/entities/cooking-times.enum";
import { Cuisine } from "../../pages/homePage/entities/cuisines.enum";
import { Diet } from "../../pages/homePage/entities/diets.enum";
import { Difficulty } from "../../pages/homePage/entities/difficulties.enum";
import { RecipesSection, FilterWrapper, Recipe, FilterOptions } from "../types";

const _ = require("lodash");

export function useFilterRecipes(initialRecipes: RecipesSection[]) {
    const [filteredRecipes, setFilteredRecipes] = useState(initialRecipes);
    const [categoryFilter, setCategoryFilter] = useState("");
    const [cuisineFilter, setCuisineFilter] = useState("");
    const [dietFilter, setDietFilter] = useState("");
    const [difficultyFilter, setDifficultyFilter] = useState("");
    const [ratingFilter, setRatingFilter] = useState("");
    const [totalTimeFilter, setTotalTimeFilter] = useState("");

    const filters: FilterWrapper[] = [
        { field: "category", filter: categoryFilter, operator: assertEquals },
        { field: "cuisine", filter: cuisineFilter, operator: assertEquals },
        { field: "diet", filter: dietFilter, operator: assertEquals },
        { field: "difficulty", filter: difficultyFilter, operator: assertEquals },
        { field: "rating", filter: ratingFilter, operator: assertBigger },
        { field: "total_time", filter: totalTimeFilter, operator: assertSmaller },
    ];

    useEffect(() => {
        const tempRecipes: RecipesSection[] = _.cloneDeep(initialRecipes);
        tempRecipes?.forEach((section) => (section.recipes = filterRecipes(section.recipes)));
        setFilteredRecipes(tempRecipes);
    }, [
        initialRecipes,
        categoryFilter,
        cuisineFilter,
        dietFilter,
        difficultyFilter,
        ratingFilter,
        totalTimeFilter,
    ]);

    function assertEquals(item: Recipe, field: keyof Recipe, filter: string) {
        return item[field] === filter;
    }

    function assertBigger(item: Recipe, field: keyof Recipe, filter: string) {
        return item[field] >= Number(filter.slice(0, 1));
    }

    function assertSmaller(item: Recipe, field: keyof Recipe, filter: string) {
        return item[field] <= Number(filter);
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

    // TODO: for now the options are hardcoded until we get all the recommended recipes and can have the filter accordingly
    const currentFilterOptions: FilterOptions[] = [
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

    return { filteredRecipes, currentFilterOptions };
}
