import { User } from '../user'

export class Contact {
  id: string

  userId: string

  user?: User

  contactId: string

  contact?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
