import "./Carousel.css";

import {FC, useCallback, useEffect, useMemo, useRef, useState} from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {Button, Rating, Skeleton} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import classNames from "classnames";

export class Recipe {
  index: string;
  recipe_title: string;
  url?: string;
  record_health?: string;
  vote_count?: string;
  rating: string;
  description?: string;
  cuisine?: string;
  course?: string;
  diet?: string;
  prep_time?: string;
  cook_time?: string;
  ingredients?: string;
  instructions?: string;
  author?: string;
  tags?: string;
  category?: string;
  image: string;
  difficulty?: string;


  constructor(index: string, recipe_title: string, url: string, record_health: string, vote_count: string, rating: string, description: string, cuisine: string, course: string, diet: string, prep_time: string, cook_time: string, ingredients: string, instructions: string, author: string, tags: string, category: string, image: string, difficulty: string) {
    this.index = index;
    this.recipe_title = recipe_title;
    this.url = url;
    this.record_health = record_health;
    this.vote_count = vote_count;
    this.rating = rating;
    this.description = description;
    this.cuisine = cuisine;
    this.course = course;
    this.diet = diet;
    this.prep_time = prep_time;
    this.cook_time = cook_time;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.author = author;
    this.tags = tags;
    this.category = category;
    this.image = image;
    this.difficulty = difficulty;
  }
}

export class Item implements Recipe {
  index: string;
  recipe_title: string;
  url?: string;
  record_health?: string;
  vote_count?: string;
  rating: string;
  description?: string;
  cuisine?: string;
  course?: string;
  diet?: string;
  prep_time?: string;
  cook_time?: string;
  ingredients?: string;
  instructions?: string;
  author?: string;
  tags?: string;
  category?: string;
  image: string;
  difficulty?: string;
  onClick?: (id: string) => void;


  constructor(index: string, recipe_title: string, url: string, record_health: string, vote_count: string, rating: string, description: string, cuisine: string, course: string, diet: string, prep_time: string, cook_time: string, ingredients: string, instructions: string, author: string, tags: string, category: string, image: string, difficulty: string) {
    this.index = index;
    this.recipe_title = recipe_title;
    this.url = url;
    this.record_health = record_health;
    this.vote_count = vote_count;
    this.rating = rating;
    this.description = description;
    this.cuisine = cuisine;
    this.course = course;
    this.diet = diet;
    this.prep_time = prep_time;
    this.cook_time = cook_time;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.author = author;
    this.tags = tags;
    this.category = category;
    this.image = image;
    this.difficulty = difficulty;
  }
}

interface Props {
  items: Item[];
  title: React.ReactNode;
  className?: string;
  itemsInOneSlider?: number;
  autoSlide?: boolean;
  isLoading?: boolean;
  randomColors?: boolean;
  onClickItem?: (id: string) => void;
}

type SlideDirection = "prev" | "next";

