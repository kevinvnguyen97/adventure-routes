import { Meteor } from "meteor/meteor";
import { AdventureRoutesCollection } from "/imports/api/adventureRoutes";

Meteor.startup(async () => {
  await Promise.all([
    AdventureRoutesCollection.createIndexAsync({ userId: -1 }),
  ]);

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

Meteor.methods({
  changeProfilePicture: async (newProfilePictureUrl: string) => {
    const user = await Meteor.userAsync();
    if (user && user._id) {
      await Meteor.users.updateAsync(
        { _id: user._id },
        { $set: { "profile.profilePictureUrl": newProfilePictureUrl } }
      );
    }
  },
});
