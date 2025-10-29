// src/sePuedeVoltearLaCarta.test.ts
import { describe, it, expect } from 'vitest';
import { sePuedeVoltearLaCarta } from './funcion';
import type { Tablero, Carta } from './model';

// Helpers de test (solo datos; tipos vienen del modelo)
const crearCarta = (
  idFoto: number,
  {
    estaVuelta = false,
    encontrada = false,
    imagen = `img-${idFoto}.png`,
  }: Partial<Pick<Carta, 'estaVuelta' | 'encontrada' | 'imagen'>> = {}
): Carta => ({
  idFoto,
  imagen,
  estaVuelta,
  encontrada,
});

const crearTablero = (cartas: Carta[]): Tablero => ({
  cartas,
  estadoPartida: 'CeroCartasLevantadas',
});

describe('sePuedeVoltearLaCarta', () => {
  it('devuelve true si la carta NO está vuelta NI encontrada', () => {
    const cartas = [crearCarta(1, { estaVuelta: false, encontrada: false })];
    const tablero = crearTablero(cartas);

    const puede = sePuedeVoltearLaCarta(tablero, 0);

    expect(puede).toBe(true);
  });

  it('devuelve false si la carta ya está vuelta', () => {
    const cartas = [crearCarta(1, { estaVuelta: true, encontrada: false })];
    const tablero = crearTablero(cartas);

    const puede = sePuedeVoltearLaCarta(tablero, 0);

    expect(puede).toBe(false);
  });

  it('devuelve false si la carta ya fue encontrada', () => {
    const cartas = [crearCarta(1, { estaVuelta: false, encontrada: true })];
    const tablero = crearTablero(cartas);

    const puede = sePuedeVoltearLaCarta(tablero, 0);

    expect(puede).toBe(false);
  });

  it('devuelve false si la carta está vuelta y encontrada', () => {
    const cartas = [crearCarta(1, { estaVuelta: true, encontrada: true })];
    const tablero = crearTablero(cartas);

    const puede = sePuedeVoltearLaCarta(tablero, 0);

    expect(puede).toBe(false);
  });

  it('no muta el tablero ni la carta', () => {
    const carta = crearCarta(1, { estaVuelta: false, encontrada: false });
    const cartas = [carta];
    const tablero = crearTablero(cartas);

    sePuedeVoltearLaCarta(tablero, 0);

    expect(tablero.cartas[0]).toBe(carta); // misma referencia
    expect(tablero.cartas[0]).toEqual({
      idFoto: 1,
      imagen: 'img-1.png',
      estaVuelta: false,
      encontrada: false,
    });
  });

  it('lanza error si el índice está fuera de rango', () => {
    const cartas = [crearCarta(1)];
    const tablero = crearTablero(cartas);

    // La implementación actual accederá a undefined. Propagamos el throw.
    expect(() => sePuedeVoltearLaCarta(tablero, 999)).toThrow();
  });
});