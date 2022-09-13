import { FC, useState } from "react";
import { PhotoDetail } from "./photo-detail";
import { IPhoto } from "../types";
import { SolidHeartIcon, DownloadIcon } from "assets/svgs";

export const downloadImage = async (imageUrl: string) => {
  const image = await fetch(imageUrl);
  const imageBlog = await image.blob();
  const imageURL = URL.createObjectURL(imageBlog);
  const link = document.createElement("a");
  link.href = imageURL;
  link.download = "image";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const Photo: FC<{ photo: IPhoto }> = ({ photo }) => {
  const [visible, setVisible] = useState(false);

  const onClose = () => {
    setVisible(false);
  };

  if (visible) {
    return <PhotoDetail photo={photo} onClose={onClose} />;
  }

  return (
    <div className="relative">
      <img
        className="w-full peer cursor-zoom-in"
        src={photo["urls"]["regular"]}
        alt={`image-${photo.id}`}
        onClick={() => setVisible(true)}
      />
      <button className="peer-hover:flex hover:flex hidden absolute  items-center gap-1 top-4 right-4 bg-slate-100 p-2 rounded-md opacity-90 hover:opacity-100 transition-opacity ease-in">
        <span className="text-sm">{photo.likes}</span>
        <SolidHeartIcon />
      </button>
      <button className="peer-hover:block hover:block hidden absolute bottom-4 right-4 bg-slate-100 p-2 rounded-md opacity-90 hover:opacity-100 transition-opacity ease-in">
        <DownloadIcon onClick={() => downloadImage(photo["urls"]["full"])} />
      </button>
      <div className="peer-hover:flex hover:flex hidden absolute bottom-4 left-4 items-center gap-2">
        <img
          className="h-10 w-10 rounded-full"
          src={photo.user.profile_image.small}
          alt="avatar"
        />
        <span className="text-white">{photo.user.name}</span>
      </div>
    </div>
  );
};
