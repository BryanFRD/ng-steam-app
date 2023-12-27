export {};

declare global {
  
  type GetResponse<T> = Promise<{data: T, error: any, status: number}>;
  
  type Pokemon = {
    id: number,
    name: string,
    sprites: {
      front_default: string,
      front_shiny: string,
    },
  }
  
}