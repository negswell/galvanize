import { DownloadIcon, SolidHeartIcon, CrossIcon } from "assets/svgs";
import { Spinner } from "components/atoms";
import { usePhotoById } from "hooks";
import { FC, useState } from "react";
import { downloadImage } from "../../photo";
import { IPhoto } from "../../types";

interface PhotoDetailProps {
    photo: IPhoto;
    onClose: () => void;
}

export const PhotoDetail: FC<PhotoDetailProps> = ({ photo, onClose }) => {
    const { data, isLoading } = usePhotoById(photo.id);
    const [zoomed, setZoomed] = useState(false);

    return (
        <div
            className="bottom-0 top-0 right-0 left-0 fixed z-30 cursor-zoom-out"
            style={{ backgroundColor: "#0009" }}
            onClick={onClose}
        >
            <div className="px-20 pt-4 h-full w-full flex">
                <div
                    className="w-full bg-white cursor-auto overflow-y-scroll"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="w-full flex justify-end">
                        <button className="p-2" onClick={onClose}>
                            <CrossIcon />
                        </button>
                    </div>
                    <div className="flex justify-between py-4 px-10">
                        <div className="flex items-center gap-2">
                            <img
                                className="h-10 w-10 rounded-full"
                                src={photo.user.profile_image.small}
                                alt="avatar"
                            />
                            <span>{photo.user.name}</span>
                        </div>
                        <div className="flex gap-7">
                            <button className="flex items-center gap-1 p-2 rounded-md border text-gray-500 hover:border-black hover:text-black transition-colors ease-in">
                                {isLoading ? (
                                    <Spinner />
                                ) : (
                                    <span className="text-md">
                                        {data.downloads}
                                    </span>
                                )}
                                <DownloadIcon
                                    onClick={() =>
                                        downloadImage(photo["urls"]["full"])
                                    }
                                />
                            </button>
                            <button className="flex items-center gap-1 p-2 rounded-md border text-gray-500 hover:border-black hover:text-black transition-colors ease-in">
                                <span className="text-md">{photo.likes}</span>
                                <SolidHeartIcon />
                            </button>
                        </div>
                    </div>
                    <div
                        className={`w-full flex justify-center cursor  ${
                            zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                        }`}
                        onClick={() => setZoomed((prevState) => !prevState)}
                    >
                        <img
                            src={
                                zoomed
                                    ? photo["urls"]["full"]
                                    : photo["urls"]["regular"]
                            }
                            alt="image"
                            style={{ maxHeight: "100%", maxWidth: "100%" }}
                        />
                    </div>
                    <div className="py-6 px-10 grid grid-cols-2 gap-4">
                        {data && (
                            <>
                                {(data.location.city ||
                                    data.location.country) && (
                                    <div>
                                        <p className="text-gray-500 text-sm">
                                            Location
                                        </p>
                                        <p>{`${data.location.city ?? ""} ${
                                            data.location.country ?? ""
                                        }`}</p>
                                    </div>
                                )}
                                <div>
                                    <p className="text-gray-500 text-sm">
                                        Created At
                                    </p>
                                    <p>{data.created_at}</p>
                                </div>
                                {data.exif.name && (
                                    <div>
                                        <p className="text-gray-500 text-sm">
                                            Camera Details
                                        </p>
                                        <p>Name : {data.exif.name}</p>
                                        <p>Aperture : {data.exif.aperture}</p>
                                        <p>
                                            Focal Length :{" "}
                                            {data.exif.focal_length}
                                        </p>
                                        <p>Iso : {data.exif.iso}</p>
                                    </div>
                                )}
                            </>
                        )}
                        {photo.description && (
                            <div>
                                <p className="text-gray-500 text-sm">
                                    Description
                                </p>
                                <p>{photo.description}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
