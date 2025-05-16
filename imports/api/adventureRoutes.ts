import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

export interface AdventureRoute {
  _id?: string;
  userId: string;
  isPublic: boolean;
  pictureUrl?: string;
  name: string;
  priceCategory?: number;
  activities?: string[];
  description?: string;
  route: {
    origin: string;
    waypoints?: string[];
    destination: string;
  };
}

export const AdventureRoutesCollection = new Mongo.Collection<AdventureRoute>(
  "adventureRoutes"
);

Meteor.methods({
  upsertAdventureRoute: async (adventureRoute: AdventureRoute) => {
    const user = await Meteor.userAsync();
    if (!user || user._id !== adventureRoute.userId) {
      throw new Meteor.Error("not-authorized");
    }
    const { _id, ...adventureRouteFields } = adventureRoute;
    await AdventureRoutesCollection.upsertAsync(
      { _id },
      { $set: adventureRouteFields }
    );
  },
  deleteAdventureRoute: async (adventureRouteId: string) => {
    const user = await Meteor.userAsync();
    const adventureRoute = await AdventureRoutesCollection.findOneAsync({
      _id: adventureRouteId,
    });
    if (!user || user._id !== adventureRoute?.userId) {
      throw new Meteor.Error("not-authorized");
    }
    await AdventureRoutesCollection.removeAsync({ _id: adventureRouteId });
  },
});
