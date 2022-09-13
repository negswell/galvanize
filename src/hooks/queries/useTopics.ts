import { useQuery } from "@tanstack/react-query";
import { useEnvconfig } from "hooks/utility";

export const useTopics = ({ limit = 5 }: { limit: number }) => {
    const envConfig = useEnvconfig();
    const response = useQuery(
        ["topics"],
        () => {
            // @ts-ignore
            const params = new URLSearchParams({
                per_page: limit
            });
            return fetch(`${envConfig.baseApiUrl}/topics?${params}`, {
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
