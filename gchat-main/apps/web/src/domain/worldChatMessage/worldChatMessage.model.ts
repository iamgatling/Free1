import { User } from '../user'

export class WorldChatMessage {
  id: string

  message: string

  timestamp: string

  userId: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