export const Carousel: FC<Props> = ({
  items,
  itemsInOneSlider = 1,
  autoSlide,
  title,
  isLoading,
  className,
  randomColors,
  onClickItem,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [nextSlide, setNextSlide] = useState(-1);
  const [slideTo, setSlideTo] = useState<SlideDirection | null>(null);

  const interval = useRef<NodeJS.Timer>();

  const maxSlides = useMemo(
    () => Math.ceil(items.length / itemsInOneSlider),
    [items, itemsInOneSlider]
  );

  const itemsMatrix = useMemo(
    () => arrayToMatrix(items, itemsInOneSlider),
    [items, itemsInOneSlider]
  );

  const getSlideClassNames = useCallback(
    (itemIndex: number) => {
      const isActive = currentSlide === itemIndex;
      const isNextSlide = nextSlide === itemIndex;

      const animationClassnames = {
        ["carousel-slide-" + slideTo]: isNextSlide,
        ["carousel-slide-" + (slideTo === "next" ? "start" : "end")]: isActive,
      };

      return classNames("carousel-slide", {
        active: isActive,
        ...(slideTo ? animationClassnames : {}),
      });
    },
    [currentSlide, nextSlide]
  );

  const getNextSlide = useCallback(
    (slideTo: SlideDirection) => {
      if (slideTo === "next")
        return currentSlide < maxSlides - 1 ? currentSlide + 1 : 0;
      return currentSlide > 0 ? currentSlide - 1 : maxSlides - 1;
    },
    [maxSlides, currentSlide]
  );

  const slideWithAnimation = useCallback(
    (slideDirection: SlideDirection, nextSlide?: number) => {
      if (slideTo) return;

      const next = nextSlide ?? getNextSlide(slideDirection);
      setNextSlide(next);
      setSlideTo(slideDirection);

      setTimeout(() => {
        setNextSlide(-1);
        setCurrentSlide(next);
        setSlideTo(null);
      }, 1000);
    },
    [getNextSlide]
  );

  useEffect(() => {
    if (autoSlide)
      interval.current = setInterval(() => slideWithAnimation("next"), 5000);

    return () => clearInterval(interval.current);
  }, [autoSlide, slideWithAnimation]);

  return (
    <div className={classNames("carousel-wrapper", className)}>
      <h1 className="carousel-title">{title}</h1>
      <div className="carousel">
        {isLoading ? (
          <div className="carousel-slide active">
            {Array.from({ length: itemsInOneSlider }).map((_, itemIndex) => (
              <Skeleton
                key={`skeleton|${itemIndex}`}
                className="carousel-item"
                width={`${100 / itemsInOneSlider}%`}
              />
            ))}
          </div>
        ) : (
          itemsMatrix.map((items, itemIndex) => (
            <div className={getSlideClassNames(itemIndex)} key={itemIndex}>
              {items.map((item, itemIndex) => (
                <CarouselItem
                  key={item.index}
                  itemIndex={itemIndex}
                  {...item}
                  width={100 / itemsInOneSlider}
                  onClick={onClickItem}
                  randomColors={randomColors}
                />
              ))}
            </div>
          ))
        )}
        {maxSlides > 1 && (
          <>
            <CarouselArrowIcon type="prev" onClick={slideWithAnimation} />
            <CarouselArrowIcon type="next" onClick={slideWithAnimation} />
            <div className="carousel-bread-crumbs">
              {Array.from({ length: maxSlides }).map((_, itemIndex) => (
                <CarouselBreadCrumb
                  key={itemIndex}
                  slide={itemIndex}
                  onClick={slideWithAnimation}
                  isInAnimation={!!slideTo}
                  currentSlide={currentSlide}
                  nextSlide={nextSlide}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

interface ArrowIconProps {
  type: SlideDirection;
  onClick: (slideTo: SlideDirection) => void;
}

const CarouselArrowIcon: FC<ArrowIconProps> = ({ type, onClick }) => {
  const handleClick = useCallback(() => onClick(type), [onClick, type]);

  return (
    <div className={classNames("carousel-arrow", type)} onClick={handleClick}>
      {type === "next" ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />}
    </div>
  );
};

const COLORS = [
  "rgba(0, 145, 110, 0.4)",
  "rgba(255, 207, 0, 0.4)",
  "rgba(238, 97, 35, 0.4)",
  "rgba(250, 0, 63, 0.4)",
];

type CarouselItemProps = Item & {
  width: number;
  itemIndex: number;
  randomColors?: boolean;
};

const CarouselItem: FC<CarouselItemProps> = ({
  width,
  index,
  recipe_title,
  itemIndex,
  image,
  rating,
  vote_count,
  randomColors,
  onClick,
}) => {
  const handleClick = useCallback(() => onClick?.(index), [index, onClick]);
  const [savedValue, setSavedValue] = useState<number>(0);

  const savedStateChanged = () => {
    //ToDo - update the backend the the user saved a recipe
    const newVal = savedValue === 0 ? 1 : 0;
    setSavedValue(newVal);
  };

  return (
    <div
      className={classNames("carousel-item", { click: !!onClick })}
      onClick={handleClick}
      style={{ width: `${width}%` }}
      key={index}
    >
      <h2
        className="item-name"
        style={
          randomColors ? { backgroundColor: COLORS[itemIndex % 4] } : undefined
        }
      >
        {recipe_title}
      </h2>
      <div className="buttons-spread">
        <Rating
          className="is-saved"
          value={savedValue}
          onChange={savedStateChanged}
          max={1}
        />
        <Button className="delete-from-list" size="large">
          <CancelIcon className="delete-from-list-icon" />
        </Button>
      </div>
      <div className="item-info">
        <Rating
          className="rating-item"
          precision={0.5}
          value={parseFloat(rating)}
          readOnly
          max={5}
        />
        <span className="viewed-number">{vote_count}</span>
      </div>
      <img className="item-img" src={image} />
    </div>
  );
};

interface CarouselBreadCrumbProps {
  slide: number;
  isInAnimation: boolean;
  currentSlide: number;
  nextSlide: number;
  onClick: (slideDirection: SlideDirection, nextSlide: number) => void;
}

const CarouselBreadCrumb: FC<CarouselBreadCrumbProps> = ({
  currentSlide,
  isInAnimation,
  nextSlide,
  onClick,
  slide,
}) => {
  const handleClick = useCallback(
    () => onClick(slide < currentSlide ? "prev" : "next", slide),
    [slide, currentSlide]
  );

  const breadCrumbsClassnames = useMemo(
    () =>
      classNames("bread-crumb", {
        active: currentSlide === slide,
        next: nextSlide === slide,
        prev: currentSlide === slide && isInAnimation,
      }),
    [currentSlide, slide, nextSlide, isInAnimation]
  );

  return <div onClick={handleClick} className={breadCrumbsClassnames} />;
};

const arrayToMatrix = (array: Item[], columns: number): Item[][] =>
  Array(Math.ceil(array.length / columns))
    .fill(null)
    .reduce((prev, _, itemIndex) => {
      return [...prev, [...array].splice(itemIndex * columns, columns)];
    }, []);
