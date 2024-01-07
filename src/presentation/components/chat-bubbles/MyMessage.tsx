interface Props {
  text: string;
}

export const MyMessage = ({ text }: Props) => {
  return (
    <div className="flex flex-row items-center justify-end gap-3">
    <div className="relative text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
      { text }
    </div>
    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
      B
    </div>
  </div>
  )
}
