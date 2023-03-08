import "./HomePage.css";

import { FC, useEffect, useState } from "react";
import { RecommentedFeed } from "./RecommentedFeed";
import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Item } from "./Carousel";
import { SearchRecipes } from "./SearchRecipes";

export const HomePage: FC = () => {
  const [searchFilter, setSearchFilter] = useState(false);
  const [genreFilterVal, setGenreFilterVal] = useState("1");
  const [difficultyFilterVal, setDifficultyFilterVal] = useState("1");
  const [ratingFilterVal, setRatingFilterVal] = useState("1");
  const [filterSearchVal, setfilterSearchVal] = useState("");
  const [SearchResult, setSearchResult] = useState("");
  const [currentShownRecipes, setCurrentShownRecipes] = useState<
    {
      name: string;
      items: Item[];
    }[]
  >([]);

  useEffect(() => {
    // here will we get the current recipes to show...
    const shownRecipes = [
      {
        name: "Sweets",
        items: sweetRecipes,
      },
      {
        name: "Asian",
        items: AsianRecipes,
      },
    ];
    setCurrentShownRecipes(shownRecipes);
  }, [currentShownRecipes]);

  // todo: bring the recipes from outside not hardcoded
  const sweetRecipes: Item[] = [
    {
      index: '1',
      recipe_title: "Chocolate Cake",
      image:
        "https://www.mybakingaddiction.com/wp-content/uploads/2011/10/lr-0938-768x1152.jpg",
      rating: '5',
      vote_count: '122',
    },
    {
      index: '2',
      recipe_title: "Cookies",
      image:
        "https://sallysbakingaddiction.com/wp-content/uploads/2013/05/classic-chocolate-chip-cookies.jpg",
      rating: '4.5',
      vote_count: '150',
    },
    {
      index: '3',
      recipe_title: "Tiramisu",
      image:
        "https://i.shgcdn.com/269063bf-d72d-41dd-b848-9b30657696e6/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
      rating: '1',
      vote_count: '10',
    },
    {
      index: '4',
      recipe_title: "Banana Split",
      image:
        "https://www.thespruceeats.com/thmb/UPNS4_EHmso1Khwg7-qMnaxwaSI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/perfect-banana-split-recipe-305712-hero-01-ef0482a539394da0b5ba64ade0c73b98.jpg",
      rating: '0.5',
      vote_count: '2568',
    },
  ];
  const AsianRecipes: Item[] = [
    {
      index: '1',
      recipe_title: "Spring Rolls",
      image:
        "https://tastesbetterfromscratch.com/wp-content/uploads/2013/03/Fresh-Spring-Rolls-15.jpg",
      rating: '3',
      vote_count: '12',
    },
    {
      index: '2',
      recipe_title: "Gyoza",
      image:
        "https://www.happyfoodstube.com/wp-content/uploads/2020/10/gyoza-picture.jpg",
      rating: '3.5',
      vote_count: '14570',
    },
    {
      index: '3',
      recipe_title: "Mochi",
      image:
        "https://www.justonecookbook.com/wp-content/uploads/2020/08/Mochi-Ice-Cream-8674-II.jpg",
      rating: '4.5',
      vote_count: '1000',
    },
    {
      index: '4',
      recipe_title: "Stir Fry Noodles",
      image:
        "https://elavegan.com/wp-content/uploads/2020/10/eating-vegetable-stir-fry-noodles-with-chopsticks.jpg",
      rating: '4',
      vote_count: '1',
    },
  ];

  const currentFilterOptions: {
    name: string;
    options: string[];
    funcToUpdate: (arg0: string) => void;
  }[] = [
    {
      name: "Genre",
      options: [
        "None",
        "Asian",
        "Italian",
        "Indian",
        "French",
        "Mediterranean",
      ],
      funcToUpdate: setGenreFilterVal,
    },
    {
      name: "Difficulty",
      options: ["None", "Easy", "Medium", "Hard", "Chef"],
      funcToUpdate: setDifficultyFilterVal,
    },
    {
      name: "Rating",
      options: ["None", "Under 1", "2+", "3+", "4+", "5"],
      funcToUpdate: setRatingFilterVal,
    },
  ];

  const updateSearchResult = () => {
    setSearchResult(filterSearchVal);
    setfilterSearchVal("");
  };

  const showMyRecipes = () => {
    // here we will update the shown recipes....
  };

  const showSavedRecipes = () => {
    // here we will update the shown recipes....
  };

  return (
    <div>
      <div className="header">
        {<SearchRecipes searchOptions={currentFilterOptions} />}
        <div className="searchManually">
          <span className="searchResult">{SearchResult}</span>
          <div className="completeSearchBar">
            <TextField
              onChange={(event) => {
                setfilterSearchVal(event.target.value);
              }}
              className="searchbar"
              variant={undefined}
              type="text"
            />
            <Button onClick={updateSearchResult} className="searchButton">
              <SearchIcon />
            </Button>
          </div>
        </div>
      </div>
      <div>
        <Button className="recipesBtn" onClick={showMyRecipes}>
          My Recipes
        </Button>
        <Button className="recipesBtn" onClick={showSavedRecipes}>
          Saved Recipes
        </Button>
      </div>

      {!searchFilter ? (
        <RecommentedFeed currentRecipes={currentShownRecipes} />
      ) : (
        <div></div>
      )}

      <div></div>
    </div>
  );
};
