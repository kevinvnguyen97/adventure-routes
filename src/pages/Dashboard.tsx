import { Button, Input, SimpleGrid, VStack } from "@chakra-ui/react";
import Loading from "@components/Loading";
import TripCard from "@components/TripCard";
import TripFormDialog from "@components/TripFormDialog";
import { useTrips } from "@hooks/trip";

const Dashboard = () => {
  const { trips, isLoading, upsertTrip, deleteTrip } = useTrips();

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
        triggerButton={<Button>Create a Trip</Button>}
        upsertTrip={(tripFields) => upsertTrip({ tripForm: tripFields })}
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
              upsertTrip({
                tripId: trip._id.toString(),
                tripForm: tripFields,
              })
            }
            deleteTrip={() => deleteTrip(trip._id.toString())}
          />
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default Dashboard;
