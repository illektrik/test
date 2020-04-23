import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import {Context, createToken, getUserId} from '../../utils'

export const auth = {
  async refreshToken(parent, args, ctx: Context) {
    const userId = getUserId(ctx);
    return {
      token: createToken(userId),
      userId
    };
  },
  async signup(parent, args, ctx: Context) {
    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.prisma.createUser({ ...args, password })

    return {
      token: createToken(user.id),
      user,
    }
  },

  async login(parent, { email, password }, ctx: Context) {
    const user = await ctx.prisma.user({ email })
    if (!user) {
      return {
        error: {
          field: 'email',
          msg: 'No users found!'
        }
      }
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return {
        error: {
          field: 'password',
          msg: 'Invalid password'
        }
      }
    }

    return {
      payload: {
        token: createToken(user.id),
        user,
      }
    }
  },
}
