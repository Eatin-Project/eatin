import { FC, useState } from "react";
import "./profile.css";
import { useAuth } from "../../context/auth-context";
import { useGetTopRatedRecipesByCategoryQuery, useGetUserByIdQuery } from "../../generated/graphql";
import { Category } from "../../pages/homePage/entities/categories.enum";
import { Cuisine } from "../../pages/homePage/entities/cuisines.enum";
import { FilterRecipes } from "../../pages/homePage/FilterRecipes";
import { FilterOptions } from "../types";
import AsyncDataLoaderWrapper from "../ui/AsyncDataLoaderWrapper";
import { User } from "../ui/User";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import { RecipesCatalog } from "../ui/RecipesCatalog";
import { useGetSavedRecipes } from "../functions/useGetSavedRecipes";
import { useGetRecipesConnectionIsSaved } from "../../graphql/queries/recipes_connection_is_saved.query";

export const Profile: FC = () => {
    const [categoryFilter, setCategoryFilter] = useState("");
    const [cuisineFilter, setCuisineFilter] = useState("");
    const { currentUser } = useAuth();
    const { data, error, loading } = useGetUserByIdQuery({
        variables: { id: currentUser ? currentUser.uid : "" },
    });

    const {
        data: cakes,
        loading: cakesLoading,
        error: cakesErrors,
    } = useGetTopRatedRecipesByCategoryQuery({ variables: { category: Category.Cake } });

    const {
        data: savedRecipes,
        loading: savedRecipesLoading,
        updateIsSaved,
    } = useGetRecipesConnectionIsSaved(currentUser ? currentUser.uid : "", true);

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
    ];

    return (
        <AsyncDataLoaderWrapper loading={loading || savedRecipesLoading} text="loading user...">
            <div className="profile-container">
                <div className="profile-header">
                    <User size="large" name={data?.user.firstname + " " + data?.user.lastname} />
                    <div className="profile-filters">
                        {<FilterRecipes filterOptions={currentFilterOptions} />}
                    </div>
                </div>
                <div>
                    <Tabs aria-label="Basic tabs" defaultValue={0} sx={{ borderRadius: "lg" }}>
                        <TabList>
                            <Tab>My Recipes</Tab>
                            <Tab>Saved Recipes</Tab>
                        </TabList>
                        <TabPanel value={0} sx={{ p: 2 }}>
                            <AsyncDataLoaderWrapper
                                loading={cakesLoading}
                                text="loading my recipes..."
                            >
                                <RecipesCatalog
                                    recipes={
                                        cakes?.topRecipesByCategory
                                            ? cakes?.topRecipesByCategory
                                            : []
                                    }
                                    specificSavedUpdateFunc={updateIsSaved}
                                />
                            </AsyncDataLoaderWrapper>
                        </TabPanel>
                        <TabPanel value={1} sx={{ p: 2 }}>
                            <AsyncDataLoaderWrapper
                                loading={savedRecipesLoading}
                                text="loading saved recipes..."
                            >
                                <RecipesCatalog
                                    recipes={savedRecipes}
                                    specificSavedUpdateFunc={updateIsSaved}
                                />
                            </AsyncDataLoaderWrapper>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </AsyncDataLoaderWrapper>
    );
};
