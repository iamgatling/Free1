import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { BillingApi } from './billing/billing.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { WorldChatMessageApi } from './worldChatMessage/worldChatMessage.api'

import { FriendRequestApi } from './friendRequest/friendRequest.api'

import { PrivateMessageApi } from './privateMessage/privateMessage.api'

import { ContactApi } from './contact/contact.api'

import { BlockApi } from './block/block.api'

import { ReportApi } from './report/report.api'

import { GroupChatApi } from './groupChat/groupChat.api'

import { GroupChatMemberApi } from './groupChatMember/groupChatMember.api'

import { GroupChatMessageApi } from './groupChatMessage/groupChatMessage.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Billing extends BillingApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class WorldChatMessage extends WorldChatMessageApi {}

  export class FriendRequest extends FriendRequestApi {}

  export class PrivateMessage extends PrivateMessageApi {}

  export class Contact extends ContactApi {}

  export class Block extends BlockApi {}

  export class Report extends ReportApi {}

  export class GroupChat extends GroupChatApi {}

  export class GroupChatMember extends GroupChatMemberApi {}

  export class GroupChatMessage extends GroupChatMessageApi {}
}
