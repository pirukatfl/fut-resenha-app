export interface Player {
  id: string | number,
  name: string,
  strongFoot: 'direito' | 'esquerdo' | 'ambos',
  score: number
}
