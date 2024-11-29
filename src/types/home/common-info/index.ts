export interface IHomeInfo {
  id: number
  videoSection: ITitleContent
  infoArray: Info[]
  styleArray: ITitleContent[]
  createOrderSection: ITitleContent
  createOrderImage: IFileProperties[]
  styleImage: IFileProperties[]
  video: IFileProperties[]
}

export interface Info extends ITitleContent {
  icon: string
}
