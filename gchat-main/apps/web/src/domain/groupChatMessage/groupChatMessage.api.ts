import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { GroupChatMessage } from './groupChatMessage.model'

export class GroupChatMessageApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<GroupChatMessage>,
  ): Promise<GroupChatMessage[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/groupChatMessages${buildOptions}`)
  }

  static findOne(
    groupChatMessageId: string,
    queryOptions?: ApiHelper.QueryOptions<GroupChatMessage>,
  ): Promise<GroupChatMessage> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/groupChatMessages/${groupChatMessageId}${buildOptions}`,
    )
  }

  static createOne(
    values: Partial<GroupChatMessage>,
  ): Promise<GroupChatMessage> {
    return HttpService.api.post(`/v1/groupChatMessages`, values)
  }

  static updateOne(
    groupChatMessageId: string,
    values: Partial<GroupChatMessage>,
  ): Promise<GroupChatMessage> {
    return HttpService.api.patch(
      `/v1/groupChatMessages/${groupChatMessageId}`,
      values,
    )
  }

  static deleteOne(groupChatMessageId: string): Promise<void> {
    return HttpService.api.delete(`/v1/groupChatMessages/${groupChatMessageId}`)
  }

  static findManyByGroupChatId(
    groupChatId: string,
    queryOptions?: ApiHelper.QueryOptions<GroupChatMessage>,
  ): Promise<GroupChatMessage[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/groupChats/groupChat/${groupChatId}/groupChatMessages${buildOptions}`,
    )
  }

  static createOneByGroupChatId(
    groupChatId: string,
    values: Partial<GroupChatMessage>,
  ): Promise<GroupChatMessage> {
    return HttpService.api.post(
      `/v1/groupChats/groupChat/${groupChatId}/groupChatMessages`,
      values,
    )
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<GroupChatMessage>,
  ): Promise<GroupChatMessage[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/groupChatMessages${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<GroupChatMessage>,
  ): Promise<GroupChatMessage> {
    return HttpService.api.post(
      `/v1/users/user/${userId}/groupChatMessages`,
      values,
    )
  }
}
