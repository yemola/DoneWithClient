import { useEffect, useState } from "react";
import * as Location from "expo-location";
import * as Sentry from "sentry-expo";

export default useLocation = () => {
  const [location, setLocation] = useState();

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (granted) {
        const lastKnownPosition = await Location.getLastKnownPositionAsync();

        if (!lastKnownPosition) return;
        const { latitude, longitude } = lastKnownPosition.coords;
        setLocation({ latitude, longitude });
      } else return;
    } catch (error) {
      Sentry.Native.captureException(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return location;
};
