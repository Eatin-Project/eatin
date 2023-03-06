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
      {
        name: "Breakfast",
        items: BreakfastRecipes,
      },
      {
        name: "Pasta",
        items: PastaRecipes,
      },
    ];
    setCurrentShownRecipes(shownRecipes);
  }, [currentShownRecipes]);

  // todo: bring the recipes from outside not hardcoded
  const sweetRecipes: Item[] = [
    {
      id: 1,
      name: "Chocolate Cake",
      imageUrl:
        "https://www.mybakingaddiction.com/wp-content/uploads/2011/10/lr-0938-768x1152.jpg",
      rating: 5,
      viewed: 122,
    },
    {
      id: 2,
      name: "Cookies",
      imageUrl:
        "https://sallysbakingaddiction.com/wp-content/uploads/2013/05/classic-chocolate-chip-cookies.jpg",
      rating: 4.5,
      viewed: 150,
    },
    {
      id: 3,
      name: "Tiramisu",
      imageUrl:
        "https://i.shgcdn.com/269063bf-d72d-41dd-b848-9b30657696e6/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
      rating: 1,
      viewed: 10,
    },
    {
      id: 4,
      name: "Banana Split",
      imageUrl:
        "https://www.thespruceeats.com/thmb/UPNS4_EHmso1Khwg7-qMnaxwaSI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/perfect-banana-split-recipe-305712-hero-01-ef0482a539394da0b5ba64ade0c73b98.jpg",
      rating: 0.5,
      viewed: 2568,
    },
  ];
  const AsianRecipes: Item[] = [
    {
      id: 1,
      name: "Spring Rolls",
      imageUrl:
        "https://tastesbetterfromscratch.com/wp-content/uploads/2013/03/Fresh-Spring-Rolls-15.jpg",
      rating: 3,
      viewed: 12,
    },
    {
      id: 2,
      name: "Gyoza",
      imageUrl:
        "https://www.happyfoodstube.com/wp-content/uploads/2020/10/gyoza-picture.jpg",
      rating: 3.5,
      viewed: 14570,
    },
    {
      id: 3,
      name: "Mochi",
      imageUrl:
        "https://www.justonecookbook.com/wp-content/uploads/2020/08/Mochi-Ice-Cream-8674-II.jpg",
      rating: 4.5,
      viewed: 1000,
    },
    {
      id: 4,
      name: "Stir Fry Noodles",
      imageUrl:
        "https://elavegan.com/wp-content/uploads/2020/10/eating-vegetable-stir-fry-noodles-with-chopsticks.jpg",
      rating: 4,
      viewed: 1,
    },
  ];
  const BreakfastRecipes: Item[] = [
    {
      id: 1,
      name: "Pancakes",
      imageUrl:
        "https://www.wholesomeyum.com/wp-content/uploads/2018/04/wholesomeyum-Easy-Keto-Almond-Flour-Pancakes-Recipe-24.jpg",
      rating: 1,
      viewed: 25446,
    },
    {
      id: 2,
      name: "Cereal",
      imageUrl:
        "https://www.verywellhealth.com/thmb/mz1yXslWImJzSxx6cGqsLTzJrlk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/30D7A016-ABA5-48DD-BE39-3E7A223A03BF-96f2ba9e6c724dc9b2ba638b0c0f44a2.jpeg",
      rating: 2,
      viewed: 0,
    },
    {
      id: 3,
      name: "Omelette",
      imageUrl:
        "https://www.simplyrecipes.com/thmb/cLW3E3GjvlvMIIaIKOLEYkzifaM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2018__10__HT-Make-an-Omelet-LEAD-VERTICAL-812f32afcf76474681217c82b654b6e9.jpg",
      rating: 3,
      viewed: 7,
    },
    {
      id: 4,
      name: "French Toast",
      imageUrl:
        "https://hips.hearstapps.com/hmg-prod/images/how-to-make-french-toast-1589827448.jpg?crop=0.731xw:0.488xh;0.0901xw,0.323xh&resize=1200:*",
      rating: 4,
      viewed: 122,
    },
  ];

  const PastaRecipes: Item[] = [
    {
      id: 1,
      name: "Baked Peta",
      imageUrl:
        "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2021/02/05/Baked-Feta-Pasta-4_s4x3.jpg.rend.hgtvcom.1280.720.suffix/1615916524567.jpeg",
      rating: 1.5,
      viewed: 254863,
    },
    {
      id: 2,
      name: "Lasagna",
      imageUrl:
        "https://www.thewholesomedish.com/wp-content/uploads/2018/07/Best-Classic-Lasagna-600-x-900.jpg",
      rating: 4.5,
      viewed: 1458,
    },
    {
      id: 3,
      name: "Mac and Cheese",
      imageUrl:
        "https://www.culinaryhill.com/wp-content/uploads/2022/12/Baked-Mac-and-Cheese-Culinary-Hill-hero-warm.jpg",
      rating: 5,
      viewed: 18,
    },
    {
      id: 4,
      name: "Spafhetti and Meatballs",
      imageUrl:
        "https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21-600x900.jpg",
      rating: 2,
      viewed: 258746,
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
