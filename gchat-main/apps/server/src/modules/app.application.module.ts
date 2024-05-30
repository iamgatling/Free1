import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { WorldChatMessageApplicationModule } from './worldChatMessage/application'

import { FriendRequestApplicationModule } from './friendRequest/application'

import { PrivateMessageApplicationModule } from './privateMessage/application'

import { ContactApplicationModule } from './contact/application'

import { BlockApplicationModule } from './block/application'

import { ReportApplicationModule } from './report/application'

import { GroupChatApplicationModule } from './groupChat/application'

import { GroupChatMemberApplicationModule } from './groupChatMember/application'

import { GroupChatMessageApplicationModule } from './groupChatMessage/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { BillingApplicationModule } from './billing/application'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,
    BillingApplicationModule,

    WorldChatMessageApplicationModule,

    FriendRequestApplicationModule,

    PrivateMessageApplicationModule,

    ContactApplicationModule,

    BlockApplicationModule,

    ReportApplicationModule,

    GroupChatApplicationModule,

    GroupChatMemberApplicationModule,

    GroupChatMessageApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}
