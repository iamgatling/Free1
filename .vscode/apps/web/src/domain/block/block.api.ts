import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Block } from './block.model'

export class BlockApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Block>,
  ): Promise<Block[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/blocks${buildOptions}`)
  }

  static findOne(
    blockId: string,
    queryOptions?: ApiHelper.QueryOptions<Block>,
  ): Promise<Block> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/blocks/${blockId}${buildOptions}`)
  }

  static createOne(values: Partial<Block>): Promise<Block> {
    return HttpService.api.post(`/v1/blocks`, values)
  }

  static updateOne(blockId: string, values: Partial<Block>): Promise<Block> {
    return HttpService.api.patch(`/v1/blocks/${blockId}`, values)
  }

  static deleteOne(blockId: string): Promise<void> {
    return HttpService.api.delete(`/v1/blocks/${blockId}`)
  }

  static findManyByBlockerId(
    blockerId: string,
    queryOptions?: ApiHelper.QueryOptions<Block>,
  ): Promise<Block[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/blocker/${blockerId}/blocks${buildOptions}`,
    )
  }

  static createOneByBlockerId(
    blockerId: string,
    values: Partial<Block>,
  ): Promise<Block> {
    return HttpService.api.post(`/v1/users/blocker/${blockerId}/blocks`, values)
  }

  static findManyByBlockedId(
    blockedId: string,
    queryOptions?: ApiHelper.QueryOptions<Block>,
  ): Promise<Block[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/blocked/${blockedId}/blocks${buildOptions}`,
    )
  }

  static createOneByBlockedId(
    blockedId: string,
    values: Partial<Block>,
  ): Promise<Block> {
    return HttpService.api.post(`/v1/users/blocked/${blockedId}/blocks`, values)
  }
}
