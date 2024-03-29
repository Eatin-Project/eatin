import { useEffect, useState } from "react";
import { FilterOptions, FilterWrapper, RecipesSection } from "../types";
import { filterRecipes } from "./FilterUtils";
import { useSearch } from "../../context/search-context";

const _ = require("lodash");

export function useSectionsFilterRecipes(initialRecipes: RecipesSection[]) {
    const [filteredRecipes, setFilteredRecipes] = useState(initialRecipes);
    const [dietFilter, setDietFilter] = useState("");
    const [difficultyFilter, setDifficultyFilter] = useState("");
    const [ratingFilter, setRatingFilter] = useState("");
    const [totalTimeFilter, setTotalTimeFilter] = useState("");
    const { searchValue } = useSearch();

    const filters: FilterWrapper[] = [
        // { field: "diet", filter: dietFilter, operator: assertEquals },
        // { field: "difficulty", filter: difficultyFilter, operator: assertEquals },
        // { field: "rating", filter: ratingFilter, operator: assertBigger },
        // { field: "total_time", filter: totalTimeFilter, operator: assertSmaller },
    ];

    useEffect(() => {
        const tempRecipes: RecipesSection[] = _.cloneDeep(initialRecipes);
        tempRecipes?.forEach(
            (section: RecipesSection) =>
                (section.recipes = filterRecipes(section.recipes, filters)),
        );
        setFilteredRecipes(tempRecipes);
    }, [initialRecipes, dietFilter, difficultyFilter, ratingFilter, totalTimeFilter]);

    useEffect(() => {
        if (!!searchValue) {
            resetFilters();
        }
    }, [searchValue]);

    function resetFilters() {
        setDietFilter("");
        setDifficultyFilter("");
        setRatingFilter("");
        setTotalTimeFilter("");
    }

    // TODO: for now the options are hardcoded until we get all the recommended recipes and can have the filter accordingly
    const currentFilterOptions: FilterOptions[] = [
        // {
        //     name: "Diet",
        //     options: Object.values(Diet),
        //     setState: setDietFilter,
        // },
        // {
        //     name: "Difficulty",
        //     options: Object.values(Difficulty),
        //     setState: setDifficultyFilter,
        // },
        // {
        //     name: "Rating",
        //     options: Object.values(Rating),
        //     setState: setRatingFilter,
        // },
        // {
        //     name: "Max Time",
        //     options: Object.values(CookingTime),
        //     setState: setTotalTimeFilter,
        // },
    ];

    return { filteredRecipes, currentFilterOptions };
}
