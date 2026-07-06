
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// === AAPKA PURANA VERIFY JWT MIDDLEWARE ===
export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    
        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }
    
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});

// === 🔥 FIXED ROLE AUTHORIZATION MIDDLEWARE ===
// Iska naam hamne 'authorizeRoles' rakha hai taaki classRoutes crash na ho
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        // 1. Check agar verifyJWT se user req object mein set nahi hua
        if (!req.user) {
            throw new ApiError(401, "Authentication required");
        }

        // 2. Check agar user ka role allowed roles mein shamil nahi hai
        if (!roles.includes(req.user.role)) {
            throw new ApiError(
                403, 
                `Forbidden: You do not have the required permissions (${roles.join(', ')})`
            );
        }

        next(); // Sab theek hai to agay controller par bhejo
    };
};