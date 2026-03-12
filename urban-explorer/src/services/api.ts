import axios from "axios";
import { ParisApiResponse, Place } from "../types";

const api = axios.create({
  baseURL: "https://opendata.paris.fr/api/explore/v2.1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  console.log(
    `Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`,
  );
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "API Error:",
      error?.response?.status ?? "network error",
      error?.message,
    );
    return Promise.reject(error);
  },
);

export const getPlaces = async (): Promise<Place[]> => {
  const response = await api.get<ParisApiResponse>(
    "/catalog/datasets/que-faire-a-paris-/records",
    {
      params: {
        limit: 30,
      },
    },
  );

  return response.data.results.map((item: any, index: number) => ({
    id: `${item.id}-${index}`,

    name: item.title ?? "Lieu sans nom",

    address:
      item.address_name ??
      `${item.address_street ?? ""} ${item.address_zipcode ?? ""}`,

    imageUrl: item.cover_url ?? `https://picsum.photos/200?random=${index + 1}`,

    coordinates:
      item.lat_lon?.lat != null && item.lat_lon?.lon != null
        ? {
            latitude: item.lat_lon.lat,
            longitude: item.lat_lon.lon,
          }
        : null,
  }));
};