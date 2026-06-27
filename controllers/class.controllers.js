import Class from "../models/class.model.js";
import { User } from "../models/user.model.js";

// 1. Create New Class (Only Manager)
export const createClass = async (req, res) => {
    try {
        const { className, subject, teacherId, schedule, maxCapacity } = req.body;

        if (!className || !subject || !teacherId) {
            return res.status(400).json({ message: "Class Name, Subject, and Teacher are required" });
        }

        // Check karein ke jo teacherId aayi hai, kya woh sach mein ek teacher hi hai
        const teacherUser = await User.findById(teacherId);
        if (!teacherUser || teacherUser.role !== "teacher") {
            return res.status(400).json({ message: "Invalid Teacher ID. Selected user must be a teacher." });
        }

        const newClass = await Class.create({
            className,
            subject,
            teacher: teacherId,
            schedule,
            maxCapacity
        });

        return res.status(201).json({ message: "Class created successfully", newClass });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// 2. Enroll Student in a Class (Manager or Student itself)
export const enrollStudentInClass = async (req, res) => {
    try {
        const { classId } = req.params;
        const studentId = req.user.role === "student" ? req.user._id : req.body.studentId;

        if (!studentId) {
            return res.status(400).json({ message: "Student ID is required" });
        }

        const currentClass = await Class.findById(classId);
        if (!currentClass) {
            return res.status(404).json({ message: "Class not found" });
        }

        // Check 1: Kya class already full hai?
        if (currentClass.enrolledStudents.length >= currentClass.maxCapacity) {
            return res.status(400).json({ message: "Class has reached its maximum capacity" });
        }

        // Check 2: Kya student pehle se enrolled hai?
        if (currentClass.enrolledStudents.includes(studentId)) {
            return res.status(400).json({ message: "Student is already enrolled in this class" });
        }

        // Student ko array mein push karein
        currentClass.enrolledStudents.push(studentId);
        await currentClass.save();

        return res.status(200).json({ message: "Student enrolled successfully", currentClass });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// 3. Get Dashboard Classes based on Role (Student / Teacher / Manager)
export const getMyClasses = async (req, res) => {
    try {
        let classes;

        if (req.user.role === "manager") {
            // Manager saari classes dekh sakta hai aur data populate karega
            classes = await Class.find()
                .populate("teacher", "first_name last_name email_address")
                .populate("enrolledStudents", "first_name last_name email_address");
        } else if (req.user.role === "teacher") {
            // Teacher ko sirf uski apni classes dikhein
            classes = await Class.find({ teacher: req.user._id })
                .populate("enrolledStudents", "first_name last_name email_address");
        } else if (req.user.role === "student") {
            // Student ko sirf woh classes dikhein jisme woh enrolled hai
            classes = await Class.find({ enrolledStudents: req.user._id })
                .populate("teacher", "first_name last_name email_address");
        }

        return res.status(200).json({ classes });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};