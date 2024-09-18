const footerStyles: Readonly<TailwindStyle> = {
  wrapper: 'text-center bg-gray-200 p-4',
}

export const Footer: React.FC = () => {
  return (
    <>
      <div className={footerStyles.wrapper}>
        Admin Panel ©{new Date().getFullYear()} Created by Embawood
      </div>
    </>
  )
}
