import { Collection, Db, MongoClient } from "mongodb";
import env from "@constants/env";
import type Trip from "@models/trip";
import type User from "@models/user";

type tripDBCollections = {
  users?: Collection<User>;
  trips?: Collection<Trip>;
  comments?: Collection<Comment>;
};
export const collections: tripDBCollections = {};

export const connectToDatabase = async () => {
  const client: MongoClient = new MongoClient(env.VITE_DB_CONNECTION_STRING!);

  await client.connect();

  const db: Db = client.db("adventure-routes");

  const usersCollection: Collection<User> = db.collection<User>("users");
  const tripsCollection: Collection<Trip> = db.collection<Trip>("trips");
  const commentsCollection: Collection<Comment> =
    db.collection<Comment>("comments");

  usersCollection.createIndex({ id: 1 });
  usersCollection.createIndex({ username: 1 }, { unique: true });
  usersCollection.createIndex({ email: 1 }, { unique: true });
  tripsCollection.createIndex({ id: 1 });
  commentsCollection.createIndex({ id: 1 });

  collections.users = usersCollection;
  collections.trips = tripsCollection;
  collections.comments = commentsCollection;

  console.log(`Successfully connected to database: ${db.databaseName}`);
};
