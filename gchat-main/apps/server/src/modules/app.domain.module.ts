import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { WorldChatMessageDomainModule } from './worldChatMessage/domain'

import { FriendRequestDomainModule } from './friendRequest/domain'

import { PrivateMessageDomainModule } from './privateMessage/domain'

import { ContactDomainModule } from './contact/domain'

import { BlockDomainModule } from './block/domain'

import { ReportDomainModule } from './report/domain'

import { GroupChatDomainModule } from './groupChat/domain'

import { GroupChatMemberDomainModule } from './groupChatMember/domain'

import { GroupChatMessageDomainModule } from './groupChatMessage/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

    WorldChatMessageDomainModule,

    FriendRequestDomainModule,

    PrivateMessageDomainModule,

    ContactDomainModule,

    BlockDomainModule,

    ReportDomainModule,

    GroupChatDomainModule,

    GroupChatMemberDomainModule,

    GroupChatMessageDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}
