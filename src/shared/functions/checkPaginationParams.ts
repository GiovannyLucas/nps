import { PaginationParams } from "../@types/pagination";

export function checkPaginationParams(params: PaginationParams) {
  if (!params) return { limit: 10, offset: 0 }

  const limit = Number(params.amount) || 10
  const offset = params.page && params.page > 0 ? Number(params.page) - 1 * limit : 0

  return { limit, offset }
}