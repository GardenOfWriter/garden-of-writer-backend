import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisClientOptions } from 'redis';
import { AttendListModule } from './apis/attend_list/attend_list.module';
import { AuthModule } from './apis/auth/auth.module';
import { BoardModule } from './apis/board/board.module';
import { CommentModule } from './apis/comment/comment.module';
import { FictionBoardModule } from './apis/fiction_board/fiction_board.module';
import { FollowModule } from './apis/follow/follow.module';
import { EmailModule } from './apis/mail/mail.module';
import { NestedCommentModule } from './apis/nested_comment/nested_comment.module';
import { PickModule } from './apis/pick/picks.module';
import { TagModule } from './apis/tag/tag.module';
import { UserModule } from './apis/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtAccessStrategy } from './commons/auth/jwt-access.strategy';
import { JwtRefreshStrategy } from './commons/auth/jwt-refresh.strategy';
import { JwtGoogleStrategy } from './commons/auth/jwt-social-google.strategy';
import { AppConfigModule } from './commons/config/app-config/app-config.module';
import { ExternalConfigModule } from './commons/config/external-config/external-config.module';
import { ExternalConfigService } from './commons/config/external-config/external-config.service';

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
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (externalConfigService: ExternalConfigService) => {
        return externalConfigService.createGqlOptions();
      },
      inject: [ExternalConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ExternalConfigModule],
      useFactory: (externalConfigService: ExternalConfigService) => {
        return externalConfigService.createTypeOrmOptions();
      },
      inject: [ExternalConfigService],
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ExternalConfigModule],
      useFactory: (externalConfigService: ExternalConfigService) => {
        return externalConfigService.createCacheOptions();
      },
      inject: [ExternalConfigService],
    }),
    AppConfigModule,
    ExternalConfigModule,
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
