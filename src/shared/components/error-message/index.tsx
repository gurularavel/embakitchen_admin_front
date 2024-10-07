import * as React from 'react'
import { Alert, Button } from 'antd'
import { FrownOutlined } from '@ant-design/icons'

interface ErrorMessageProps {
  message: string
  description?: string
  onRetry?: () => void
}

export function ErrorMessage({
  message,
  description,
  onRetry,
}: ErrorMessageProps): React.ReactElement {
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
