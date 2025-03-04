import admin from "../configs/firebase.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Login/Verify Token
const verifyToken = async (req, res) => {
    const { token } = req.body;
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const { uid, email, name, picture } = decodedToken;

        let user = await User.findOne({ firebaseUID: uid });
        
        if (!user) {
            user = await User.create({
                firebaseUID: uid,
                email,
                name,
                avatar: picture
            });
        }

        const authToken = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn: "7d" });
        
        res.json({ 
            success: true,
            message: "User authenticated", 
            token: authToken, 
            user 
        });
        
    } catch (error) {
        console.error("Auth Error:", error);
        res.status(401).json({ 
            success: false,
            error: "Invalid token" 
        });
    }
}

// Register new user
const registerUser = async (req, res) => {
    try {
        const { name, email, phoneNumber, countryCode } = req.body;

        // Format phone number to E.164 format
        const formattedPhoneNumber = phoneNumber.startsWith('+') 
            ? phoneNumber 
            : `+${countryCode}${phoneNumber}`;

        // Validate phone number format
        if (!/^\+[1-9]\d{1,14}$/.test(formattedPhoneNumber)) {
            return res.status(400).json({
                success: false,
                error: "Invalid phone number format. Must be in E.164 format (e.g., +1234567890)"
            });
        }

        // Create user in Firebase
        const userRecord = await admin.auth().createUser({
            email,
            displayName: name,
            phoneNumber: formattedPhoneNumber,
        });

        // Create user in MongoDB
        const user = await User.create({
            firebaseUID: userRecord.uid,
            name,
            email,
            phoneNumber: formattedPhoneNumber
        });

        // Generate JWT token
        const authToken = jwt.sign({ uid: userRecord.uid }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token: authToken,
            user
        });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(400).json({
            success: false,
            error: error.message || "Registration failed"
        });
    }
}

export { verifyToken, registerUser };
