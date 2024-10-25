import { Empty } from 'antd'

export function NoData(): React.ReactElement {
  return (
    <div className='h-full flex justify-center items-center'>
      <Empty />
    </div>
  )
}
