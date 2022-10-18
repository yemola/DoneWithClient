import Constants from "expo-constants";

const settings = {
  dev: {
    apiUrl: "http://192.168.43.59:8000/api",
  },
  staging: {
    apiUrl: "https://done-uh3o.onrender.com/api",
  },
  prod: {
    apiUrl: "https://done-uh3o.onrender.com/api",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();

// http://192.168.43.59:9000/api
