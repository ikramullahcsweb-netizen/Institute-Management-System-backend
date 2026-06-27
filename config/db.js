
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Environment variable safety check
        if (!process.env.MONGO_URI) {
            console.error("❌ Error: MONGO_URI is not defined in your .env file!");
            process.exit(1);
        }

        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        console.log(` MongoDB Connected Successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Database Connection Error: ${error.message}`);
        process.exit(1); // Server ko stop kar do agar connection fail ho
    }
};

// 🚀 Modern Default Export (Jo server.js dhoond raha hai)
export default connectDB;

