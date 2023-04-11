import "./Carousel.css";

import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Skeleton } from "@mui/material";
import classNames from "classnames";

export interface CarouselItem<T = unknown> {
    id: number;
    image: string;
    itemValue?: T;
    title?: string;
    renderItem?: (item: T) => React.ReactNode;
}

export interface CarouselProps<T = unknown> {
    items: CarouselItem<T>[];
    title?: React.ReactNode;
    className?: string;
    itemsInOneSlider?: number;
    autoSlide?: boolean;
    isLoading?: boolean;
    randomColors?: boolean;
    hideArrows?: boolean;
    onClickItem?: (id: number) => void;
}

type SlideDirection = "prev" | "next";

export function Carousel<T = unknown>({
    items,
    itemsInOneSlider = 1,
    autoSlide,
    title,
    isLoading,
    className,
    randomColors,
    hideArrows,
    onClickItem,
}: CarouselProps<T>) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [nextSlide, setNextSlide] = useState(-1);
    const [slideTo, setSlideTo] = useState<SlideDirection | null>(null);

    const interval = useRef<NodeJS.Timer>();

    const maxSlides = useMemo(
        () => Math.ceil(items.length / itemsInOneSlider),
        [items, itemsInOneSlider],
    );

    const itemsMatrix = useMemo(
        () => arrayToMatrix(items, itemsInOneSlider),
        [items, itemsInOneSlider],
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
        [currentSlide, nextSlide, slideTo],
    );

    const getNextSlide = useCallback(
        (slideTo: SlideDirection) => {
            if (slideTo === "next") return currentSlide < maxSlides - 1 ? currentSlide + 1 : 0;
            return currentSlide > 0 ? currentSlide - 1 : maxSlides - 1;
        },
        [maxSlides, currentSlide],
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
            }, 500);
        },
        [getNextSlide, slideTo],
    );

    useEffect(() => {
        if (autoSlide) interval.current = setInterval(() => slideWithAnimation("next"), 3000);
        return () => clearInterval(interval.current);
    }, [autoSlide, slideWithAnimation, title]);

    return (
        <div className={classNames("carousel-wrapper", className, { "with-arrows": !hideArrows })}>
            {title ? <h1 className="carousel-title">{title}</h1> : undefined}
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
                                    key={item.id}
                                    itemIndex={itemIndex}
                                    {...item}
                                    width={(100 - itemsInOneSlider) / itemsInOneSlider}
                                    onClick={onClickItem}
                                    randomColors={randomColors}
                                />
                            ))}
                        </div>
                    ))
                )}
            </div>
            {maxSlides > 1 && (
                <>
                    {!hideArrows ? (
                        <>
                            <CarouselArrowIcon type="prev" onClick={slideWithAnimation} />
                            <CarouselArrowIcon type="next" onClick={slideWithAnimation} />
                        </>
                    ) : undefined}
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
    );
}

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

type CarouselItemProps = CarouselItem & {
    width: number;
    itemIndex: number;
    randomColors?: boolean;
    onClick?: (id: number) => void;
};

const CarouselItem: FC<CarouselItemProps> = ({
    width,
    id,
    itemIndex,
    image,
    randomColors,
    onClick,
    renderItem,
    itemValue,
    title,
}) => {
    const handleClick = useCallback(() => onClick?.(id), [id, onClick]);

    return (
        <div
            className={classNames("carousel-item", { click: !!onClick })}
            onClick={handleClick}
            style={{ width: `${width}%` }}
            key={id}
        >
            {title ? (
                <h2
                    className="item-name"
                    style={randomColors ? { backgroundColor: COLORS[itemIndex % 4] } : undefined}
                >
                    {title}
                </h2>
            ) : undefined}
            {renderItem?.(itemValue)}
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
        [onClick, slide, currentSlide],
    );

    const breadCrumbsClassnames = useMemo(
        () =>
            classNames("bread-crumb", {
                active: currentSlide === slide,
                next: nextSlide === slide,
                prev: currentSlide === slide && isInAnimation,
            }),
        [currentSlide, slide, nextSlide, isInAnimation],
    );

    return <div onClick={handleClick} className={breadCrumbsClassnames} />;
};

const arrayToMatrix = (array: CarouselItem<any>[], columns: number): CarouselItem<any>[][] =>
    Array(Math.ceil(array.length / columns))
        .fill(null)
        .reduce((prev, _, itemIndex) => {
            return [...prev, [...array].splice(itemIndex * columns, columns)];
        }, []);
