import { User } from '../user'

export class Block {
  id: string

  blockerId: string

  blocker?: User

  blockedId: string

  blocked?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
