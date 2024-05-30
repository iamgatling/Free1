import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'
import {
  BillingPayment as BillingPaymentModel,
  BillingProduct as BillingProductModel,
  BillingSubscription as BillingSubscriptionModel,
} from './billing/billing.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { WorldChatMessage as WorldChatMessageModel } from './worldChatMessage/worldChatMessage.model'

import { FriendRequest as FriendRequestModel } from './friendRequest/friendRequest.model'

import { PrivateMessage as PrivateMessageModel } from './privateMessage/privateMessage.model'

import { Contact as ContactModel } from './contact/contact.model'

import { Block as BlockModel } from './block/block.model'

import { Report as ReportModel } from './report/report.model'

import { GroupChat as GroupChatModel } from './groupChat/groupChat.model'

import { GroupChatMember as GroupChatMemberModel } from './groupChatMember/groupChatMember.model'

import { GroupChatMessage as GroupChatMessageModel } from './groupChatMessage/groupChatMessage.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}
  export class BillingProduct extends BillingProductModel {}
  export class BillingPayment extends BillingPaymentModel {}
  export class BillingSubscription extends BillingSubscriptionModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class WorldChatMessage extends WorldChatMessageModel {}

  export class FriendRequest extends FriendRequestModel {}

  export class PrivateMessage extends PrivateMessageModel {}

  export class Contact extends ContactModel {}

  export class Block extends BlockModel {}

  export class Report extends ReportModel {}

  export class GroupChat extends GroupChatModel {}

  export class GroupChatMember extends GroupChatMemberModel {}

  export class GroupChatMessage extends GroupChatMessageModel {}
}
