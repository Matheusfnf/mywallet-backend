import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const mongoClient = new MongoClient("mongodb://localhost:27017")
try {
  await mongoClient.connect();
  console.log("MongoDB conectado com sucesso");
} catch (err) {
  console.log(err);
}

const db = mongoClient.db("myWallet");
export const usersCollection = db.collection("users");
export const entriesCollection = db.collection("entradas");
export const exitCollection = db.collection("saidas");
export const sessionsCollection = db.collection("sessions");
