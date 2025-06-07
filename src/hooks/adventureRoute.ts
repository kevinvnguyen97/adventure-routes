import type Route from "@models/route";
import { useCallback, useEffect, useState } from "react";

export const useAdventureRoute = (routeId: string) => {
  const [adventureRoute, setAdventureRoute] = useState<Route>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchAdventureRoute = useCallback(async (routeId: string) => {
    const response = await fetch(`/api/routes/${routeId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const adventureRoute = (await response.json()) as unknown as Route;
    setAdventureRoute(adventureRoute);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchAdventureRoute(routeId);
  }, [routeId, fetchAdventureRoute]);

  return { adventureRoute, isLoading };
};
