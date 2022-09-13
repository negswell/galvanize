export const useEnvconfig = () => {
  const envConfig = {
    accesskey: import.meta.env.VITE_ACCESS_KEY || "",
    secretkey: import.meta.env.VITE_SECRET_KEY || "",
    baseApiUrl: import.meta.env.VITE_BASE_API_URL || "",
  };
  return envConfig;
};
