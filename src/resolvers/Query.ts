import { getUserId, Context } from '../utils'
import {forwardTo} from 'prisma-binding'
import {prisma} from "../generated/prisma-client";

export const Query = {
  products: async (parent, {orderBy}, ctx: Context, info) => {
    getUserId(ctx);
    return await prisma.products({
      orderBy
    })
  },
  feed(parent, args, ctx: Context) {
    return ctx.prisma.posts({ where: { published: true } })
  },

  drafts(parent, args, ctx: Context) {
    // @ts-ignore
    const id = getUserId(ctx)

    const where = {
      published: false,
      author: {
        id,
      },
    }

    return ctx.prisma.posts({ where })
  },

  post(parent, { id }, ctx: Context) {
    return ctx.prisma.post({ id })
  },

  me(parent, args, ctx: Context) {
    // @ts-ignore
    const id = getUserId(ctx)
    return ctx.prisma.user({ id })
  },
}
