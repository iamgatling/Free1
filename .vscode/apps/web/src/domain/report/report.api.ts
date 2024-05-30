import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Report } from './report.model'

export class ReportApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Report>,
  ): Promise<Report[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/reports${buildOptions}`)
  }

  static findOne(
    reportId: string,
    queryOptions?: ApiHelper.QueryOptions<Report>,
  ): Promise<Report> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/reports/${reportId}${buildOptions}`)
  }

  static createOne(values: Partial<Report>): Promise<Report> {
    return HttpService.api.post(`/v1/reports`, values)
  }

  static updateOne(reportId: string, values: Partial<Report>): Promise<Report> {
    return HttpService.api.patch(`/v1/reports/${reportId}`, values)
  }

  static deleteOne(reportId: string): Promise<void> {
    return HttpService.api.delete(`/v1/reports/${reportId}`)
  }

  static findManyByReporterId(
    reporterId: string,
    queryOptions?: ApiHelper.QueryOptions<Report>,
  ): Promise<Report[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/reporter/${reporterId}/reports${buildOptions}`,
    )
  }

  static createOneByReporterId(
    reporterId: string,
    values: Partial<Report>,
  ): Promise<Report> {
    return HttpService.api.post(
      `/v1/users/reporter/${reporterId}/reports`,
      values,
    )
  }

  static findManyByReportedUserId(
    reportedUserId: string,
    queryOptions?: ApiHelper.QueryOptions<Report>,
  ): Promise<Report[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/reportedUser/${reportedUserId}/reports${buildOptions}`,
    )
  }

  static createOneByReportedUserId(
    reportedUserId: string,
    values: Partial<Report>,
  ): Promise<Report> {
    return HttpService.api.post(
      `/v1/users/reportedUser/${reportedUserId}/reports`,
      values,
    )
  }

  static findManyByReportedMessageId(
    reportedMessageId: string,
    queryOptions?: ApiHelper.QueryOptions<Report>,
  ): Promise<Report[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/privateMessages/reportedMessage/${reportedMessageId}/reports${buildOptions}`,
    )
  }

  static createOneByReportedMessageId(
    reportedMessageId: string,
    values: Partial<Report>,
  ): Promise<Report> {
    return HttpService.api.post(
      `/v1/privateMessages/reportedMessage/${reportedMessageId}/reports`,
      values,
    )
  }
}
