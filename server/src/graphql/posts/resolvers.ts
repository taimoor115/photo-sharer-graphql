import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { AWS_ACCESS_ID, AWS_DEFAULT_REGION, AWS_SECRET_KEY, BUCKET_NAME } from "../../config/env.config.js";
import type { GraphqlContext } from "../../interfaces.js";
import { handleError } from "../../utils/error.util.js";



const s3Client = new S3Client({
    region: AWS_DEFAULT_REGION!,
    credentials: {
        accessKeyId: AWS_ACCESS_ID!,
        secretAccessKey: AWS_SECRET_KEY!,
    }
});
const mutations = {}
const queries = {
    getSignedUrlForPost: async (
        _: any,
        { imageType, imageName }: { imageType: string; imageName: string },
        ctx: GraphqlContext
    ) => {
        console.log(ctx.user);
        if (!ctx.user || !ctx.user.sub) return handleError("Unauthorized", "UNAUTHORIZED", 401);
        const allowedImageTypes = [
            "image/jpg",
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (!allowedImageTypes.includes(imageType))
            return handleError("Invalid image type", "BAD_REQUEST", 400);



        const putObjectCommand = new PutObjectCommand({
            Bucket: BUCKET_NAME!,
            ContentType: imageType,
            Key: `uploads/${ctx.user.sub}/posts/${imageName}-${Date.now()}`,
        });

        const signedURL = await getSignedUrl(s3Client, putObjectCommand);

        return signedURL;
    },

}

export const resolvers = {
    Mutation: mutations,
    Query: queries,
}