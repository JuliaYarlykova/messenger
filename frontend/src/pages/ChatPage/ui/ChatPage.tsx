import { ChatPart } from '@/features/Chating'
import { Page } from '@/widgets/Page'
import { useParams } from 'react-router-dom'

export const ChatPage = () => {
  const { id } = useParams<{ id: string }>()
  if (!id) return
  return (
    <Page>
      {' '}
      <ChatPart id={id} />{' '}
    </Page>
  )
}
