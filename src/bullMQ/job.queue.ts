import { Injectable } from "@nestjs/common";
import { Queue } from "bullmq";
import { LIKE_COUNT } from "./job.constants";

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const url = new URL(redisUrl);

@Injectable()
export class JobQueue {
    public readonly likeCountQueue: Queue

    constructor() {
        const connectionData = {
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
            password: process.env.REDIS_PASSWORD,
            username: process.env.REDIS_USERNAME,
            tls: {},
            maxRetriesPerRequest: null,
        }
        this.likeCountQueue = new Queue(LIKE_COUNT, {
            connection: connectionData,
        })
    }

    async addLikeCountJob(postId: string, count: Number) {
        const resq = await this.likeCountQueue.add(LIKE_COUNT, {postId, count})
    }
}