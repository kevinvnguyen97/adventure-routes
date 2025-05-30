import { Collection, Db, MongoClient } from "mongodb";
import env from "@constants/env";
import type Route from "@models/route";
import type User from "@models/user";

type AdventureRouteDBCollections = {
  users?: Collection<User>;
  routes?: Collection<Route>;
  comments?: Collection<Comment>;
};
export const collections: AdventureRouteDBCollections = {};

export const connectToDatabase = async () => {
  const client: MongoClient = new MongoClient(env.VITE_DB_CONNECTION_STRING!);

  await client.connect();

  const db: Db = client.db("adventure-routes");

  const usersCollection: Collection<User> = db.collection<User>("users");
  const routesCollection: Collection<Route> = db.collection<Route>("routes");
  const commentsCollection: Collection<Comment> =
    db.collection<Comment>("comments");

  usersCollection.createIndex(
    { id: 1, username: 1, email: 1 },
    { unique: true }
  );
  routesCollection.createIndex({ id: 1 });
  commentsCollection.createIndex({ id: 1 });

  collections.users = usersCollection;
  collections.routes = routesCollection;
  collections.comments = commentsCollection;

  console.log(`Successfully connected to database: ${db.databaseName}`);
};
