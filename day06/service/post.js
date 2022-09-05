import Post from "../models/post.js";
import User from "../models/user.js";

export default class PostService {
  static async create(req, res, next) {
    try {
      const post = await Post.create({
        content: req.body.content,
        userIdx: req.user.id,
        //등록된 컬럼명
      });
      //내가 지금받은 content내용과 로그인한 user.id로 db에 값을 넣겠다
      const fullPost = await Post.findOne({
        where: { id: post.id },
        include: [
          {
            model: User,
            attributes: ["id", "email"],
          },
        ],
      });
      //내가 방금 등록한 post.id값으로 selet* from where한것과 같은것 그렇게 찾아온 정보를 그중에서 userIdx는 id와 email을가지고오겠다 include의 역할(sql문의 join)

      res.status(200).json(fullPost);
      //성공했으면
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
  static async readAll(req, res, next) {
    try {
      const posts = await Post.findAll({
        order: [["createdAt", "DESC"]],
        //createdAt기준으로 정렬(sql정렬 ,DESC:내림차순(최신))
        // where: { userIdx: req.user.id },
        //where조건을 추가하면 내가 쓴 게시글만 다찾아서 정보를줌
        // limit: 2,
        //페이지당 2개만(페이지네이션)+스케쥴러
        //예를들어 최신등록게시물은 5개만가져오기 하면 limit를 걸면됨
        include: [
          {
            model: User,
            attributes: ["id", "email"],
          },
        ],
      });

      res.status(200).json(posts);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
  static async read(req, res, next) {
    try {
      const postId = req.params.postId;
      const fullPost = await Post.findOne({
        where: { id: postId },
        include: [
          {
            model: User,
            attributes: ["id", "email"],
          },
        ],
      });
      res.status(200).json(fullPost);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
  static async update(req, res, next) {
    try {
      const postId = req.qurey.postId;
      await Post.update(
        {
          content: req.body.content,
        },
        {
          where: {
            id: postId,
            userIdx: req.user.id,
          },
        }
      );
      res.status(200).json({
        postId: postId,
        content: req.body.content,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
  static async delete(req, res, next) {
    try {
      const postId = req.params.postId;
      await Post.destroy({
        where: {
          id: postId,
          userIdx: req.user.id,
        },
      });
      res.status(200).json({ PostId: postId });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}
