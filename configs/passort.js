import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userModel from "../models/user.model.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback", // Ensure this matches the route
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await userModel.findOne({ email: profile.emails[0].value });
        if (user) {
          user.imageUrl = profile.photos[0].value;
          user.googleId = profile.id;
          await user.save();
          done(null, user);
        } else {
          const newUser = new userModel({
            name: profile.displayName,
            email: profile.emails[0].value,
            imageUrl: profile.photos[0].value,
            googleId: profile.id,
          });
          await newUser.save();
          done(null, newUser);
        }
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});