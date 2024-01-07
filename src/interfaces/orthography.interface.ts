export interface OrthographyResponse {
  userScore: number;
  errors: Error[];
  message: string;
}

export interface Error {
  incorrect: string;
  correct: string;
}
