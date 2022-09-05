//day 05의 id(자동생성),content,create,update
//table name posts 스키마 만들어오기

import Sequelize from "sequelize";

export default class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: Sequelize.TEXT(1000),
          allowNull: false,
          comment: "내용",
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "Post",
        tableName: "posts",
        charset: "utf8mb4",
        collage: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Post, { foreignKey: "userIdx" });

    // 관계 설정
    /*
    1:N
    db.User.hasMany(db.Post)
    db.Post.belongTo(db.User)
    1:1
    db.User.hasOne(db.Post)
    db.Post.belongTo(db.User)
    or
    db.Post.belongTo(db.User)
    N:N
    db.Post.belongToMany(db.User,{through:"likes",as:"테이블별칭",foreignKey:"컬럼명"})
    db.User.belognToMany(db.Post,{through:"likes"})
    
    */

    db.Post.belongsTo(db.User, { foreignKey: "userIdx" });
  }
}
