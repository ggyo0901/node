import bcrypt from "bcrypt";
import User from "../models/user.js";
class UserService {
  async signUp(req, res, next) {
    try {
      console.log(req.body);
      //findOne  검색된 최상단 데이터한가지 가지고온다(객체형태로봔환)
      //findAll 검색된 데이터 모두 가지고온다(배열형태로반환)
      const exUser = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (exUser) {
        return res.status(403).send("이미 사용중인 이메일입니다");
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      //단방향 암호화

      //create 데이터저장
      await User.create({
        email: req.body.email,
        password: hashedPassword,
      });
      res.status(200).send("ok");
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
export default UserService;