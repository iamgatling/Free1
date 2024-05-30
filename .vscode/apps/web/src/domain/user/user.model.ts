import { Notification } from '../notification'

import { WorldChatMessage } from '../worldChatMessage'

import { FriendRequest } from '../friendRequest'

import { PrivateMessage } from '../privateMessage'

import { Contact } from '../contact'

import { Block } from '../block'

import { Report } from '../report'

import { GroupChat } from '../groupChat'

import { GroupChatMember } from '../groupChatMember'

import { GroupChatMessage } from '../groupChatMessage'

export enum UserStatus {
  CREATED = 'CREATED',
  VERIFIED = 'VERIFIED',
}
export class User {
  id: string
  email?: string
  status: UserStatus
  name?: string
  pictureUrl?: string
  password?: string
  dateCreated: string
  dateUpdated: string
  notifications?: Notification[]

  worldChatMessages?: WorldChatMessage[]

  friendRequestsAsSender?: FriendRequest[]

  friendRequestsAsReceiver?: FriendRequest[]

  privateMessagesAsSender?: PrivateMessage[]

  privateMessagesAsReceiver?: PrivateMessage[]

  contacts?: Contact[]

  contactsAsContact?: Contact[]

  blocksAsBlocker?: Block[]

  blocksAsBlocked?: Block[]

  reportsAsReporter?: Report[]

  reportsAsReportedUser?: Report[]

  groupChatsAsCreator?: GroupChat[]

  groupChatMembers?: GroupChatMember[]

  groupChatMessages?: GroupChatMessage[]
}
