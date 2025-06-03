import { forwardRef, Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeRepository } from './like.repository';
import { JobModule } from '../../bullMQ/job.module';
// import { LikeController } from './like.controller';

@Module({
  imports:[
    forwardRef(() => JobModule)
  ],
  // controllers: [LikeController],
  providers: [LikeService, LikeRepository],
  exports: [LikeService, LikeRepository]
})
export class LikeModule {}
