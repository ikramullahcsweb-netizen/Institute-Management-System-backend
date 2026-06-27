// import jwt from 'jsonwebtoken';

// /**
//  * Middleware: verifyJWT (Protected Route Validator)
//  * Purpose: Authenticates the user by verifying the JWT token in the header.
//  */
// const verifyJWT = (req, res, next) => {
//     // 1. Authorization header ko check karo
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ 
//             success: false, 
//             message: "Access Denied: No valid authentication token provided" 
//         });
//     }

//     // 2. Token extract karo
//     const token = authHeader.split(' ')[1];

//     try {
//         // 3. Environment variable safety check
//         if (!process.env.JWT_SECRET) {
//             console.error("FATAL ERROR: JWT_SECRET is not defined.");
//             return res.status(500).json({ success: false, message: "Internal server configuration error" });
//         }

//         // 4. Token verify karo
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         // 5. User data ko request object mein attach karo 
//         req.user = decoded;
        
//         next();
//     } catch (err) {
//         // 6. Specific error handling for client feedback
//         let message = "Invalid Token";
//         if (err.name === 'TokenExpiredError') {
//             message = "Token has expired, please log in again";
//         } else if (err.name === 'JsonWebTokenError') {
//             message = "Malformed token";
//         }
        
//         return res.status(401).json({ 
//             success: false, 
//             message: message 
//         });
//     }
// };

// // Modern Named Export (Taaki curly braces { verifyJWT } chal sakein)
// export { verifyJWT };



// import { ApiError } from "../utils/ApiError.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import jwt from "jsonwebtoken";
// import { User } from "../models/user.model.js";

// export const verifyJWT = asyncHandler(async (req, res, next) => {
//     try {
//         const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
//         if (!token) {
//             throw new ApiError(401, "Unauthorized request");
//         }
    
//         const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
//         const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    
//         if (!user) {
//             throw new ApiError(401, "Invalid Access Token");
//         }
    
//         req.user = user;
//         next();
//     } catch (error) {
//         throw new ApiError(401, error?.message || "Invalid access token");
//     }
// });


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