import { useState, useEffect, useRef } from "react";
import {
  GptMessage,
  MyMessage,
  TextMessage,
  TypingLoader,
} from "@Components/index";
// import { prosConsStreamUseCase } from "@UseCases/prosConsStream.use-case";
import { prosConsStreamGeneratorUseCase } from "@UseCases/prosConsStreamGenerator.use-case";

interface Message {
  text: string;
  isGpt: boolean;
}

export const ProsConsStreamPage = () => {
  const abortController = useRef(new AbortController());
  const isRunning = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handlePost = async (text: string) => {
    if (isRunning.current) {
      abortController.current = new AbortController();
      abortController.current = new AbortController();
    }

    setIsLoading(true);
    isRunning.current = true;
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    const stream = prosConsStreamGeneratorUseCase(
      text,
      abortController.current.signal
    );
    setIsLoading(false);

    setMessages((messages) => [...messages, { text: "", isGpt: true }]);

    for await (const texto of stream) {
      setMessages((messages) => {
        const newMessages = [...messages];
        newMessages[messages.length - 1].text = texto;
        return newMessages;
      });
    }

    isRunning.current = false;

    // const reader = await prosConsStreamUseCase(text);
    // setIsLoading(false);

    // if (!reader) return null;

    // const decoder = new TextDecoder();
    // let message = "";
    // setMessages((messages) => [...messages, { text: message, isGpt: true }]);

    // let reading = true;

    // while (reading) {
    //   const { done, value } = await reader.read();
    //   if (done) {
    //     reading = false;
    //   }

    //   const decodedChunk = decoder.decode(value, { stream: true });
    //   message += decodedChunk;

    //   setMessages((messages) => {
    //     const newMessages = [...messages];
    //     newMessages[messages.length - 1].text = message;
    //     return newMessages;
    //   });
    // }
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
