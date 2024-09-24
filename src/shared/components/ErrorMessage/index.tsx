import * as React from 'react'
import { Alert, Button } from 'antd'
import { FrownOutlined } from '@ant-design/icons'

interface ErrorMessageProps {
  message: string
  description?: string
  onRetry?: () => void
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  description,
  onRetry,
}) => {
  return (
    <div className='text-center p-5'>
      <Alert
        message={message}
        description={description}
        type='error'
        showIcon
        icon={<FrownOutlined />}
        className='mb-5'
      />
      {onRetry && (
        <Button
          type='primary'
          onClick={onRetry}
        >
          Əsas səhifəyə qayıt
        </Button>
      )}
    </div>
  )
}
