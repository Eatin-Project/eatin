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
import PlaceIcon from "@mui/icons-material/Place";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CakeIcon from "@mui/icons-material/Cake";
import { Separator } from "../../pages/RecipePage/RecipePageRightSection";
import { getUserProfilePicture } from "../../pages/RecipePage/comments/CommentsSection";

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
                    <div className="user-profile-picture">
                        <Avatar
                            className="current-user-picture"
                            alt="Your picture"
                            src={getUserProfilePicture(data?.user.image, data?.user.id)}
                            sx={{ width: 150, height: 150 }}
                        />
                        <div className="gender-icon-wrapper">
                            {data?.user.gender === "Female" ? (
                                <FemaleIcon
                                    className="gender-icon female"
                                    fontSize="large"
                                    color="secondary"
                                />
                            ) : data?.user.gender === "Male" ? (
                                <MaleIcon
                                    className="gender-icon male"
                                    fontSize="large"
                                    color="primary"
                                />
                            ) : (
                                <TransgenderIcon
                                    className="gender-icon trans"
                                    fontSize="large"
                                    color="success"
                                />
                            )}
                        </div>
                    </div>
                    <div className="user-name-title">
                        {data?.user.firstname + " " + data?.user.lastname}
                    </div>
                    <Separator />
                    <div className="user-info">
                        <div className="fw-bolder">
                            <PlaceIcon className="user-info-icon" /> {data?.user.country}
                        </div>
                        <div className="fw-bolder">
                            <CakeIcon className="user-info-icon" />{" "}
                            {new Date(data?.user.birthdate).toDateString()}
                        </div>
                        <div className="fw-bolder">
                            <EmailIcon className="user-info-icon" /> {data?.user.email}
                        </div>
                        <div className="fw-bolder">
                            <LocalPhoneIcon className="user-info-icon" /> {data?.user.phone}
                        </div>
                    </div>
                </div>
            </div>
            <div className="recipe-section">
                <div className="center-row">
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
                <div className="center-row mt-4">
                    <Tabs value={tabValue} onChange={handleChange}>
                        <Tab label="Saved Recipes" icon={<BookmarkIcon fontSize="large" />} />
                        <Tab label="My Recipes" icon={<UploadIcon fontSize="large" />} />
                    </Tabs>
                </div>

                <div className="recipe-results">
                    {tabValue === 0 ? (
                        <AsyncDataLoaderWrapper
                            loading={searchResultSavedRecipesLoading}
                            text="Loading saved recipes..."
                        >
                            <RecipesCatalog recipes={catalogFilteredSavedRecipes} />
                        </AsyncDataLoaderWrapper>
                    ) : (
                        <AsyncDataLoaderWrapper
                            loading={searchResultUploadedRecipesLoading}
                            text="Loading my recipes..."
                        >
                            <RecipesCatalog recipes={catalogFilteredUploadedRecipes} />
                        </AsyncDataLoaderWrapper>
                    )}
                </div>
            </div>
        </div>
    );
};
