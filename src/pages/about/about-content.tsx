import * as React from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Form, FormProps, Input, Space, Upload } from 'antd'
import { Loading, RenderIf, ErrorMessage } from '~ek/shared/components'
import { NOTIFICATION } from '~ek/shared/const/constants'
import {
  beforeUploadHandler,
  createFormData,
  handleFileData,
  handleRemoveFile,
  notifier,
} from '~ek/shared/helpers'
import {
  useGetAboutQuery,
  usePostOrCreateAboutMutation,
} from '~ek/redux/api/about'
import { useFileRemoveMutation } from '~ek/redux/api/fileRemove'
import { RichTextEditor } from '~ek/shared/components/richtext'

interface IFieldForm {
  content: ILangContent
  title: ILangContent
  video?: IFile
  image: IFile
}

export function AboutContent(): React.ReactElement {
  const [image, setImage] = React.useState<IFile>({
    file: [],
    fileList: [],
  })
  const [video, setVideo] = React.useState<IFile>({
    file: [],
    fileList: [],
  })
  const [contentRichText, setContentRichText] = React.useState<ILangContent>({
    az: '',
    ru: '',
    en: '',
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
    handleFileData(data?.image as IFileProperties[], setImage)
    handleFileData(data?.video as IFileProperties[], setVideo)
    setContentRichText(() => ({
      az: data?.content.az as string,
      en: data?.content.en as string,
      ru: data?.content.ru as string,
    }))
  }, [data])

  const handleRichContent = (field: 'az' | 'ru' | 'en', content: string) => {
    setContentRichText(prevState => ({ ...prevState, [field]: content }))
  }

  const onFinish: FormProps<IFieldForm>['onFinish'] = async (
    values: IFieldForm,
  ) => {
    const formValues = {
      ...values,
      content: {
        az: contentRichText.az,
        en: contentRichText.en,
        ru: contentRichText.ru,
      },
      image: image.file,
      video: video.file,
    }
    const formData = createFormData(formValues)

    try {
      await postAbout(formData).unwrap()
      notifier('Dəyişiklik uğurla icra edildi.', NOTIFICATION.success)
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
      <RenderIf condition={!isError && !isLoading}>
        <Form
          name='about_form'
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          className='ml-auto mr-auto'
          initialValues={initialValues}
        >
          <Form.Item<IFieldForm>
            name='image'
            label='Banner Photo'
            valuePropName='image'
            rules={[
              {
                required: true,
                validator: () =>
                  image.fileList.length > 0
                    ? Promise.resolve()
                    : Promise.reject(
                      new Error('Zəhmət olmasa image fayl yükləyin!'),
                    ),
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
              beforeUpload={file => beforeUploadHandler(file, setImage)}
              fileList={image.fileList}
              onRemove={file => handleRemoveFile(deleteFile, file, setImage)}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item<IFieldForm>
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
              {
                required: true,
                message: 'Zəhmət olmasa boş saxlamayın',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<IFieldForm>
            label='Başlıq(ru)'
            name={['title', 'ru']}
            rules={[
              {
                required: true,
                message: 'Zəhmət olmasa boş saxlamayın',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<IFieldForm>
            name={['content', 'az']}
            label='Kontent (az)'
            rules={[
              {
                required: true,
                validator: () => {
                  return contentRichText.az.trim().length > 0
                    ? Promise.resolve()
                    : Promise.reject('Zəhmət olmasa mətn daxil edin(az)')
                },
              },
            ]}
          >
            <RichTextEditor
              onChangeValue={data => handleRichContent('az', data)}
              editorData={contentRichText.az}
            />
          </Form.Item>
          <Form.Item<IFieldForm>
            name={['content', 'en']}
            label='Kontent (en)'
            rules={[
              {
                required: true,
                validator: () => {
                  return contentRichText.en.trim().length > 0
                    ? Promise.resolve()
                    : Promise.reject('Zəhmət olmasa mətn daxil edin(en)')
                },
              },
            ]}
          >
            <RichTextEditor
              onChangeValue={data => handleRichContent('en', data)}
              editorData={contentRichText.en}
            />
          </Form.Item>
          <Form.Item<IFieldForm>
            name={['content', 'ru']}
            label='Kontent (ru)'
            rules={[
              {
                required: true,
                validator: () => {
                  return contentRichText.ru.trim().length > 0
                    ? Promise.resolve()
                    : Promise.reject('Zəhmət olmasa mətn daxil edin(ru)')
                },
              },
            ]}
          >
            <RichTextEditor
              onChangeValue={data => handleRichContent('ru', data)}
              editorData={contentRichText.ru}
            />
          </Form.Item>

          <Form.Item<IFieldForm>
            name='video'
            label='Upload Video'
            valuePropName='video'
          >
            <Upload
              name='video'
              accept='video/*'
              maxCount={1}
              listType='picture'
              beforeUpload={file => beforeUploadHandler(file, setVideo)}
              fileList={video.fileList}
              onRemove={file => handleRemoveFile(deleteFile, file, setVideo)}
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
      </RenderIf>
    </>
  )
}
