import { useInfiniteQuery } from "@tanstack/react-query";
import { useEnvconfig } from "hooks/utility";

export const usePhotos = ({ per_page = 9 }) => {
  const envConfig = useEnvconfig();
  const response = useInfiniteQuery(
    ["photos"],
    ({ pageParam = 1 }) => {
      // refer https://github.com/microsoft/TypeScript/issues/32951
      const params = new URLSearchParams({
        page: pageParam,
        per_page,
        order_by: "popular",
      });
      return fetch(`${envConfig.baseApiUrl}/photos?${params}`, {
        headers: {
          Authorization: envConfig.accesskey,
          "Accept-Version": "v1",
        },
      }).then((res) => res.json());
    },
    {
      getNextPageParam: (_, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage;
      },
      staleTime: 600 * 60 * 1000,
      cacheTime: 600 * 60 * 1000,
    }
  );
  return response;
};
