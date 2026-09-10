import { useColorMode } from "@components/ui/color-mode";
import { useTrip } from "@hooks/trip";
import {
  ColorScheme,
  ControlPosition,
  Map as GoogleMap,
  MapControl,
} from "@vis.gl/react-google-maps";
import { LuInfo } from "react-icons/lu";
import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, IconButton, useMediaQuery } from "@chakra-ui/react";
import Loading from "@components/Loading";
// import { RouteColors } from "@constants/google";
// import { toaster } from "@utils/toaster";
import TripDetailsCard from "@components/TripDetailsCard";
import TripDetailsDrawer from "@components/TripDetailsDrawer";

const Map = () => {
  const { tripId = "" } = useParams();
  const { colorMode } = useColorMode();
  const [isLandscape] = useMediaQuery(["(orientation: landscape)"]);

  const [areRoutesSelected, setAreRoutesSelected] = useState<boolean[]>([]);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [tab, setTab] = useState("details");

  const { trip, isLoading } = useTrip(tripId);

  useLayoutEffect(() => {
    if (trip) {
      window.document.title = `${trip.name} - Adventure Routes`;
    }
  }, [trip]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Box
      data-state="open"
      _open={{ animation: "fade-in 1s ease-out" }}
      paddingTop={5}
      display="flex"
      gap={isInfoVisible ? 5 : 0}
    >
      {isLandscape ? (
        <TripDetailsCard
          trip={trip!}
          isInfoVisible={isInfoVisible}
          setIsInfoVisible={setIsInfoVisible}
          routes={[]}
          areRoutesSelected={areRoutesSelected}
          setAreRoutesSelected={setAreRoutesSelected}
          tab={tab}
          setTab={setTab}
        />
      ) : (
        <TripDetailsDrawer
          trip={trip!}
          isInfoVisible={isInfoVisible}
          setIsInfoVisible={setIsInfoVisible}
          routes={[]}
          areRoutesSelected={areRoutesSelected}
          setAreRoutesSelected={setAreRoutesSelected}
          tab={tab}
          setTab={setTab}
        />
      )}
      <GoogleMap
        style={{
          width: "100%",
          height: "calc(100vh - 120px)",
          borderRadius: "0.375rem",
        }}
        defaultZoom={10}
        defaultCenter={{ lat: 40.7128, lng: -74.006 }}
        colorScheme={
          colorMode === "dark" ? ColorScheme.DARK : ColorScheme.LIGHT
        }
      >
        <MapControl position={ControlPosition.TOP_LEFT}>
          <IconButton
            onClick={() => setIsInfoVisible(!isInfoVisible)}
            top={2.5}
            bgColor={{ _light: "white", _dark: "#444444" }}
            color={{ _light: "black", _dark: "white" }}
          >
            <LuInfo />
          </IconButton>
        </MapControl>
      </GoogleMap>
    </Box>
  );
};

export default Map;
