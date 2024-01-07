import Markdown from "react-markdown";

interface Props {
  text: string;
}

export const GptMessage = ({ text }: Props) => {
  return (
      <div className="flex flex-row items-center gap-3">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
          Gpt
        </div>
        <div className="relative text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
          <Markdown>{text}</Markdown>
        </div>
      </div>
  );
};
