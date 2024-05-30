import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { GroupChatMember } from './groupChatMember.model'

export class GroupChatMemberApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<GroupChatMember>,
  ): Promise<GroupChatMember[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/groupChatMembers${buildOptions}`)
  }

  static findOne(
    groupChatMemberId: string,
    queryOptions?: ApiHelper.QueryOptions<GroupChatMember>,
  ): Promise<GroupChatMember> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/groupChatMembers/${groupChatMemberId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<GroupChatMember>): Promise<GroupChatMember> {
    return HttpService.api.post(`/v1/groupChatMembers`, values)
  }

  static updateOne(
    groupChatMemberId: string,
    values: Partial<GroupChatMember>,
  ): Promise<GroupChatMember> {
    return HttpService.api.patch(
      `/v1/groupChatMembers/${groupChatMemberId}`,
      values,
    )
  }

  static deleteOne(groupChatMemberId: string): Promise<void> {
    return HttpService.api.delete(`/v1/groupChatMembers/${groupChatMemberId}`)
  }

  static findManyByGroupChatId(
    groupChatId: string,
    queryOptions?: ApiHelper.QueryOptions<GroupChatMember>,
  ): Promise<GroupChatMember[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/groupChats/groupChat/${groupChatId}/groupChatMembers${buildOptions}`,
    )
  }

  static createOneByGroupChatId(
    groupChatId: string,
    values: Partial<GroupChatMember>,
  ): Promise<GroupChatMember> {
    return HttpService.api.post(
      `/v1/groupChats/groupChat/${groupChatId}/groupChatMembers`,
      values,
    )
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<GroupChatMember>,
  ): Promise<GroupChatMember[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/groupChatMembers${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<GroupChatMember>,
  ): Promise<GroupChatMember> {
    return HttpService.api.post(
      `/v1/users/user/${userId}/groupChatMembers`,
      values,
    )
  }
}
