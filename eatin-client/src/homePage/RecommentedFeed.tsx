import "./RecommentedFeed.css";

import { FC, useState } from "react";

import { Carousel, Item } from "./Carousel";

interface Props {
  currentRecipes: { name: string; items: Item[] }[];
}

export const RecommentedFeed: FC<Props> = ({ currentRecipes }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="genres-page">
      {currentRecipes.map((recipe, index) => (
        <Carousel
          key={`${recipe.name}-${index}`}
          title={recipe.name}
          items={recipe.items}
          itemsInOneSlider={3}
          isLoading={isLoading}
          className="recommented-recipes-carousel"
        />
      ))}
    </div>
  );
};
