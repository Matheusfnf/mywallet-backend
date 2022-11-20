import {
  sessionsCollection,
  entriesCollection,
  usersCollection,
} from "../database/db.js";
import { entriesSchema } from "../models/entry.model.js";

export async function createEntry(req, res) {
  const { value, description } = req.body;
  const user = req.user;

  try {
    const newEntry = {
      value,
      description,
      user: user._id,
    };

    const { error } = entriesSchema.validate(newEntry, {
      abortEarlly: false,
    });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).send(errors);
    }
    await entriesCollection.insertOne(newEntry);

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function findEntry(req, res) {
  const { authorization } = req.headers;

  const token = authorization?.replace("Bearer", "");

  try {
    const session = await sessionsCollection.findOne({ token });
    const user = await usersCollection.findOne({ _id: session?.userId });

    if (!user) {
      return res.sendStatus(401);
    }
    const entries = await entriesCollection.find().sort({ _id: -1 }).toArray();
    res.send(entries);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
