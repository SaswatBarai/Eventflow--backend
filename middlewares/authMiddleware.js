import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = (req,res,next) => {
    let token;
    if(req.haeders.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }
    else if(req.cookies.token){
        token = req.headers.cookie.split("=")[1];
    }
    else{
        return res.status(401).json({
            message: "Not authorized to access this route"
        });
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next(); 
    }
    catch(err){
        return res.status(401).json({
            message: "Not authorized to access this route"
        });
    }

}


export default authMiddleware;