import { Spin } from 'antd'

const Loading = () => {
  return (
    <div className='flex flex-1 items-center justify-center'>
      <Spin size={'large'} />
    </div>
  )
}

export default Loading
