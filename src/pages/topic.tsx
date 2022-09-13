import { PhotoGrid } from "components";
import ErrorBoundary from "components/organisms/error-boundary";
import { usePhotosByTopic } from "hooks";
import { useParams } from "react-router-dom";

export const Topic = () => {
    const { slug } = useParams();
    const query = usePhotosByTopic({
        per_page: 9,
        slug
    });

    return (
        <div className="mt-10 px-10 ">
            <ErrorBoundary>
                <PhotoGrid query={query} />
            </ErrorBoundary>
        </div>
    );
};
