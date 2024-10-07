import { Spin } from 'antd'

export function Loading(): React.ReactElement {
  return (
    <div className='flex flex-1 items-center justify-center'>
      <Spin size={'large'} />
    </div>
  )
}
