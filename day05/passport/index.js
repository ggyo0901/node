import passport from "passport";
import local from "./local.js";
import User from "../models/user.js";
export default () => {
  //세션생성
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  //세션 데이터 해석후 user 정보를 req.user에 담는 역할
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findeOne({ where: { id } });
      done(null, user);
    } catch (err) {
      console.log(err);
      done(err);
    }
  });
  local();
};
