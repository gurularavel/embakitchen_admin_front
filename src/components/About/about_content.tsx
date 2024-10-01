import * as React from 'react'
import { UploadOutlined } from '@ant-design/icons'
import {
  Button,
  Form,
  Input,
  Space,
  Upload,
  UploadFile,
  message,
  notification,
} from 'antd'
import {
  useGetAboutQuery,
  usePostOrCreateAboutMutation,
} from '~ek/redux/api/about'
import { Loading, RenderIf, ErrorMessage } from '~ek/shared/components'
import { confirmModal } from '~ek/shared/helpers'
import { useFileRemoveMutation } from '~ek/redux/api/fileRemove'

interface IFile {
  file: File | null
  fileList: UploadFile[]
}

interface IForm {
  content: ILangContent
  title: ILangContent
  video: IFile
  image: IFile
}

export const About_Content: React.FC = () => {
  const [image, setImage] = React.useState<IFile>({
    file: null,
    fileList: [],
  })
  const [video, setVideo] = React.useState<IFile>({
    file: null,
    fileList: [],
  })

  const { data, isLoading, isError } = useGetAboutQuery()
  const [postAbout, { isLoading: postLoading }] = usePostOrCreateAboutMutation()
  const [deleteFile] = useFileRemoveMutation()

  const initialValues = data
    ? {
      title: {
        az: data.title.az,
        en: data.title.en,
        ru: data.title.ru,
      },
      content: {
        az: data.content.az,
        en: data.content.en,
        ru: data.content.ru,
      },
    }
    : {}

  React.useEffect(() => {
    if (data?.image && typeof data.image === 'object') {
      const imageKeys = Object.keys(data.image)
      if (imageKeys.length > 0) {
        const firstImageKey = imageKeys[0]
        const imageData = data.image[firstImageKey]

        setImage({
          file: null,
          fileList: [
            {
              uid: imageData.uuid,
              name: imageData.file_name,
              status: 'done',
              url: imageData.original_url,
            },
          ],
        })
      }
    }

    if (data?.video && typeof data.video === 'object') {
      const videoKeys = Object.keys(data.video)
      if (videoKeys.length > 0) {
        const firstVideoKey = videoKeys[0]
        const videoData = data.video[firstVideoKey]

        setVideo({
          file: null,
          fileList: [
            {
              uid: videoData.uuid,
              name: videoData.file_name,
              status: 'done',
              url: videoData.original_url,
            },
          ],
        })
      }
    }
  }, [data])

  const beforeUpload = (file: File, type: string) => {
    if (type === 'image') {
      setImage({
        file,
        fileList: [{ uid: file.name, name: file.name, status: 'done' }],
      })
    } else {
      setVideo({
        file,
        fileList: [{ uid: file.name, name: file.name, status: 'done' }],
      })
    }
    return false
  }

  const handleRemoveFile = async (file: UploadFile, type: string) => {
    confirmModal({
      title: 'Bu faylı silmək istədiyinizdən əminsiniz?',
      onOk: () => {
        deleteFile({
          mediaIDS: [file.uid],
        }).then(() => {
          if (type === 'video') {
            setVideo({ file: null, fileList: [] })
          } else if (type === 'image') {
            setImage({ file: null, fileList: [] })
          }
        })
      },
      onCancel: () => {},
    })
  }

  const onFinish = async (values: IForm) => {
    if (video.file?.size === 0 || !video.fileList.length) {
      message.error('Please select video first!')
      return
    }

    if (image.file?.size === 0 || !image.fileList.length) {
      message.error('Please select image first!')
      return
    }

    const formData = new FormData()
    formData.append('title[az]', values.title.az)
    formData.append('title[en]', values.title.en)
    formData.append('title[ru]', values.title.ru)

    formData.append('content[az]', values.content.az)
    formData.append('content[en]', values.content.en)
    formData.append('content[ru]', values.content.ru)
    if (video.file) formData.append('video', video.file)
    if (image.file) formData.append('image', image.file)

    try {
      await postAbout(formData).unwrap()
      notification.success({
        message: 'Dəyişiklik uğurla icra edildi',
        placement: 'topRight',
        duration: 2,
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <RenderIf condition={isError}>
        <ErrorMessage message='Məlumatların yüklənməsində xəta baş verdi' />
      </RenderIf>
      <RenderIf condition={isLoading}>
        <Loading />
      </RenderIf>
      {!isError && !isLoading && (
        <Form
          name='about_form'
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          className='ml-auto mr-auto'
          initialValues={initialValues}
        >
          <Form.Item
            name='image'
            label='Banner Photo'
            valuePropName='image'
            rules={[
              {
                required: true,
                validator: () =>
                  image.fileList.length > 0
                    ? Promise.resolve()
                    : Promise.reject(new Error('Please upload a image file!')),
              },
            ]}
            getValueFromEvent={e => {
              return e?.fileList
            }}
          >
            <Upload
              name='image'
              accept='image/*'
              maxCount={1}
              listType='picture'
              beforeUpload={file => beforeUpload(file, 'image')}
              fileList={image.fileList}
              onRemove={file => handleRemoveFile(file, 'image')}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label='Başlıq(az)'
            name={['title', 'az']}
            rules={[
              { required: true, message: 'Zəhmət olmasa boş saxlamayın' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Başlıq(en)'
            name={['title', 'en']}
            rules={[
              { required: true, message: 'Zəhmət olmasa boş saxlamayın' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Başlıq(ru)'
            name={['title', 'ru']}
            rules={[
              { required: true, message: 'Zəhmət olmasa boş saxlamayın' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={['content', 'az']}
            label='Kontent(az)'
            rules={[
              { required: true, message: 'Zəhmət olmasa boş saxlamayın' },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name={['content', 'en']}
            label='Kontent(en)'
            rules={[
              { required: true, message: 'Zəhmət olmasa boş saxlamayın' },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name={['content', 'ru']}
            label='Kontent(ru)'
            rules={[
              { required: true, message: 'Zəhmət olmasa boş saxlamayın' },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name='video'
            label='Upload Video'
            valuePropName='video'
            rules={[
              {
                required: true,
                validator: () =>
                  video.fileList.length > 0
                    ? Promise.resolve()
                    : Promise.reject(new Error('Please upload a video file!')),
              },
            ]}
          >
            <Upload
              name='video'
              accept='video/*'
              maxCount={1}
              listType='picture'
              beforeUpload={file => beforeUpload(file, 'video')}
              fileList={video.fileList}
              onRemove={file => handleRemoveFile(file, 'video')}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Space>
              <Button
                disabled={postLoading}
                type='primary'
                htmlType='submit'
              >
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      )}
    </>
  )
}
