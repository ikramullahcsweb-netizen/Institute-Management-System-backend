import express from "express";
import {
  registerAdminManager,
  loginAdminManager,
  forgotPasswordAdminManager,
  getCurrentAdminManager,
  updateAdminManager,
  logoutAdminManager,
  getAllManagers,
  getAllAdmins,
  getAllStudents,
  getAllTeachers,
  deleteAnyUser,
  googleAuth,
} from "../controllers/adminManagerController.js";

import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ==================== REGISTER (Admin + Manager dono, role body se aata hai) ====================
router.post("/register", registerAdminManager);

// ==================== LOGIN (role ke hisaab se alag URL, function same) ====================
router.post("/login", loginAdminManager);          // Admin login
router.post("/managerlogin", loginAdminManager);   // Manager login

router.post("/forgotpassword", forgotPasswordAdminManager);

router.get("/profile", verifyJWT, getCurrentAdminManager);
router.put("/profileedit", verifyJWT, updateAdminManager);

// ==================== ADMIN PANEL: cross-entity oversight ====================
router.get("/managerprofileall", verifyJWT, getAllManagers);
router.get("/adminprofileall", verifyJWT, getAllAdmins);
router.get("/getstudentsadmin", verifyJWT, getAllStudents);
router.get("/getteachersadmin", verifyJWT, getAllTeachers);

router.delete("/deleteuser/:id", verifyJWT, deleteAnyUser);

router.post("/logout", verifyJWT, logoutAdminManager);
router.post("/google-auth", googleAuth);

export default router;