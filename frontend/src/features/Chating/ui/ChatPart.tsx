import { Button, Input } from '@/shared/ui'
import cls from './ChatPart.module.scss'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import useWebSocket from 'react-use-websocket'
import { getConnectionStatus } from '@/shared/const/websocket'

interface Message {
  Id: string
  Text: string
  SenderId: string
  ChatId: string
  Time: string
}

export const ChatPart = ({ id }: { id: string }) => {
  const [socketUrl, setSocketUrl] = useState(`ws://example.com/chat/${id}`)
  const [messageHistory, setMessageHistory] = useState<
    MessageEvent<Message[]>[]
  >([])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messageHistory])

  useEffect(() => {
    if (lastMessage !== null) {
      console.log(lastMessage)
      setMessageHistory((prev) => prev.concat(lastMessage))
    }
  }, [lastMessage])

  useEffect(() => {
    setSocketUrl(`ws://example.com/chat/${id}`)
  }, [])

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value)
    },
    [],
  )

  const handleClickSendMessage = useCallback(() => {
    if (inputValue.trim()) {
      sendMessage(inputValue)
      setInputValue('')
    }
  }, [sendMessage, inputValue])

  return (
    <section className={cls.section}>
      <span>The WebSocket is currently {getConnectionStatus(readyState)}</span>
      <div className={cls.messagesContainer} ref={messagesEndRef}>
        <ul>
          {messageHistory.map(
            (message, idx) =>
              message &&
              message.data.map((data) => (
                <li key={data.Id} className={cls.message}>
                  {data.Text}
                </li>
              )),
          )}
        </ul>
      </div>
      <div className={cls.wrapper}>
        <Input
          placeholder="Message"
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button variant="round" onClick={handleClickSendMessage}>
          <span className="material-symbols-outlined">send</span>
        </Button>
      </div>
    </section>
  )
}
