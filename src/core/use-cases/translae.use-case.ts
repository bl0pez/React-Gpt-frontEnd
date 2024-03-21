import { TranslateResponse } from "@Interfaces/translate.response";

interface Props {
  prompt: string;
  lang: string;
}

export const translateTextUseCase = async ({ lang, prompt }: Props) => {
  try {
    const resp = await fetch(`${import.meta.env.VITE_GPT_API}/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, lang }),
    });

    if (!resp.ok) {
      return {
        ok: false,
        message: "Error al traducir el texto",
      };
    }

    const data = (await resp.json()) as TranslateResponse;

    return {
      ok: true,
      message: data.message,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error al traducir el texto",
    };
  }
};
