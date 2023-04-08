import { useState, useEffect } from "react";
import { CookingTime } from "../../pages/homePage/entities/cooking-times.enum";
import { Diet } from "../../pages/homePage/entities/diets.enum";
import { Difficulty } from "../../pages/homePage/entities/difficulties.enum";
import { RecipesSection, FilterWrapper, FilterOptions } from "../types";
import {Rating} from "../../pages/homePage/entities/ratings.enum";
import {assertBigger, assertEquals, assertSmaller, filterRecipes} from "./FilterUtils";

const _ = require("lodash");

export function useSectionsFilterRecipes(initialRecipes: RecipesSection[]) {
    const [filteredRecipes, setFilteredRecipes] = useState(initialRecipes);
    const [dietFilter, setDietFilter] = useState("");
    const [difficultyFilter, setDifficultyFilter] = useState("");
    const [ratingFilter, setRatingFilter] = useState("");
    const [totalTimeFilter, setTotalTimeFilter] = useState("");

    const filters: FilterWrapper[] = [
        { field: "diet", filter: dietFilter, operator: assertEquals },
        { field: "difficulty", filter: difficultyFilter, operator: assertEquals },
        { field: "rating", filter: ratingFilter, operator: assertBigger },
        { field: "total_time", filter: totalTimeFilter, operator: assertSmaller },
    ];

    useEffect(() => {
        const tempRecipes: RecipesSection[] = _.cloneDeep(initialRecipes);
        tempRecipes?.forEach((section) => (section.recipes = filterRecipes(section.recipes, filters)));
        setFilteredRecipes(tempRecipes);
    }, [
        initialRecipes,
        dietFilter,
        difficultyFilter,
        ratingFilter,
        totalTimeFilter,
    ]);

    // TODO: for now the options are hardcoded until we get all the recommended recipes and can have the filter accordingly
    const currentFilterOptions: FilterOptions[] = [
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
