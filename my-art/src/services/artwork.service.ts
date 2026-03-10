import api from "./api";
import { ArtworkDetailResponse, ArtworksResponse } from "../types/artwork";

const LIST_FIELDS = [
  "id",
  "title",
  "image_id",
  "artist_display",
  "date_display",
  "thumbnail",
].join(",");

const DETAIL_FIELDS = [
  "id",
  "title",
  "image_id",
  "artist_display",
  "date_display",
  "place_of_origin",
  "medium_display",
  "dimensions",
  "thumbnail",
  "main_reference_number",
  "department_title",
  "gallery_title",
  "credit_line",
  "publication_history",
  "exhibition_history",
  "provenance_text",
  "is_public_domain",
].join(",");

export const getArtworks = async (
  page = 1,
  limit = 10
): Promise<ArtworksResponse> => {
  const response = await api.get<ArtworksResponse>("/artworks", {
    params: {
      page,
      limit,
      fields: LIST_FIELDS,
    },
  });

  return response.data;
};

export const searchArtworks = async (
  query: string,
  page = 1,
  limit = 10
): Promise<ArtworksResponse> => {
  const response = await api.get<ArtworksResponse>("/artworks/search", {
    params: {
      q: query,
      page,
      limit,
      fields: LIST_FIELDS,
    },
  });

  return response.data;
};

export const getArtworkById = async (
  id: number
): Promise<ArtworkDetailResponse> => {
  const response = await api.get<ArtworkDetailResponse>(`/artworks/${id}`, {
    params: {
      fields: DETAIL_FIELDS,
    },
  });

  return response.data;
};

export const buildImageUrl = (
  iiifUrl: string,
  imageId: string | null,
  size: 200 | 400 | 600 | 843 = 400
): string | null => {
  if (!imageId || !iiifUrl) return null;
  return `${iiifUrl}/${imageId}/full/${size},/0/default.jpg`;
};