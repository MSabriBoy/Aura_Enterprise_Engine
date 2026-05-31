import apiClient from "./apiClient";

export const fetchInventory = async (
  params
) => {
  const { data } = await apiClient.get(
    "/inventory",
    {
      params,
    }
  );

  return data;
};