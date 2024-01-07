import type { Error } from "@Interfaces/index";

interface Props {
  userScore: number;
  errors: Error[];
  message: string;
}

export const GptOrthographyMessage = ({
  userScore,
  errors,
  message,
}: Props) => {
  return (
    <div className="flex flex-row items-center gap-3">
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
        Gpt
      </div>
      <div className="relative text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400">Puntaje del usuario</span>
            <span className="text-sm text-gray-100">{userScore}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400">Errores</span>
            {errors.length === 0 ? (
              <span className="text-sm text-gray-100">
                No se encontraron errores
              </span>
            ) : (
              errors.map((error, i) => (
                <div key={i} className="text-sm tracking-widest">
                  <span className="text-red-500 flex gap-2 items-center">
                    {error.incorrect}{" "}
                    <i className="fa-solid fa-square-xmark"></i>
                  </span>
                  <span className="text-green-500 flex gap-2 items-center">
                    {error.correct} <i className="fa-solid fa-square-check"></i>
                  </span>
                </div>
              ))
            )}
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400">Mensaje</span>
            <span className="text-sm text-gray-100">{message}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
