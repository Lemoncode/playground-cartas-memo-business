import { barajarCartas } from "../motor";

describe("barajarCartas", () => {
  it("debería devolver un array vací cuando la baraja es un array vacío", () => {
    // Arrange

    // Act
    const resultado = barajarCartas([]);

    // Assert
    expect(resultado).toEqual([]);
  });
});
