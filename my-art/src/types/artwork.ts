export type Artwork = {
  id: number;
  title: string;
  image_id: string | null;
  artist_display: string | null;
  date_display: string | null;
  place_of_origin: string | null;
  medium_display: string | null;
  dimensions: string | null;
  thumbnail?: {
    alt_text?: string;
    lqip?: string;
    width?: number;
    height?: number;
  };
};

export type Pagination = {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
  next_url: string | null;
};

export type ArtworksResponse = {
  pagination: Pagination;
  data: Artwork[];
  config: {
    iiif_url: string;
  };
};

export type ArtworkDetailResponse = {
  data: Artwork & {
    main_reference_number?: string | null;
    department_title?: string | null;
    gallery_title?: string | null;
    credit_line?: string | null;
    publication_history?: string | null;
    exhibition_history?: string | null;
    provenance_text?: string | null;
    is_public_domain?: boolean;
  };
  config: {
    iiif_url: string;
  };
};