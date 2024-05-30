import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { FriendRequest } from './friendRequest.model'

export class FriendRequestApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<FriendRequest>,
  ): Promise<FriendRequest[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/friendRequests${buildOptions}`)
  }

  static findOne(
    friendRequestId: string,
    queryOptions?: ApiHelper.QueryOptions<FriendRequest>,
  ): Promise<FriendRequest> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/friendRequests/${friendRequestId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<FriendRequest>): Promise<FriendRequest> {
    return HttpService.api.post(`/v1/friendRequests`, values)
  }

  static updateOne(
    friendRequestId: string,
    values: Partial<FriendRequest>,
  ): Promise<FriendRequest> {
    return HttpService.api.patch(
      `/v1/friendRequests/${friendRequestId}`,
      values,
    )
  }

  static deleteOne(friendRequestId: string): Promise<void> {
    return HttpService.api.delete(`/v1/friendRequests/${friendRequestId}`)
  }

  static findManyBySenderId(
    senderId: string,
    queryOptions?: ApiHelper.QueryOptions<FriendRequest>,
  ): Promise<FriendRequest[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/sender/${senderId}/friendRequests${buildOptions}`,
    )
  }

  static createOneBySenderId(
    senderId: string,
    values: Partial<FriendRequest>,
  ): Promise<FriendRequest> {
    return HttpService.api.post(
      `/v1/users/sender/${senderId}/friendRequests`,
      values,
    )
  }

  static findManyByReceiverId(
    receiverId: string,
    queryOptions?: ApiHelper.QueryOptions<FriendRequest>,
  ): Promise<FriendRequest[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/receiver/${receiverId}/friendRequests${buildOptions}`,
    )
  }

  static createOneByReceiverId(
    receiverId: string,
    values: Partial<FriendRequest>,
  ): Promise<FriendRequest> {
    return HttpService.api.post(
      `/v1/users/receiver/${receiverId}/friendRequests`,
      values,
    )
  }
}
