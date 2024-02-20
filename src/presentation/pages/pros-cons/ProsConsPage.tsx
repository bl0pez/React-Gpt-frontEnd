import { useState, useEffect, useRef } from "react";
import {
  GptMessage,
  MyMessage,
  TextMessage,
  TypingLoader,
} from "@Components/index";
import { prosConsUseCase } from "@UseCases/prosCons.use-case";

interface Message {
  text: string;
  isGpt: boolean;
}

export const ProsConsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);
    const { content, ok } = await prosConsUseCase(text);
    setIsLoading(false);

    if (!ok) return;

    setMessages((prev) => [...prev, { text: content, isGpt: true }]);
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex-1 p-4 gap-3 flex flex-col overflow-y-auto">
        <GptMessage text="Hola, soy un asistente virtual, ¿Qué es lo que quieres comparar?" />

        {messages.map((message, i) =>
          message.isGpt ? (
            <GptMessage key={i} text={message.text} />
          ) : (
            <MyMessage key={i} text={message.text} />
          )
        )}

        <div ref={messagesEndRef} />

        {isLoading && <TypingLoader />}
      </div>

      <TextMessage
        onSendMessage={handlePost}
        placeholder="Escribe tu mensaje aquí"
        disableCorrections
      />
    </div>
  );
};
