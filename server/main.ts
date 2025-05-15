import { Meteor } from "meteor/meteor";
import { AdventureRoutesCollection } from "/imports/api/adventureRoutes";

Meteor.startup(async () => {
  await Promise.all([
    AdventureRoutesCollection.createIndexAsync({ userId: -1 }),
  ]);

  // We publish the entire Links collection to all clients.
  // In order to be fetched in real-time to the clients
  Meteor.publish("adventureRoutesForUser", (userId: string) => {
    return AdventureRoutesCollection.find({ userId });
  });
  Meteor.publish("adventureRouteById", (id: string) => {
    const userId = Meteor.userId();
    if (!userId) {
      console.error("User is not logged in.");
      throw new Meteor.Error("not-logged-in", "User is not logged in.");
    }
    return AdventureRoutesCollection.find({ _id: id }, { limit: 1 });
  });
});
