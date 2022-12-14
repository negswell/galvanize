import { useQuery } from "@tanstack/react-query";
import { useEnvconfig } from "hooks/utility";

export const useCollections = ({ limit = 5 }: { limit: number }) => {
    const envConfig = useEnvconfig();
    const response = useQuery(
        ["collections"],
        () => {
            // @ts-ignore
            const params = new URLSearchParams({
                per_page: limit
            });
            return fetch(`${envConfig.baseApiUrl}/collections`, {
                headers: {
                    Authorization: envConfig.accesskey,
                    "Accept-Version": "v1"
                }
            }).then((res) => res.json());
        },
        {
            staleTime: 60 * 60 * 1000,
            cacheTime: 60 * 60 * 1000
        }
    );
    return response;
};
