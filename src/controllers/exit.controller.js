import {
  sessionsCollection,
  exitCollection,
  usersCollection,
} from "../database/db.js";
import { exitSchema } from "../models/exit.model.js";

export async function createExit(req, res) {
  const { value, description } = req.body;
  const user = req.user;
  const now = dayjs().format("DD/MM");

  try {
    const newExit = {
      value,
      description,
      user: user._id,
      time: now,
      type: "saida"
    };

    const { error } = exitSchema.validate(newExit, {
      abortEarlly: false,
    });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).send(errors);
    }
    await exitCollection.insertOne(newExit);

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function findExit(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();

  try {
    const session = await sessionsCollection.findOne({ token });
    const user = await usersCollection.findOne({ _id: session?.userId });

    if (!user) {
      return res.sendStatus(401);
    }
    const exit = await exitCollection.find().toArray();
    res.send(exit);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
