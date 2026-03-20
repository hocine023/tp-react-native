export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Place {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  coordinates: Coordinates | null;
}

export interface ParisApiRecord {
  nom_usuel?: string;
  adresse?: string;
  coordonnees_geo?: {
    lat?: number;
    lon?: number;
  };
}

export interface ParisApiResponse {
  results: ParisApiRecord[];
}

export interface VisitPlan {
  [placeId: string]: string; // YYYY-MM-DD
}

export type RootDiscoveryStackParamList = {
  DiscoveryList: undefined;
  Detail: { place: Place };
};

export type RootTabParamList = {
  DiscoveryTab: undefined;
  Map: undefined;
  Profile: undefined;
};