import { PhotoGrid } from "components";
import ErrorBoundary from "components/organisms/error-boundary";
import { usePhotosByCollection } from "hooks";
import { useParams } from "react-router-dom";

export const Collection = () => {
  const { slug } = useParams();
  const query = usePhotosByCollection({
    per_page: 9,
    slug,
  });

  return (
    <div className="mt-10 px-10 ">
      <ErrorBoundary>
        <PhotoGrid query={query} />
      </ErrorBoundary>
    </div>
  );
};
