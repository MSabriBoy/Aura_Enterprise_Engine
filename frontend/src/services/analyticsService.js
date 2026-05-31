import apiClient from "./apiClient";

export const fetchAnalytics =
  async () => {
    const { data } =
      await apiClient.get(
        "/analytics"
      );

    return data;
  };