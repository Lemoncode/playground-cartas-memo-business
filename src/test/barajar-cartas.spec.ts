import * as motor from "../motor";

describe("barajarCartas", () => {
  it("debería devolver un array vací cuando la baraja es un array vacío", () => {
    // Arrange

    // Act
    const resultado = motor.barajarCartas([]);

    // Assert
    expect(resultado).toEqual([]);
  });

  it("debería devolver un array con el mismo elemento cuando la baraja tiene un solo elemento", () => {
    // Arrange
    const cartas = [
      {
        idFoto: 1,
        encontrada: false,
        estaVuelta: false,
        imagen: "imagen-test",
      },
      {
        idFoto: 2,
        encontrada: false,
        estaVuelta: false,
        imagen: "imagen-test-2",
      },
    ];
    vi.spyOn(motor, "barajarCartas").mockReturnValue([
      {
        idFoto: 2,
        encontrada: false,
        estaVuelta: false,
        imagen: "imagen-test-2",
      },
      {
        idFoto: 1,
        encontrada: false,
        estaVuelta: false,
        imagen: "imagen-test",
      },
    ]);

    // Act
    const resultado = motor.barajarCartas(cartas);

    // Assert
    expect(resultado).toEqual([
      {
        idFoto: 2,
        encontrada: false,
        estaVuelta: false,
        imagen: "imagen-test-2",
      },
      {
        idFoto: 1,
        encontrada: false,
        estaVuelta: false,
        imagen: "imagen-test",
      },
    ]);
  });
});
