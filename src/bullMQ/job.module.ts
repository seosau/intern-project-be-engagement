import { forwardRef, Module } from "@nestjs/common";
import { JobQueue } from "./job.queue";
import { JobProcessor } from "./job.processor";
import { LikeModule } from "../modules/like/like.module";

@Module({
    imports: [
        // forwardRef(() => PostModule),
        // forwardRef(() => StoryModule),
        // forwardRef(() => UserModule),
        forwardRef(() => LikeModule)
    ],
    providers: [JobQueue, JobProcessor],
    exports: [JobQueue]
})

export class JobModule {}