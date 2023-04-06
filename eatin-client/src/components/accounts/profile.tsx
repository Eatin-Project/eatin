import { Button } from "@mui/material";
import { FC, useState } from "react";
import "./profile.css";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAuth } from "../../context/auth-context";
import { useGetTopRatedRecipesByCategoryQuery, useGetUserByIdQuery } from "../../generated/graphql";
import { Category } from "../../pages/homePage/entities/categories.enum";
import { Cuisine } from "../../pages/homePage/entities/cuisines.enum";
import { FilterRecipes } from "../../pages/homePage/FilterRecipes";
import { FilterOptions, Recipe } from "../types";
import AsyncDataLoaderWrapper from "../ui/AsyncDataLoaderWrapper";
import { RecipeItem } from "../ui/RecipeItem";
import { User } from "../ui/User";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import { useAddIsSavedToRecipesList } from "../functions/SavedStateInRecipes";

export const Profile: FC = () => {
    const [categoryFilter, setCategoryFilter] = useState("");
    const [cuisineFilter, setCuisineFilter] = useState("");
    const { currentUser } = useAuth();
    const { data, error, loading } = useGetUserByIdQuery({
        variables: { id: !!currentUser?.uid ? currentUser?.uid : "" },
    });

    const {
        data: cakes,
        loading: cakesLoading,
        error: cakesErrors,
    } = useGetTopRatedRecipesByCategoryQuery({ variables: { category: Category.Cake } });

    const {
        data: drinks,
        loading: drinksLoading,
        error: drinksErrors,
    } = useGetTopRatedRecipesByCategoryQuery({ variables: { category: Category.Drink } });

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
        <AsyncDataLoaderWrapper loading={loading} text="loading user...">
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
                                <Catalog recipes={cakes?.topRecipesByCategory}></Catalog>
                            </AsyncDataLoaderWrapper>
                        </TabPanel>
                        <TabPanel value={1} sx={{ p: 2 }}>
                            <AsyncDataLoaderWrapper
                                loading={drinksLoading}
                                text="loading saved recipes..."
                            >
                                <Catalog recipes={drinks?.topRecipesByCategory}></Catalog>
                            </AsyncDataLoaderWrapper>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </AsyncDataLoaderWrapper>
    );
};

type Props = {
    recipes?: Recipe[];
};

const Catalog: FC<Props> = ({ recipes }) => {
    const { updatedRecipes, updateSavedStateInRecipesList } = useAddIsSavedToRecipesList(
        recipes ? recipes : [],
    );

    return (
        <div className="recipes-catalog">
            {updatedRecipes?.map((recipe) => (
                <RecipeItem
                    recipe={recipe}
                    key={recipe.index}
                    updateSavedRecipes={updateSavedStateInRecipesList}
                ></RecipeItem>
            ))}
        </div>
    );
};
