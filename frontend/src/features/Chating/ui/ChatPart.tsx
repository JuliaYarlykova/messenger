import { Button, Input } from '@/shared/ui'

import cls from './ChatPart.module.scss'
import { useCallback, useEffect, useRef, useState } from 'react'
import useWebSocket from 'react-use-websocket'
import { getConnectionStatus } from '@/shared/const/websocket'

export const ChatPart = () => {
  const [socketUrl] = useState(__SOCKETURL__)
  const [messageHistory, setMessageHistory] = useState<MessageEvent<string>[]>(
    [],
  )

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl)

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage))
    }
  }, [lastMessage])

  const ref = useRef<HTMLInputElement>(null)

  const handleClickSendMessage = useCallback(
    () => ref.current && sendMessage(ref.current.value),
    [sendMessage],
  )

  return (
    <section className={cls.section}>
      <span>The WebSocket is currently {getConnectionStatus(readyState)}</span>
      {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      <div className="">
        <ul>
          {messageHistory.map((message, idx) => (
            <li key={idx}>{message ? message.data : null}</li>
          ))}
        </ul>
      </div>
      <div className={cls.wrapper}>
        <Input placeholder="Message" ref={ref} />
        <Button variant="round" onClick={handleClickSendMessage}>
          <span className="material-symbols-outlined">send</span>
        </Button>
      </div>
    </section>
  )
}
