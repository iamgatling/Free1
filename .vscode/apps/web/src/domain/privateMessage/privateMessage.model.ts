import { User } from '../user'

import { Report } from '../report'

export class PrivateMessage {
  id: string

  message: string

  timestamp: string

  isDeleted: boolean

  senderId: string

  sender?: User

  receiverId: string

  receiver?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  reportsAsReportedMessage?: Report[]
}
