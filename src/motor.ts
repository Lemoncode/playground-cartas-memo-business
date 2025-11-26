import type { Carta, Tablero } from "./model";

/*
En el motor nos va a hacer falta un método para barajar cartas
*/
export const barajarCartas = (cartas: Carta[]): Carta[] => {
  throw new Error('Falta implementación');
}

/*
  Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas
*/
export const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number): boolean => {
  throw new Error('Falta implementación');
}

export const voltearLaCarta = (tablero: Tablero, indice: number): void => {
  throw new Error('Falta implementación');
}

/*
  Dos cartas son pareja si en el array de tablero de cada una tienen el mismo id
*/
export const sonPareja = (indiceA: number, indiceB: number, tablero: Tablero): boolean => {
  throw new Error('Falta implementación');
}

/*
  Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y comprobar si la partida esta completa.
*/
export const parejaEncontrada = (tablero: Tablero, indiceA: number, indiceB: number): void => {
  throw new Error('Falta implementación');
}

/*
  Aquí asumimos que no son pareja y las volvemos a poner boca abajo
*/
export const parejaNoEncontrada = (tablero: Tablero, indiceA: number, indiceB: number): void => {
  throw new Error('Falta implementación');
}

/*
  Esto lo podemos comprobar o bien utilizando every, o bien utilizando un contador (cartasEncontradas)
*/
export const esPartidaCompleta = (tablero: Tablero): boolean => {
  throw new Error('Falta implementación');
}

/*
Iniciar partida
*/

export const iniciaPartida = (tablero: Tablero): void => {
  throw new Error('Falta implementación');
};
