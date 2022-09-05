import passport from "passport";
import User from "../models/user.js";
import local from "./local.js";

export default () => {
    // 세션 생성
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // 세션 데이터 해석 후 user 정보를 req.user에 담는 역할
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findOne({ where: { id } });
            done(null, user);
        } catch (err) {
            console.log(err);
            done(err);
        }
    });

    local();
};
