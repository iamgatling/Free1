import { GroupChat } from '../groupChat'

import { User } from '../user'

export class GroupChatMember {
  id: string

  groupChatId: string

  groupChat?: GroupChat

  userId: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
