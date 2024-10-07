import { Button, ConfigProvider, Form, Input } from 'antd'
import { useGetTokenMutation } from '~ek/redux/api/auth'
import { ILogin } from '~ek/types/auth'

export function Login(): React.ReactElement {
  const [form] = Form.useForm()
  const [loginUser, { isLoading }] = useGetTokenMutation()

  const handleSubmit = (data: ILogin) => {
    const sendData = { ...data, role: 'admin' }
    loginUser(sendData)
  }

  return (
    <div className='flex flex-col lg:flex-row min-h-screen'>
      <div className='flex justify-end w-full lg:w-2/5 lg:flex-initial flex-auto bg-login bg-left bg-no-repeat p-10'>
        <div className='hidden lg:flex justify-end items-end mt-10'>
          <div className='opacity-70 font-bold text-white text-sm'>
            ©<span className='font-bold mr-2'>{new Date().getFullYear()}</span>
            Created by Embawood
          </div>
        </div>
      </div>
      <div className='flex flex-col flex-auto justify-center items-center p-10 bg-white'>
        <div className='flex flex-col justify-center items-center w-full lg:w-1/2'>
          <div className='mb-10 lg:mb-10 text-center w-full'>
            <h3 className='font-bold text-3xl mb-2'>Login Account</h3>
          </div>
          <Form
            name='login'
            form={form}
            onFinish={handleSubmit}
            initialValues={{ remember: true }}
            autoComplete='off'
            style={{ maxWidth: 350, width: '100%' }}
          >
            <Form.Item
              name='email'
              rules={[
                { required: true, message: 'Please enter your username!' },
              ]}
            >
              <Input placeholder='E-mail' />
            </Form.Item>

            <Form.Item
              name='password'
              rules={[
                { required: true, message: 'Please enter your password!' },
              ]}
            >
              <Input.Password placeholder='Password' />
            </Form.Item>

            <Form.Item>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#E55E25',
                  },
                }}
              >
                <Button
                  type='primary'
                  htmlType='submit'
                  disabled={isLoading}
                  className='w-full'
                >
                  Submit
                </Button>
              </ConfigProvider>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
