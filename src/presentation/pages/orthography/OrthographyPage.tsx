import { useState, useEffect, useRef } from "react";
import {
  GptMessage,
  GptOrthographyMessage,
  MyMessage,
  TextMessage,
  TypingLoader,
} from "@Components/index";
import { orthographyCheckUseCase } from "@UseCases/orthography.use-case";
import { OrthographyResponse } from "@Interfaces/index";

interface Message {
  text: string;
  isGpt: boolean;
  info?: OrthographyResponse;
}

export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    const { errors, message, userScore, ok } = await orthographyCheckUseCase(
      text
    );

    if (ok) {
      setMessages((prev) => [
        ...prev,
        {
          text: message,
          isGpt: true,
          info: { errors, message, userScore },
        },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        { text: "No se pudo realizar la corrección", isGpt: true },
      ]);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex-1 p-4 gap-3 flex flex-col overflow-y-auto">
        <GptMessage text="Hola, introduce el text a corregir." />

        {messages.map((message, i) =>
          message.isGpt ? (
            <GptOrthographyMessage key={i} {...message.info!} />
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
