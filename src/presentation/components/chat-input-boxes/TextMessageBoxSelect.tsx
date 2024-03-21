import { useState } from "react";

interface Props {
  onSendMessage: (message: string, selectedOption: string) => void;
  placeholder: string;
  disableCorrections?: boolean;
  options: Option[];
}

interface Option {
  id: string;
  text: string;
}

export const TextMessageBoxSelect = ({
  onSendMessage,
  placeholder,
  disableCorrections,
  options,
}: Props) => {
  const [message, setMessage] = useState("");
  const [selectOption, setSelectOption] = useState<string>("");

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim().length === 0) return;
    if (selectOption.trim().length === 0) return;

    onSendMessage(message, selectOption);
    setMessage("");
  };

  return (
    <form
      className="flex flex-row items-center h-16 bg-white w-full px-4"
      onSubmit={handleSendMessage}
    >
      <div className="flex-grow">
        <div className="flex w-full">
          <input
            placeholder={placeholder}
            type="text"
            autoFocus
            name="message"
            className="flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
            autoComplete={disableCorrections ? "on" : "off"}
            autoCorrect={disableCorrections ? "on" : "off"}
            spellCheck={disableCorrections ? "true" : "false"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <select
            name="select"
            className="w-2/5 ml-5 border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
            value={selectOption}
            onChange={(e) => setSelectOption(e.target.value)}
          >
            <option value="" disabled>
              Selecciona una opción
            </option>

            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="ml-4">
        <button className="btn-primary">
          <span className="mr-2">Enviar</span>
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
};
