import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { GroupChat } from './groupChat.model'

export class GroupChatApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<GroupChat>,
  ): Promise<GroupChat[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/groupChats${buildOptions}`)
  }

  static findOne(
    groupChatId: string,
    queryOptions?: ApiHelper.QueryOptions<GroupChat>,
  ): Promise<GroupChat> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/groupChats/${groupChatId}${buildOptions}`)
  }

  static createOne(values: Partial<GroupChat>): Promise<GroupChat> {
    return HttpService.api.post(`/v1/groupChats`, values)
  }

  static updateOne(
    groupChatId: string,
    values: Partial<GroupChat>,
  ): Promise<GroupChat> {
    return HttpService.api.patch(`/v1/groupChats/${groupChatId}`, values)
  }

  static deleteOne(groupChatId: string): Promise<void> {
    return HttpService.api.delete(`/v1/groupChats/${groupChatId}`)
  }

  static findManyByCreatorId(
    creatorId: string,
    queryOptions?: ApiHelper.QueryOptions<GroupChat>,
  ): Promise<GroupChat[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/creator/${creatorId}/groupChats${buildOptions}`,
    )
  }

  static createOneByCreatorId(
    creatorId: string,
    values: Partial<GroupChat>,
  ): Promise<GroupChat> {
    return HttpService.api.post(
      `/v1/users/creator/${creatorId}/groupChats`,
      values,
    )
  }
}
