import bcrypt from "bcrypt";

// 1. Password ko secure hash mein convert karne ke liye
export const hashPassword = async (password) => {
    try {
        const saltRounds = 12;
        // bcrypt automatically salt generate karega aur hash return karega
        const hashed = await bcrypt.hash(password, saltRounds);
        return hashed;
    } catch (error) {
        throw new Error("Password hashing failed: " + error.message);
    }
};

// 2. Login ke waqt password match karne ke liye
export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword); // returns true or false
};