import { FC, useEffect, useState } from "react";
import { Spinner, Photo } from "components";
import { IPhoto, PhotoGridProps } from "./types";

export const PhotoGrid: FC<PhotoGridProps> = ({ query }) => {
    const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = query;
    const [photoList, setPhotoList] = useState<IPhoto[][]>([]);

    useEffect(() => {
        if (data && data.pages) {
            const flatData = data.pages.flat();
            const numberOfcolumns = 3;
            let photos: any[] = [];

            for (let i = 0; i < numberOfcolumns; i++) {
                photos.push([]);
                for (let j = i; j < flatData.length; j = j + numberOfcolumns) {
                    photos[i].push(flatData[j]);
                }
            }

            //preload the images for smoother transition
            // @ts-ignore
            window["preLoadedImageData"] = new Set([]);
            flatData.forEach((photo: IPhoto) => {
                if (photo) {
                    const newImage = new Image();
                    newImage.src = photo["urls"]["regular"];
                    // @ts-ignore
                    window["preLoadedImageData"].add(newImage);
                }
            });

            setPhotoList(photos);

            return () => {
                // @ts-ignore
                delete window["preLoadedImageData"];
            };
        }
    }, [data?.pages]);

    useEffect(() => {
        let fetching = false;
        const handleScroll = async (e: any) => {
            const { scrollHeight, scrollTop, clientHeight } =
                e.target.scrollingElement;
            if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.4) {
                fetching = true;
                if (hasNextPage) await fetchNextPage();
                fetching = false;
            }
        };
        document.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    }, [fetchNextPage, hasNextPage]);

    return (
        <>
            <div className="grid grid-cols-3 gap-0">
                {photoList.map((col, index) => {
                    return (
                        <div key={index}>
                            {col.map((photo) => {
                                return <Photo photo={photo} key={photo.id} />;
                            })}
                        </div>
                    );
                })}
            </div>
            <div className="w-full flex justify-center py-10">
                {isFetchingNextPage && hasNextPage && <Spinner />}
            </div>
        </>
    );
};
