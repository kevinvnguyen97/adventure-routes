import { ObjectId } from "mongodb";

export default interface Comment {
  id: ObjectId;
  userId: ObjectId;
  commentText: string;
  replyId: ObjectId;
  dateTime: Date;
}
