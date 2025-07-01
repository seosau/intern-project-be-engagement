import { Injectable, OnModuleInit } from "@nestjs/common";
import { Worker } from "bullmq";
import { TOGGLE_LIKE } from "./job.constants";
import { LikeService } from "../modules/like/like.service";
import { JobQueue } from "./job.queue";


const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const url = new URL(redisUrl);
@Injectable()
export class JobProcessor implements OnModuleInit {
  private toggleLikeWorker: Worker

  constructor(
    private readonly likeService: LikeService,
    private readonly jobQueue: JobQueue,
  ) {}

  onModuleInit() {
    const connectionData = { 
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
        username: process.env.REDIS_USERNAME,
        tls: {},
        maxRetriesPerRequest: null,
      }
    this.toggleLikeWorker = new Worker(
      TOGGLE_LIKE,
      async (job) => {
        try {
          console.log('Start Processing job in like service: ', job.name, job.data);
          const ms = Date.now();
          const { postId, userId } = job.data;
          const isLiked = await this.likeService.isLiked(postId, userId)
          if(isLiked) {
            await this.likeService.remove(postId, userId)
            const count = await this.likeService.countLike(postId)
            if (typeof(count) === 'number') this.jobQueue.addLikeCountJob(postId, userId, count)
          } else {
            await this.likeService.create(postId, userId)
            const count = await this.likeService.countLike(postId)
            if (typeof(count) === 'number') this.jobQueue.addLikeCountJob(postId, userId, count)
          }
          console.log('Processed job in like service in: ', Date.now() - ms, ' ms');
        } catch (error) {
          console.error('Error processing resize job in like service:', error);
          throw error
        }
      },
      { connection: connectionData}
    );
  }
}