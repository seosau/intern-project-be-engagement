import { ConfigModule, ConfigService } from '@nestjs/config';
import { SharedBullAsyncConfiguration } from '@nestjs/bullmq';

export const bullMQConfig: SharedBullAsyncConfiguration = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => {
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
}