import dayjs from "dayjs";
import {
  sessionsCollection,
  entriesCollection,
  usersCollection,
} from "../database/db.js";
import { entriesSchema } from "../models/entry.model.js";

export async function createEntry(req, res) {
  const { value, description, type } = req.body;
  const user = req.user;
  const now = dayjs().format("DD/MM");
  const sendObj = {
    value,
    description,
    user: user._id,
    time: now,
    type,
  };
  const { error } = entriesSchema.validate(sendObj, {
    abortEarlly: false,
  });
  try {
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).send(errors);
    }
    await entriesCollection.insertOne(sendObj);

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function findEntry(req, res) {
  const { authorization } = req.headers;

  const token = authorization?.replace("Bearer", "").trim();

  try {
    const session = await sessionsCollection.findOne({ token });

    const user = await usersCollection.findOne({ _id: session?.userId });
    console.log(session);

    if (!user) {
      return res.sendStatus(401);
    }
    const entries = await entriesCollection
      .find({ user: session.userId })
      .sort({ _id: -1 })
      .toArray();
    res.send(entries);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

