import { useRef, useState, useEffect, PropsWithChildren, FC } from "react";
import { SliderArrowDirection } from "./types";

export const TextSlider: FC<PropsWithChildren> = ({ children }) => {
    const maxScrollWidth = useRef(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const carousel = useRef<any>(null);

    const movePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevState) => prevState - 1);
        }
    };

    const moveNext = () => {
        if (
            carousel.current !== null &&
            (carousel.current.offsetWidth * currentIndex) / 2 <=
                maxScrollWidth.current
        ) {
            setCurrentIndex((prevState) => prevState + 1);
        }
    };

    const isDisabled = (direction: SliderArrowDirection) => {
        if (direction === SliderArrowDirection.PREVIOUS) {
            return currentIndex <= 0;
        }

        if (
            direction === SliderArrowDirection.NEXT &&
            carousel.current !== null
        ) {
            return (
                (carousel.current.offsetWidth * currentIndex) / 2 >=
                maxScrollWidth.current
            );
        }

        return false;
    };

    useEffect(() => {
        if (carousel !== null && carousel.current !== null) {
            carousel.current.scrollLeft =
                (carousel.current.offsetWidth * currentIndex) / 2;
        }
    }, [currentIndex]);

    useEffect(() => {
        maxScrollWidth.current = carousel.current
            ? carousel.current.scrollWidth - carousel.current.offsetWidth
            : 0;
    }, []);

    return (
        <div className="flex w-full h-full overflow-hidden items-center">
            <button
                onClick={movePrev}
                className="h-full flex items-center z-10 pr-2 disabled:hidden transition-all ease-in-out duration-300"
                disabled={isDisabled(SliderArrowDirection.PREVIOUS)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                </svg>
            </button>
            <nav
                ref={carousel}
                className="w-full overflow-hidden relative flex gap-4 scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
            >
                {children}
            </nav>
            <button
                onClick={moveNext}
                className=" h-full flex items-center z-10 pl-2 disabled:hidden transition-all ease-in-out duration-300"
                disabled={isDisabled(SliderArrowDirection.NEXT)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                </svg>
            </button>
        </div>
    );
};
