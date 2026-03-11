import axios from "axios";
import { ApiResponse, Incident } from "../types";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const submitIncident = async (
  data: Incident
): Promise<ApiResponse<Incident>> => {
  try {
    const response = await api.post("/posts", data);

    console.log("Réponse serveur :", response.data);

    return {
      success: response.status === 201,
      data: {
        ...data,
        id: String(response.data.id),
      },
    };
  } catch (error: any) {
    return {
      success: false,
      error:
        error?.response?.data?.message ||
        error?.message ||
        "Erreur réseau lors de l'envoi.",
    };
  }
};