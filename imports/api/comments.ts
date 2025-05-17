import { Mongo } from "meteor/mongo";

export interface Comment {
  _id?: string;
  userId: string;
  adventureRouteId: string;
  date: Date;
  commentText: string;
  commentIdReplyFrom?: string;
  imageAttachmentUrl?: string;
  placeOfInterest?: google.maps.Place;
}

export const CommentsCollection = new Mongo.Collection<Comment>("comments");
