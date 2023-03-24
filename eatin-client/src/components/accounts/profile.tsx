import { Category } from "../../pages/homePage/categories.enum";
import { Button } from "@mui/material";
import { FC, useState } from "react";
import { useAuth } from "../../context/auth-context";
import { useGetTopRatedRecipesByCategoryQuery, useGetUserByIdQuery } from "../../generated/graphql";
import { Cuisine } from "../../pages/homePage/cuisines.enum";
import { FilterRecipes } from "../../pages/homePage/FilterRecipes";
import { FilterOptions, Recipe } from "../types";
import AsyncDataLoaderWrapper from "../ui/AsyncDataLoaderWrapper";
import { RecipeItem } from "../ui/RecipeItem";

export const Profile: FC = () => {
    const [categoryFilter, setCategoryFilter] = useState("");
    const [cuisineFilter, setCuisineFilter] = useState("");
    const { currentUser, signOutUser } = useAuth();
    const { data, error, loading } = useGetUserByIdQuery({
        variables: { id: !!currentUser?.uid ? currentUser?.uid : "" },
    });

    const {
        data: cakes,
        loading: cakesLoading,
        error: cakesErrors,
    } = useGetTopRatedRecipesByCategoryQuery({ variables: { category: Category.Cake } });

    const showMyRecipes = () => {
        // TODO: here we will update the shown recipes....
    };

    const showSavedRecipes = () => {
        // TODO: here we will update the shown recipes....
    };

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
            <h3>
                {data?.user.firstname} {data?.user.lastname}
            </h3>
            <button>edit</button>
            <div className="header">
                {<FilterRecipes filterOptions={currentFilterOptions} />}
                <div className="d-flex flex-row">
                    <Button className="recipes-btn" onClick={showMyRecipes}>
                        My Recipes
                    </Button>
                    <Button className="recipes-btn" onClick={showSavedRecipes}>
                        Saved Recipes
                    </Button>
                </div>
            </div>
            <AsyncDataLoaderWrapper loading={cakesLoading} text="loading recipes...">
                <Catalog recipes={cakes?.topRecipesByCategory}></Catalog>
            </AsyncDataLoaderWrapper>
            <button onClick={signOutUser}>Sign Out</button>
        </AsyncDataLoaderWrapper>
    );
};

type Props = {
    recipes?: Recipe[];
};

const Catalog: FC<Props> = ({ recipes }) => {
    return (
        <div className="recipes-catalog">
            {recipes?.map((recipe) => (
                <RecipeItem recipe={recipe} key={recipe.index}></RecipeItem>
            ))}
        </div>
    );
};

const Filter: FC = () => {
    return <div></div>;
};
