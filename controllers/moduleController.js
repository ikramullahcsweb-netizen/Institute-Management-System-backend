

// export const ka use karein, exports. ka nahi
export const getAllItems = async (req, res) => {
    try {
        // Yahan aapka Model import hona chahiye (e.g., import { ClassModel } from '../models/Class.js')
        // const data = await ClassModel.find();
        res.status(200).json({ message: "Data fetched successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error fetching data", error: err.message });
    }
};