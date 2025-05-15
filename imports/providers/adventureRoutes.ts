import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { AdventureRoutesCollection } from "/imports/api/adventureRoutes";

export const useAdventureRoutesForUser = (userId: string) => {
  return useTracker(() => {
    const subscription = Meteor.subscribe("adventureRoutesForUser", userId);
    const adventureRoutes = userId
      ? AdventureRoutesCollection.find({ userId }).fetch()
      : [];
    return { data: adventureRoutes, isLoading: !subscription.ready() };
  }, [userId]);
};

export const useAdventureRoute = (id: string) => {
  const userId = Meteor.userId();
  return useTracker(() => {
    const subscription = Meteor.subscribe("adventureRouteById", id);
    const adventureRoute = userId
      ? AdventureRoutesCollection.find({ _id: id }).fetch()
      : [];
    return { data: adventureRoute[0], isLoading: !subscription.ready() };
  }, [userId, id]);
};
