import { Meteor } from "meteor/meteor";
import { AdventureRoutesCollection } from "/imports/api/adventureRoutes";
import { Comment, CommentsCollection } from "/imports/api/comments";

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
  Meteor.publish("commentsForAdventureRoute", (adventureRouteId: string) => {
    return CommentsCollection.find({ adventureRouteId });
  });
  Meteor.publish("getUserInfo", (userId: string) => {
    return Meteor.users.find(
      { _id: userId },
      {
        fields: { userId: 1, username: 1, "profile.profilePictureUrl": 1 },
        limit: 1,
      }
    );
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
  upsertComment: async (comment: Comment) => {
    const { _id, ...commentFields } = comment;
    if (!comment.commentText) {
      throw new Meteor.Error("incomplete", "Field required");
    }
    await CommentsCollection.upsertAsync({ _id }, { $set: commentFields });
  },
  deleteComment: async (commentId: string) => {
    const userId = Meteor.userId();
    const commentToRemove = CommentsCollection.findOne({ _id: commentId });
    if (!userId) {
      throw new Meteor.Error("not-logged-in");
    }
    if (userId !== commentToRemove?.userId) {
      throw new Meteor.Error("not-authorized", "");
    }
    await CommentsCollection.removeAsync({ _id: commentId });
  },
});
