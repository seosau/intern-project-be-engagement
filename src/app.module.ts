import { Module } from '@nestjs/common';
import { LikeModule } from './modules/like/like.module';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmAsyncConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    LikeModule,
    BullModule.forRootAsync({
      inject:[ConfigService],
      useFactory: async(config: ConfigService) => {
        const connectData = {
          host: config.get<string>('REDIS_HOST'),
          port: config.get<number>('REDIS_PORT'),
          password: config.get<string>('REDIS_PASSWORD'),
          username: config.get<string>('REDIS_USERNAME'),
          tls: {},
          maxRetriesPerRequest: 1000000,
        }
        console.log(connectData)
        return {
          connection: connectData
        }
      }
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
