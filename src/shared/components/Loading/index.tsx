import { Spin } from 'antd'

export const Loading = () => {
  return (
    <div className='flex flex-1 items-center justify-center'>
      <Spin size={'large'} />
    </div>
  )
}
