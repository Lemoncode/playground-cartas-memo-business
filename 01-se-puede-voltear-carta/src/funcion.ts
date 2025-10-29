import type { Carta, Tablero } from "./model";

/*
En el motor nos va a hacer falta un método para barajar cartas
*/
export const barajarCartas = (cartas: Carta[]): Carta[] => {
  // Copia la implementacion que hayas hecho de la función 00-barajar-cartas
  // como puedo hacer para un return diciendo que no esta implementado?
  throw new Error("Función no implementada");
};

/*
  Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas
*/
export const sePuedeVoltearLaCarta = (
  tablero: Tablero,
  indice: number
): boolean => {
  //..
  //throw new Error("Función no implementada");
};
