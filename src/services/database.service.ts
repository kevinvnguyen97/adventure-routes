import * as mongoDB from "mongodb";
import env from "@constants/env";

type AdventureRouteDBCollections = {
  users?: mongoDB.Collection;
  routes?: mongoDB.Collection;
  comments?: mongoDB.Collection;
};
export const collections: AdventureRouteDBCollections = {};

export const connectToDatabase = async () => {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    env.VITE_DB_CONNECTION_STRING!
  );

  await client.connect();

  const db: mongoDB.Db = client.db("adventure-routes");

  const usersCollection: mongoDB.Collection = db.collection("users");
  const routesCollection: mongoDB.Collection = db.collection("routes");
  const commentsCollection: mongoDB.Collection = db.collection("comments");

  collections.users = usersCollection;
  collections.routes = routesCollection;
  collections.comments = commentsCollection;

  console.log(`Successfully connected to database: ${db.databaseName}`);
};
