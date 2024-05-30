import { User } from '../user'

import { GroupChatMember } from '../groupChatMember'

import { GroupChatMessage } from '../groupChatMessage'

export class GroupChat {
  id: string

  name: string

  timestamp: string

  creatorId: string

  creator?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  groupChatMembers?: GroupChatMember[]

  groupChatMessages?: GroupChatMessage[]
}
