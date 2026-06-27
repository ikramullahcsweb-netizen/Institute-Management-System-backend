import express from 'express';
import cors from 'cors';
import { 
  test,
  registerUser,       // Universal register (Student, Teacher, Manager, Admin ke liye)
  loginUser,          // Universal login (Student, Teacher, Manager, Admin ke liye)
  forgotPasswordUser, // Universal forgot password
  getCurrentUser,     // Pehle jo getProfile/getTeacherProfile tha
  getProfileById,     // Id se profile lane ke liye
  updateAccountDetails, // Universal profile update
  getAllStudents,
  getAllTeachers,
  getAllManagers,
  getAllAdmins,
  deleteUser,         // Universal delete
  logoutUser,         // Logout function
  googleAuth
} from '../controllers/authController.js'; // Extension lagana zaroori hai
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Middleware configuration
// router.use(
//   cors({
//     origin: 'http://localhost:3000',
//     credentials: true
//   })
// );

// 1. BASE TEST ROUTE
router.get('/', test);

// ==========================================
// 2. STUDENT ROUTES (Mapped to Universal Controllers)
// ==========================================
router.post('/register', registerUser); // Body mein role: "student" aayega
router.post('/login', loginUser);
router.post('/forgotpassword', forgotPasswordUser);
router.get('/studentprofile', getCurrentUser);
router.get('/studentprofileid/:id', getProfileById);
router.get('/getstudentprofileedit', getCurrentUser); 
router.put('/studentprofileedit', updateAccountDetails);
router.put('/studentprofileeditid/:sid', updateAccountDetails); // dynamic update via token/params

// ==========================================
// 3. TEACHER ROUTES (Mapped to Universal Controllers)
// ==========================================
router.post('/teacherregister', registerUser); // Body mein role: "teacher" aayega
router.post('/teacherlogin', loginUser);
router.post('/teacherforgetpassword', forgotPasswordUser);
router.get('/teacherprofile', getCurrentUser);
router.get('/teacherprofileall', getAllTeachers);
router.get('/getteacherprofileedit', getCurrentUser);
router.put('/teacherprofileedit', updateAccountDetails);
router.get('/teacherprofileid/:id', getProfileById);
router.put('/teacherprofileeditid/:tid', updateAccountDetails);

// ==========================================
// 4. MANAGER ROUTES (Mapped to Universal Controllers)
// ==========================================
router.post('/managerregister', registerUser); // Body mein role: "manager" aayega
router.post('/managerlogin', loginUser);
router.post('/managerforgetpassword', forgotPasswordUser);
router.get('/managerprofile', getCurrentUser);
router.get('/managerprofileall', getAllManagers); // Naya route poore managers list ke liye

// ==========================================
// 5. ADMIN ROUTES (Mapped to Universal Controllers)
// ==========================================
router.post('/adminregister', registerUser); // Body mein role: "admin" aayega
router.post('/adminlogin', loginUser);
router.post('/adminforgetpassword', forgotPasswordUser);
router.get('/adminprofile', getCurrentUser);
router.get('/adminprofileall', getAllAdmins); // Naya route poore admins list ke liye

// Admin Control Panel Routes
router.get('/getstudentsadmin', getAllStudents);
router.get('/getteachersadmin', getAllTeachers);
router.delete('/deletestudent/:id', deleteUser);
router.delete('/deleteteacher/:id', deleteUser);

// ==========================================
// 6. GLOBAL LOGOUT & OAUTH
// ==========================================
router.get('/logout', logoutUser);
router.post('/google-auth', googleAuth); // Google Auth backend execution point

export default router;