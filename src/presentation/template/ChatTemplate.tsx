import { useState, useEffect, useRef } from 'react'
import { GptMessage, MyMessage, TextMessage, TypingLoader } from '../components';

interface Message {
  text: string;
  isGpt: boolean;
}

export const OrthographyPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }])
    setIsLoading(false);

  }

  return (
    <div className='flex flex-col w-full gap-2'>
     
        <div className="flex-1 p-4 gap-3 flex flex-col overflow-y-auto">
            <GptMessage text="Hola, introduce el text a corregir." />

            {
              messages.map((message, i ) => (
                message.isGpt
                  ? <GptMessage key={i} text="esto es Open Ai" />
                  : <MyMessage key={i} text={message.text} />
              ))
            }

            <div ref={messagesEndRef} />

            {
              isLoading && <TypingLoader />
            }
        </div>

      <TextMessage 
        onSendMessage={ handlePost }
        placeholder="Escribe tu mensaje aquí"
        disableCorrections
      />

    </div>
  )
}