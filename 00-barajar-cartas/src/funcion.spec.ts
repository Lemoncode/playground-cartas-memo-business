import { describe, it, expect, vi, afterEach } from "vitest";
import { barajarCartas } from "./funcion";

interface Carta {
  idFoto: number;
  imagen: string;
  estaVuelta: boolean;
  encontrada: boolean;
}

const crearCarta = (idFoto: number, imagen = `img-${idFoto}.png`): Carta => ({
  idFoto,
  imagen,
  estaVuelta: false,
  encontrada: false,
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("barajarCartas", () => {
  it("devuelve un nuevo array (referencia distinta) y no muta el original", () => {
    const original: Carta[] = [crearCarta(1), crearCarta(2), crearCarta(3)];
    const copiaDeOriginal = [...original];

    // Mock determinista:
    // i=2 -> j=floor(0.9*3)=2 (no cambia)
    // i=1 -> j=floor(0.4*2)=0 (intercambia 1<->0)
    const spy = vi
      .spyOn(Math, "random")
      .mockReturnValueOnce(0.9)
      .mockReturnValueOnce(0.4);

    const resultado = barajarCartas(original);

    expect(resultado).not.toBe(original);
    expect(original).toEqual(copiaDeOriginal); // no mutado
    expect(resultado.map((c) => c.idFoto)).toEqual([2, 1, 3]);

    // Se han hecho dos llamadas a random para n=3
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it("mantiene la misma longitud y las mismas cartas (mismo multiset), aunque cambie el orden", () => {
    // Con duplicados para simular parejas
    const cartas: Carta[] = [
      crearCarta(1),
      crearCarta(1),
      crearCarta(2),
      crearCarta(2),
      crearCarta(3),
      crearCarta(3),
    ];

    // Mock: produce algún reordenamiento estable
    const spy = vi
      .spyOn(Math, "random")
      .mockReturnValueOnce(0.1) // i=5 -> j=0
      .mockReturnValueOnce(0.3) // i=4 -> j=1
      .mockReturnValueOnce(0.2) // i=3 -> j=0
      .mockReturnValueOnce(0.8) // i=2 -> j=1
      .mockReturnValueOnce(0.0); // i=1 -> j=0

    const resultado = barajarCartas(cartas);

    expect(resultado).toHaveLength(cartas.length);

    // mismo multiset por idFoto
    const sortIds = (xs: Carta[]) =>
      xs.map((c) => c.idFoto).sort((a, b) => a - b);
    expect(sortIds(resultado)).toEqual(sortIds(cartas));

    // Debe haber cambiado el orden en este mock concreto
    expect(resultado.map((c) => c.idFoto)).not.toEqual(
      cartas.map((c) => c.idFoto)
    );
    expect(spy).toHaveBeenCalled(); // se usó la aleatoriedad
  });

  it("con array vacío: devuelve [] y no llama a Math.random", () => {
    const spy = vi.spyOn(Math, "random");
    const resultado = barajarCartas([]);
    expect(resultado).toEqual([]);
    expect(spy).not.toHaveBeenCalled();
  });

  it("con un solo elemento: devuelve ese elemento (misma referencia dentro), en un nuevo array", () => {
    const carta = crearCarta(42);
    const input = [carta];

    const resultado = barajarCartas(input);

    expect(resultado).not.toBe(input); // nuevo array
    expect(resultado).toHaveLength(1);
    expect(resultado[0]).toBe(carta); // misma referencia del objeto
  });

  it("puede producir órdenes distintos con diferentes valores de aleatoriedad (determinista por mock)", () => {
    const base: Carta[] = [crearCarta(1), crearCarta(2), crearCarta(3)];

    // Primera corrida -> [2,1,3]
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0.9) // i=2 -> j=2
      .mockReturnValueOnce(0.4); // i=1 -> j=0
    const r1 = barajarCartas(base);
    const orden1 = r1.map((c) => c.idFoto);
    vi.restoreAllMocks();

    // Segunda corrida -> [3,2,1]
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0.0) // i=2 -> j=0 => [3,2,1]
      .mockReturnValueOnce(0.999); // i=1 -> j=1 (sin cambio)
    const r2 = barajarCartas(base);
    const orden2 = r2.map((c) => c.idFoto);

    expect(orden1).not.toEqual(orden2);
    // Por sanidad, ambos mantienen el multiset
    const sortIds = (xs: number[]) => [...xs].sort((a, b) => a - b);
    expect(sortIds(orden1)).toEqual([1, 2, 3]);
    expect(sortIds(orden2)).toEqual([1, 2, 3]);
  });
});
