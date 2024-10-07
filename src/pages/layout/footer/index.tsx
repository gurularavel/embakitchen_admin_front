const footerStyles: Readonly<TailwindStyle> = {
  wrapper: 'text-center bg-gray-200 p-4',
}

export function AppFooter(): React.ReactElement {
  return (
    <>
      <div className={footerStyles.wrapper}>
        Admin Panel ©{new Date().getFullYear()} Created by Embawood
      </div>
    </>
  )
}
