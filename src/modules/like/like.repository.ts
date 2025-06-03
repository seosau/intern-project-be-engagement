import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Like } from "./entities/like.entity";

@Injectable()
export class LikeRepository extends Repository<Like> {
    constructor(private dataSource: DataSource){
        super(Like, dataSource.createEntityManager());
    }

    async createLike(postId: string, userId: string) {
        try{
            const like = this.create({postId, userId});
            const savedLike = await this.save(like);

            return savedLike
        } catch(err) {
            console.error('Create like error', err)
            throw err
        }
    }

    async deleteLike(postId: string, userId: string) {
        try{
            const like = await this.findOne({
                where: {
                    postId, 
                    userId
                }
            })
            if(!like) throw new Error('Like not found')

            const deleted = await this.softRemove(like)

            return deleted
        }catch (err) {
            console.error('Delete like error')
            throw err
        }
    }

    async countLike(postId: string) {
        try{
            const count = await this.count({
                where: {
                    postId
                }
            })

            return count
        } catch(err) {
            console.error('Count like error')
        }
    }

    async isLiked(postId: string, userId: string) {
        try {
            const like = await this.findOne({
                where: {
                    postId,
                    userId
                }
            })

            if(like) return true

            return false
        } catch(err) {
            console.log('Check is liked error', err)
            throw err
        }
    }
}