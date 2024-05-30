import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { WorldChatMessage } from './worldChatMessage.model'

export class WorldChatMessageApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<WorldChatMessage>,
  ): Promise<WorldChatMessage[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/worldChatMessages${buildOptions}`)
  }

  static findOne(
    worldChatMessageId: string,
    queryOptions?: ApiHelper.QueryOptions<WorldChatMessage>,
  ): Promise<WorldChatMessage> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/worldChatMessages/${worldChatMessageId}${buildOptions}`,
    )
  }

  static createOne(
    values: Partial<WorldChatMessage>,
  ): Promise<WorldChatMessage> {
    return HttpService.api.post(`/v1/worldChatMessages`, values)
  }

  static updateOne(
    worldChatMessageId: string,
    values: Partial<WorldChatMessage>,
  ): Promise<WorldChatMessage> {
    return HttpService.api.patch(
      `/v1/worldChatMessages/${worldChatMessageId}`,
      values,
    )
  }

  static deleteOne(worldChatMessageId: string): Promise<void> {
    return HttpService.api.delete(`/v1/worldChatMessages/${worldChatMessageId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<WorldChatMessage>,
  ): Promise<WorldChatMessage[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/worldChatMessages${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<WorldChatMessage>,
  ): Promise<WorldChatMessage> {
    return HttpService.api.post(
      `/v1/users/user/${userId}/worldChatMessages`,
      values,
    )
  }
}
