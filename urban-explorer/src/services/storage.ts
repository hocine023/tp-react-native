import AsyncStorage from "@react-native-async-storage/async-storage";
import { VisitPlan } from "../types";

const PROFILE_PHOTO_KEY = "urban_explorer_profile_photo";
const VISIT_PLAN_KEY = "urban_explorer_visit_plan";

export const saveProfilePhoto = async (uri: string) => {
  await AsyncStorage.setItem(PROFILE_PHOTO_KEY, uri);
};

export const getProfilePhoto = async () => {
  return AsyncStorage.getItem(PROFILE_PHOTO_KEY);
};

export const saveVisitPlan = async (plans: VisitPlan) => {
  await AsyncStorage.setItem(VISIT_PLAN_KEY, JSON.stringify(plans));
};

export const getVisitPlan = async (): Promise<VisitPlan> => {
  const value = await AsyncStorage.getItem(VISIT_PLAN_KEY);
  return value ? JSON.parse(value) : {};
};