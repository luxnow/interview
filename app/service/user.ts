import { Context, Service } from 'egg';
// import { User } from '../model/user';

export default class UserService extends Service {
  constructor(ctx: Context) {
    super(ctx);
  }

  public async login(userName: string) {
    const users = await this.ctx.model.User.findAll({
      where: {
        userName
      }
    });

    return users.length > 0 ? users[0].id : 0 ;
  }

  public async register(userName: string) {
    const users = await this.ctx.model.User.findAll({
      where: {
        userName
      }
    });

    if (users.length === 0) {
      await this.ctx.model.User.create({ userName, createdDate: new Date(), updatedDate: null });
      return true;
    } else {
      return false;
    }
  }

  public async edit(id: number, userName: string) {

    const userModel = this.ctx.model.User;

    const user = await userModel.findByPk(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    userModel.sequelize.transaction(function(t) {
      return userModel.findOne({
        where: {
          userName,
        }, transaction: t
      })
        .spread(function(userResult) {

          if (!userResult) {
            userResult.userName = userName;
            userModel.save();
            return true;
          } else {
            return false;
          }
        }); // end spread
    }); // end transaction
    // user.userName = userName;
    // await user.save();

  }
}
