import "./profile.css";
import { FC, useState } from "react";
import { useGetUserByIdQuery } from "../../generated/graphql";
import { FilterRecipes } from "../../pages/homePage/FilterRecipes";
import AsyncDataLoaderWrapper from "../ui/AsyncDataLoaderWrapper";
import { RecipesCatalog } from "../ui/RecipesCatalog";
import { useGetUsersName } from "../hooks/useGetUsersName";
import { Avatar, Tab, Tabs } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import UploadIcon from "@mui/icons-material/Upload";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import MaleIcon from "@mui/icons-material/Male";
import { useGetSavedRecipesBySearch } from "../functions/useGetSavedRecipesBySearch";
import { useGetUploadedRecipesBySearch } from "../functions/useGetUploadedRecipesBySearch";
import { useCatalogFilterRecipes } from "../hooks/useCatalogFilterRecipes";

export const Profile: FC = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [tabValue, setTabValue] = useState(0);

    const userID = useGetUsersName();
    const { data } = useGetUserByIdQuery({
        variables: { id: userID },
    });

    const { recipes: searchResultSavedRecipes, loading: searchResultSavedRecipesLoading } =
        useGetSavedRecipesBySearch(searchValue);
    const { recipes: searchResultUploadedRecipes, loading: searchResultUploadedRecipesLoading } =
        useGetUploadedRecipesBySearch(searchValue);

    const {
        catalogFilteredRecipes: catalogFilteredSavedRecipes,
        currentCatalogFilterOptions: currentSavedCatalogFilterOptions,
    } = useCatalogFilterRecipes(searchResultSavedRecipes);
    const {
        catalogFilteredRecipes: catalogFilteredUploadedRecipes,
        currentCatalogFilterOptions: currentUploadedCatalogFilterOptions,
    } = useCatalogFilterRecipes(searchResultUploadedRecipes);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const getFilterSearchValue = (searchValue: string) => {
        setSearchValue(searchValue);
    };

    return (
        <div className="profile-section">
            <div className="user-section">
                <div className="user-section-info">
                    <Avatar
                        className="current-user-picture"
                        alt="Your picture"
                        src="https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-08/220805-domestic-cat-mjf-1540-382ba2.jpg"
                        sx={{ width: 90, height: 90 }}
                    />
                    <h2>
                        {data?.user.firstname + " " + data?.user.lastname}
                        {data?.user.gender === "Female" ? (
                            <FemaleIcon fontSize="large" color="secondary" />
                        ) : data?.user.gender === "Male" ? (
                            <MaleIcon fontSize="large" color="primary" />
                        ) : (
                            <TransgenderIcon fontSize="large" color="success" />
                        )}
                    </h2>

                    <h6>{data?.user.email}</h6>
                    <div className="user-info">
                        <span>From {data?.user.country}</span>
                        <span>Birthday is on {new Date(data?.user.birthdate).toDateString()}</span>
                    </div>
                </div>
            </div>
            <div className="recipe-section">
                <div className="profile-filters">
                    {tabValue === 0 ? (
                        <FilterRecipes
                            filterOptions={currentUploadedCatalogFilterOptions}
                            isSearch={!!searchValue && !!catalogFilteredUploadedRecipes}
                            isHidden={searchResultUploadedRecipesLoading}
                            getFilterSearchValue={getFilterSearchValue}
                        />
                    ) : (
                        <FilterRecipes
                            filterOptions={currentSavedCatalogFilterOptions}
                            isSearch={!!searchValue && !!catalogFilteredSavedRecipes}
                            isHidden={searchResultSavedRecipesLoading}
                            getFilterSearchValue={getFilterSearchValue}
                        />
                    )}
                </div>
                <div className="recipe-tabs">
                    <Tabs
                        value={tabValue}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                    >
                        <Tab label="My Recipes" icon={<UploadIcon fontSize="large" />} />
                        <Tab label="Saved Recipes" icon={<BookmarkIcon fontSize="large" />} />
                    </Tabs>
                </div>
                <div className="recipe-results">
                    {tabValue === 0 ? (
                        <AsyncDataLoaderWrapper
                            loading={searchResultUploadedRecipesLoading}
                            text="Loading my recipes..."
                        >
                            <RecipesCatalog recipes={catalogFilteredUploadedRecipes} />
                        </AsyncDataLoaderWrapper>
                    ) : (
                        <AsyncDataLoaderWrapper
                            loading={searchResultSavedRecipesLoading}
                            text="Loading saved recipes..."
                        >
                            <RecipesCatalog recipes={catalogFilteredSavedRecipes} />
                        </AsyncDataLoaderWrapper>
                    )}
                </div>
            </div>
        </div>
    );
};
