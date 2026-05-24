export const metadata = {
  title: 'Sanity Studio',
  description: 'The admin dashboard for Signet content',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
