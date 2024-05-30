import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { PrivateMessage } from './privateMessage.model'

export class PrivateMessageApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<PrivateMessage>,
  ): Promise<PrivateMessage[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/privateMessages${buildOptions}`)
  }

  static findOne(
    privateMessageId: string,
    queryOptions?: ApiHelper.QueryOptions<PrivateMessage>,
  ): Promise<PrivateMessage> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/privateMessages/${privateMessageId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<PrivateMessage>): Promise<PrivateMessage> {
    return HttpService.api.post(`/v1/privateMessages`, values)
  }

  static updateOne(
    privateMessageId: string,
    values: Partial<PrivateMessage>,
  ): Promise<PrivateMessage> {
    return HttpService.api.patch(
      `/v1/privateMessages/${privateMessageId}`,
      values,
    )
  }

  static deleteOne(privateMessageId: string): Promise<void> {
    return HttpService.api.delete(`/v1/privateMessages/${privateMessageId}`)
  }

  static findManyBySenderId(
    senderId: string,
    queryOptions?: ApiHelper.QueryOptions<PrivateMessage>,
  ): Promise<PrivateMessage[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/sender/${senderId}/privateMessages${buildOptions}`,
    )
  }

  static createOneBySenderId(
    senderId: string,
    values: Partial<PrivateMessage>,
  ): Promise<PrivateMessage> {
    return HttpService.api.post(
      `/v1/users/sender/${senderId}/privateMessages`,
      values,
    )
  }

  static findManyByReceiverId(
    receiverId: string,
    queryOptions?: ApiHelper.QueryOptions<PrivateMessage>,
  ): Promise<PrivateMessage[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/receiver/${receiverId}/privateMessages${buildOptions}`,
    )
  }

  static createOneByReceiverId(
    receiverId: string,
    values: Partial<PrivateMessage>,
  ): Promise<PrivateMessage> {
    return HttpService.api.post(
      `/v1/users/receiver/${receiverId}/privateMessages`,
      values,
    )
  }
}
