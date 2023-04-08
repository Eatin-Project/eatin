import {FC, PropsWithChildren} from "react";
import AsyncDataLoaderWrapper from "./AsyncDataLoaderWrapper";
import {FilterRecipes} from "../../pages/homePage/FilterRecipes";
import {FilterOptions} from "../types";

interface Props {
    filterOptions: FilterOptions[];
    loading: boolean;
}


const RecipesWithFiltersWrapper: FC<PropsWithChildren<Props>> = ({filterOptions, loading, children}) => {

    return (
        <div>
            <AsyncDataLoaderWrapper loading={loading}
                                    text="Finding the perfect recipes for you...">
                <div className="header">
                    <FilterRecipes filterOptions={filterOptions}/>
                </div>
                {children}
            </AsyncDataLoaderWrapper>
        </div>
    );
};

export default RecipesWithFiltersWrapper;
