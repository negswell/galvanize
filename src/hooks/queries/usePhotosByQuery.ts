import { useInfiniteQuery } from "@tanstack/react-query";
import { useEnvconfig } from "hooks/utility";

export const usePhotosByQuery = ({
  per_page = 9,
  slug,
}: {
  slug?: string;
  per_page: number;
}) => {
  const envConfig = useEnvconfig();
  const response = useInfiniteQuery(
    ["search", slug],
    async ({ pageParam = 1 }) => {
      // refer https://github.com/microsoft/TypeScript/issues/32951
      const params = new URLSearchParams({
        page: pageParam,
        query: slug,
        per_page,
      });
      const res = await fetch(
        `${envConfig.baseApiUrl}/search/photos?${params}`,
        {
          headers: {
            Authorization: envConfig.accesskey,
            "Accept-Version": "v1",
          },
        }
      );
      const result = await res.json();
      return result.results;
    },
    {
      getNextPageParam: (_, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage;
      },
      enabled: !!slug,
      staleTime: 600 * 60 * 1000,
      cacheTime: 600 * 60 * 1000,
    }
  );
  return response;
};
