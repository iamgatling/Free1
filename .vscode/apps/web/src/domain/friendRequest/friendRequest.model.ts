import { User } from '../user'

export class FriendRequest {
  id: string

  status: string

  timestamp: string

  senderId: string

  sender?: User

  receiverId: string

  receiver?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
