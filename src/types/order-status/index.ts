export interface IOrderStatus {
  id: number
  title: ILangContent
}

export type AddStatusForm = Pick<IOrderStatus, 'title'>

export type OrderStatusApiResponse = ApiResponse<IOrderStatus[]>
