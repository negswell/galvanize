import { PhotoGrid } from "components";
import ErrorBoundary from "components/organisms/error-boundary";
import { usePhotos } from "hooks";

export const Home = () => {
    const query = usePhotos({
        per_page: 9
    });

    return (
        <div className="mt-10 px-10 ">
            <ErrorBoundary>
                <PhotoGrid query={query} />
            </ErrorBoundary>
        </div>
    );
};
