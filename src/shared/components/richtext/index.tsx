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
} from 'ckeditor5'
import 'ckeditor5/ckeditor5.css'
import 'ckeditor5-premium-features/ckeditor5-premium-features.css'

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
        alignment: {
          options: ['left', 'center', 'right', 'justify'],
        },
      }}
      onChange={(_, editor) => {
        const data = editor.getData()
        onChangeValue(data)
      }}
    />
  )
}
