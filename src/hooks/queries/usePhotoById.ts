import { useQuery } from "@tanstack/react-query";
import { useEnvconfig } from "hooks/utility";

export const usePhotoById = (id: string) => {
    const envConfig = useEnvconfig();
    const response = useQuery(
        ["photo", id],
        () => {
            return fetch(`${envConfig.baseApiUrl}/photos/${id}`, {
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
