import express from "express";
import {
  autoSuggest,
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "./home-task-2/controller/user";
import User from "./home-task-2/model/User";

const serverPort = 8000;
const app = express();
app.use(express.json());

app.get("/api/users", (req, res) => {
  const usersList = getAllUsers();
  res.json(usersList);
});

app.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  const user = getUserById(userId);
  if (user !== undefined) {
    res.json(user);
  } else {
    res.status(404).send("Not found");
  }
});

app.post("/api/users", (req, res) => {
  try {
    const user: User = req.body;
    const newUser = createUser(user);
    res.status(201).json(newUser);
  } catch (error) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }
    res.status(500).send(message);
  }
});

app.put("/api/users", (req, res) => {
  try {
    const updatedUser: User = req.body;
    updateUser(updatedUser);
    res.status(200).json({ message: "User successfully updated" });
  } catch (error) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }
    res.status(500).send(message);
  }
});

app.delete("/api/users/:id", (req, res) => {
  try {
    const userId = req.params.id;
    deleteUser(userId);
    res.status(204).json({ message: "User deleted successfully" });
  } catch (error) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }
    res.status(500).send(message);
  }
});

// Auto suggest users
app.get("/api/users-auto-suggest", (req, res) => {
  try {
    const loginSearch = req.query.login as string;
    const loginLimit = req.query.limit as string;
    const usersList = autoSuggest(loginSearch, parseInt(loginLimit, 10));
    res.status(200).json(usersList);
  } catch (error) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }
    res.status(500).send(message);
  }
});

// Auto suggest users
app.get("/api/users/test", (req, res) => {
  try {
    res.status(200).send("Ok");
  } catch (error) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }
    res.status(500).send(message);
  }
});

app.listen(serverPort, () => {
  console.log(`Listening from on port ${serverPort}`);
});
