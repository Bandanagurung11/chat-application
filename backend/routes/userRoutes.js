import express from "express";
import upload from "../middleware/multer.js";
// import registerUser from "../controllers/userController.js"
import {
  registerUser,
  getUser,
  getUserById,
  updateUser,
  userDelete,
  userLogin,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", upload.single("profile"), registerUser);
router.get("/", getUser);
router.post("/login", userLogin);
router.get("/:id", getUserById);
router.patch("/:id", updateUser);
router.delete("/:id", userDelete);

export default router;
