import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Spinner, Photo } from "components";
import { usePhotos } from "hooks";
import { IPhoto, PhotoGridProps } from "./types";

export const PhotoGrid: FC<PhotoGridProps> = ({ query }) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = query;
  const [photoList, setPhotoList] = useState<IPhoto[][]>([]);
  const observerRef = useRef<any>(null);

  useEffect(() => {
    if (data && data.pages) {
      const flatData = data.pages.flat();
      const numberOfcolumns = 3;
      let photos: any[] = [];
      for (let col = 0; col < numberOfcolumns; col++) {
        photos.push([]);
      }
      for (let i = 0; i < numberOfcolumns; i++) {
        for (let j = i; j < flatData.length; j = j + numberOfcolumns) {
          photos[i].push(flatData[j]);
        }
      }

      //preload the images for smoother transition
      window["preLoadedImageData"] = [];
      flatData.forEach((photo) => {
        if (photo) {
          const newImage = new Image();
          newImage.src = photo["urls"]["regular"];
          window["preLoadedImageData"].push(newImage);
        }
      });
      setPhotoList(photos);
      return () => {
        delete window["preLoadedImageData"];
      };
    }
  }, [data?.pages]);

  const handleObserver = useCallback(
    (entries: any) => {
      const [target] = entries;
      if (target.isIntersecting) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    const element = observerRef.current;
    const option = { threshold: 0 };
    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(element);
    return () => observer.unobserve(element);
  }, [fetchNextPage, hasNextPage, handleObserver]);

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
      <div className="w-full flex justify-center py-10" ref={observerRef}>
        {isFetchingNextPage && hasNextPage && <Spinner />}
      </div>
    </>
  );
};
