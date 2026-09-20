import { Button, Input, SimpleGrid, VStack } from "@chakra-ui/react";
import Loading from "@components/Loading";
import TripCard from "@components/TripCard";
import TripFormDialog from "@components/TripFormDialog";
import { useTrips } from "@shared/hooks/trip";
import { useLayoutEffect } from "react";
import { tripsApi } from "@services/axiosInstance";
import type { UpsertTripArgs } from "@shared/types/api";
import { toaster } from "@utils/toaster";

const Dashboard = () => {
  const { trips, isLoading, upsertTrip, deleteTrip } = useTrips({
    tripsAxiosApi: tripsApi,
  });

  const upsertTripSubmit = async (args: UpsertTripArgs) => {
    const { status, statusText, success, message } = await upsertTrip(args);

    toaster.create({
      title: `${success ? "Code" : "Error"} ${status} ${statusText}`,
      description: message,
      type: success ? "success" : "error",
      closable: true,
    });
  };

  const deleteTripSubmit = async (tripId: string) => {
    const { status, statusText, success, message } = await deleteTrip(tripId);

    toaster.create({
      title: `${success ? "Code" : "Error"} ${status} ${statusText}`,
      description: message,
      type: success ? "success" : "error",
      closable: true,
    });
  };

  useLayoutEffect(() => {
    window.document.title = "Dashboard - Adventure Routes";
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <VStack
      alignItems="center"
      data-state="open"
      _open={{ animation: "fade-in 1s ease-out" }}
      marginTop={5}
    >
      <Input
        width={{ smDown: "100%", sm: 400 }}
        size="2xl"
        variant="subtle"
        placeholder="Search for Trip"
      />
      <TripFormDialog
        triggerButton={
          <Button colorPalette="orange" color="text">
            Create a Trip
          </Button>
        }
        upsertTrip={upsertTripSubmit}
      />
      <SimpleGrid
        columns={[1, 1, 2, 3, 4, 5]}
        columnGap={3}
        rowGap={3}
        alignContent="center"
        autoColumns="max-content"
        width="100%"
      >
        {trips.map((trip) => (
          <TripCard
            key={trip._id.toString()}
            trip={trip}
            upsertTrip={(tripFields) =>
              upsertTripSubmit({
                tripId: trip._id.toString(),
                ...tripFields,
              })
            }
            deleteTrip={() => deleteTripSubmit(trip._id.toString())}
          />
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default Dashboard;
