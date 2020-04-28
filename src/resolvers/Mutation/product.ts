import { getUserId, Context } from '../../utils';
import { createWriteStream } from 'fs';
import * as shortid from 'shortid'
import {prisma} from "../../generated/prisma-client";

const storeUpload = async ({ stream, filename }): Promise<any> => {
    const id = shortid.generate();
    const path = `images/${id}`;

    return new Promise((resolve, reject) =>
        stream
            .pipe(createWriteStream(path))
            .on('finish', () => resolve({ path }))
            .on('error', reject),
    )
};

const processUpload = async upload => {
    const { createReadStream, filename, mimetype, encoding } = await upload
    const stream = createReadStream()
    const { path } = await storeUpload({ stream, filename })
    return path
};

export const product = {
    deleteProduct: async (parent, args, ctx: Context, info) => {
        return ctx.prisma.deleteProduct({id: args.where.id})
    },
    async updateProduct(parent, { name, price, picture, id }, ctx: Context, info) {
        let pictureUrl = null;
        if (picture) {
            pictureUrl = await processUpload(picture);
        };
        return ctx.prisma.updateProduct({
            data: {
                name,
                price,
                pictureUrl: await processUpload(picture),
            }, where: {
                id
            }
        })
    },
    async createProduct(parent, { name, price, picture }, ctx: Context, info) {
        // @ts-ignore
        const userId = getUserId(ctx);
        return ctx.prisma.createProduct({
            name,
            price,
            pictureUrl: await processUpload(picture),
            seller: {
                connect: { id: userId },
            },
        })
    },
}
