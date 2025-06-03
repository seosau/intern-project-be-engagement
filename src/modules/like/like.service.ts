import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { LikeRepository } from './like.repository';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeRepo: LikeRepository,
  ){}

  create(postId: string, userId: string) {
    return this.likeRepo.createLike(postId, userId);
  }

  remove(postId: string, userId: string) {
    return this.likeRepo.deleteLike(postId, userId);
  }

  countLike(postId: string) {
    return this.likeRepo.countLike(postId);
  }

  isLiked(postId: string, userId: string) {
    return this.likeRepo.isLiked(postId, userId);
  }
}
