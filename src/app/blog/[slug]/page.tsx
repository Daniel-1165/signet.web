import {notFound} from 'next/navigation'

interface PostPageProps {
  params: Promise<{slug: string}>
}

export default async function PostPage({params}: PostPageProps) {
  notFound()
}
