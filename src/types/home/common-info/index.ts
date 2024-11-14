export interface IGetHomeInfo {
  homePage: {
    id: number
    title: ILangContent
    videoSection: ITitleContent
    infoArray: Info[]
    styleArray: ITitleContent[]
    createOrderSection: ITitleContent
    createOrderImage: IFileProperties[]
    styleImage: IFileProperties[]
    video: IFileProperties[]
  }
}

interface Info extends ITitleContent {
  icon: IFileProperties
}
