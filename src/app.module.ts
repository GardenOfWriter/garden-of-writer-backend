import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendListModule } from '@src/apis/attend-list/attend-list.module';
import { AuthModule } from '@src/apis/auth/auth.module';
import { BoardModule } from '@src/apis/board/board.module';
import { CommentModule } from '@src/apis/comment/comment.module';
import { FictionBoardModule } from '@src/apis/fiction-board/fiction-board.module';
import { FollowModule } from '@src/apis/follow/follow.module';
import { EmailModule } from '@src/apis/mail/mail.module';
import { NestedCommentModule } from '@src/apis/nested-comment/nested-comment.module';
import { PickModule } from '@src/apis/pick/picks.module';
import { TagModule } from '@src/apis/tag/tag.module';
import { UserModule } from '@src/apis/user/user.module';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { JwtAccessStrategy } from '@src/commons/auth/jwt-access.strategy';
import { JwtRefreshStrategy } from '@src/commons/auth/jwt-refresh.strategy';
import { JwtGoogleStrategy } from '@src/commons/auth/jwt-social-google.strategy';
import { AppConfigModule } from '@src/commons/config/app-config/app-config.module';
import { ExternalConfigModule } from '@src/commons/config/external-config/external-config.module';
import { ExternalConfigService } from '@src/commons/config/external-config/external-config.service';
import { RedisClientOptions } from 'redis';

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
    AppConfigModule,
    ExternalConfigModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: ExternalConfigService,
    }),
    TypeOrmModule.forRootAsync({
      useClass: ExternalConfigService,
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      useClass: ExternalConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    JwtGoogleStrategy,
  ],
})
export class AppModule {}
