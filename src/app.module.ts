import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisClientOptions } from 'redis';
import { BoardModule } from './apis/board/board.module';
import { CommentModule } from './apis/comment/comment.module';
import { FictionBoardModule } from './apis/fiction_board/fiction_board.module';
import { NestedCommentModule } from './apis/nested_comment/nested_comment.module';
import { UserModule } from './apis/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtAccessStrategy } from './commons/auth/jwt-access.strategy';
import { JwtRefreshStrategy } from './commons/auth/jwt-refresh.strategy';
import { EmailModule } from './apis/mail/mail.module';
import * as redisStore from 'cache-manager-redis-store';
import { FollowModule } from './apis/follow/follow.module';
import { TagModule } from './apis/tag/tag.module';
import { AttendListModule } from './apis/attend_list/attend_list.module';
import { AuthModule } from './apis/auth/auth.module';
import { PickModule } from './apis/pick/picks.module';
import { JwtGoogleStrategy } from './commons/auth/jwt-social-google.strategy';

@Module({
  imports: [
    AttendListModule,
    AuthModule,
    BoardModule,
    CommentModule,
    FictionBoardModule,
    FollowModule,
    EmailModule,
    NestedCommentModule,
    PickModule,
    TagModule,
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/common/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'],
      timezone: '-09:00',
      synchronize: true,
      logging: true,
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: 'redis://my-redis:6379',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    //
    AppService,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    JwtGoogleStrategy,
  ],
})
export class AppModule {}
