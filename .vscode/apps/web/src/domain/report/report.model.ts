import { User } from '../user'

import { PrivateMessage } from '../privateMessage'

export class Report {
  id: string

  reason: string

  timestamp: string

  reporterId: string

  reporter?: User

  reportedUserId: string

  reportedUser?: User

  reportedMessageId: string

  reportedMessage?: PrivateMessage

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
