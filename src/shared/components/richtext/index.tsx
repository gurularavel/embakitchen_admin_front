import { CKEditor } from '@ckeditor/ckeditor5-react'
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Paragraph,
  Undo,
  Alignment,
  Heading,
  BlockQuote,
  List,
  Link,
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Base64UploadAdapter,
} from 'ckeditor5'
import 'ckeditor5/ckeditor5.css'
import '~ek/assets/css/ckeditor.css'

interface RichTextProps {
  editorData: string
  onChangeValue: (text: string) => void
}

export function RichTextEditor({
  editorData = '<h1>Heading 1</h1><p>Sample paragraph text here.</p>',
  onChangeValue,
}: RichTextProps) {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={editorData}
      config={{
        plugins: [
          Bold,
          Essentials,
          Italic,
          Paragraph,
          Undo,
          Alignment,
          Heading,
          BlockQuote,
          List,
          Link,
          Image,
          ImageCaption,
          ImageResize,
          ImageStyle,
          ImageToolbar,
          ImageUpload,
          Base64UploadAdapter,
        ],
        toolbar: [
          'heading',
          '|',
          'bold',
          'italic',
          '|',
          'alignment',
          '|',
          'blockQuote',
          '|',
          'bulletedList',
          'numberedList',
          '|',
          'link',
          'uploadImage',
          '|',
          'undo',
          'redo',
        ],
        heading: {
          options: [
            {
              model: 'paragraph',
              title: 'Paragraph',
              class: 'ck-heading_paragraph',
            },
            {
              model: 'heading1',
              view: 'h1',
              title: 'Heading 1',
              class: 'ck-heading_heading1',
            },
            {
              model: 'heading2',
              view: 'h2',
              title: 'Heading 2',
              class: 'ck-heading_heading2',
            },
            {
              model: 'heading3',
              view: 'h3',
              title: 'Heading 3',
              class: 'ck-heading_heading3',
            },
            {
              model: 'heading4',
              view: 'h4',
              title: 'Heading 4',
              class: 'ck-heading_heading4',
            },
          ],
        },
        image: {
          resizeOptions: [
            {
              name: 'resizeImage:original',
              label: 'Default image width',
              value: null,
            },
            {
              name: 'resizeImage:50',
              label: '50% page width',
              value: '50',
            },
            {
              name: 'resizeImage:75',
              label: '75% page width',
              value: '75',
            },
          ],
          toolbar: [
            'imageTextAlternative',
            'toggleImageCaption',
            '|',
            'imageStyle:inline',
            'imageStyle:wrapText',
            'imageStyle:breakText',
            '|',
            'resizeImage',
          ],
        },
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: 'https://',
        },
        alignment: {
          options: ['left', 'center', 'right', 'justify'],
        },
      }}
      onChange={(_, editor: ClassicEditor) => {
        const data = editor.getData()
        onChangeValue(data)
      }}
    />
  )
}
