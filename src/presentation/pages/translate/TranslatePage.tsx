import { useState, useEffect, useRef } from "react";
import {
  GptMessage,
  MyMessage,
  TextMessageBoxSelect,
  TypingLoader,
} from "@Components/index";
import { translateTextUseCase } from "@UseCases/translae.use-case";

const languages = [
  { id: "alemán", text: "Alemán" },
  { id: "árabe", text: "Árabe" },
  { id: "bengalí", text: "Bengalí" },
  { id: "francés", text: "Francés" },
  { id: "hindi", text: "Hindi" },
  { id: "inglés", text: "Inglés" },
  { id: "japonés", text: "Japonés" },
  { id: "mandarín", text: "Mandarín" },
  { id: "portugués", text: "Portugués" },
  { id: "ruso", text: "Ruso" },
];

interface Message {
  text: string;
  isGpt: boolean;
}

export const TranslatePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handlePost = async (text: string, selectedOption: string) => {
    setIsLoading(true);

    const newMessage = `Traducir: ${text} al idioma ${selectedOption}`;
    setMessages((prev) => [...prev, { text: newMessage, isGpt: false }]);

    const response = await translateTextUseCase({
      lang: selectedOption,
      prompt: text,
    });

    if (response.ok) {
      setMessages((prev) => [...prev, { text: response.message, isGpt: true }]);
    } else {
      setMessages((prev) => [...prev, { text: response.message, isGpt: true }]);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex-1 p-4 gap-3 flex flex-col overflow-y-auto">
        <GptMessage text="Hola, ¿que quieres traducir?" />

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

      <TextMessageBoxSelect
        options={languages}
        onSendMessage={handlePost}
        placeholder="Escribe tu mensaje aquí"
      />
    </div>
  );
};
