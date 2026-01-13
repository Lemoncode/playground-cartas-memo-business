# playground cartas memo business

## ¿Cómo arrancar?

Tenemos dos maneras de poder hacerlo:

- Podemos acceder directamente a este [link](https://stackblitz.com/github/Lemoncode/playground-cartas-memo-business/tree/main) de stackblitz, el cual cargará el código del proyecto (es posible que tarde en cargar el código unos minutos)

- La segunda opción, usar el código que te proporcionamos en este repositorio:

Puedes clonarte el código a una carpeta en tu máquina:

<img src="./assets/clone-playground.png" />

O, si no quieres clonarte el código, también puedes descargarlo:

<img src="./assets/download-playground.png" />

Una vez tengas una de las dos opciones, abre el visual studio code en la ruta en la que se encuentre tu código. Abre la consola (Terminal/New Terminal o el atajo de teclado ctrl + ñ).

Una vez tengas listo una de las dos opciones, la forma de trabajar es sencilla, implementamos los test que están divididos por ficheros dentro de la carpeta `test` y una vez tengas el test podrás ejecutar el comando `npm run test` y ver si el test pasa en verde.

> Acuérdate de eliminar la linea de por defecto que tienen todos los test: `expect(true).toBe(true);` e implementar el código real de tus tests.

<img src="./assets/testResults.png" />

## Implementando cada función.

Para cada función que debemos desarrollar en motor, hemos creado un fichero spec dentro del directorio test. Tu tarea será implementar el código de cada función en el fichero de motor y, a continuación, desarrollar los tests correspondientes.

### 1 barajarCartas

Esta función recibe como parámetro un array de cartas y devuelve un array de cartas ya barajadas. Para que sea fácil (esta función tiene algo de dificultad), te dejamos este [hilo](https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array) de stackoverflow donde se ven diferentes maneras de abordar el barajado de elementos.

> **Importante** Ya hemos preparado una serie de tests para la función de barajado de cartas que te servirán como guía para implementar el resto. Puedes encontrarlos en `test/baraja-cartas.spec.ts`

### 2 sePuedeVoltearLaCarta

Aquí podremos indicar si se puede voltear o no (`true` o `false`) la carta pulsada en el html. Recuerda que cada carta tiene los flags estaVuelta y encontrada donde podremos revisar esto.

### 3 voltearLaCarta

Esta función será la encargada de modificar el objeto tablero. Lo primero será poner a true la propiedad de estaVuelta (que indica que ha sido volteada la carta que sea). Lo siguiente, será ver si el indice de la carta que hemos pulsado se tiene que guardar en el `indiceCartaVolteadaA` o `indiceCartaVolteadaB` (estas dos propiedades guardarán de manera provisional los indices para luego comprobar si son o no pareja).

¿Cómo podemos diferenciar si el indice va al A o al B? La pista está en el estado de la partida. Cuando iniciamos la partida, el estado está en `CeroCartasLevantadas`, si cuando pulso sobre la primera carta, ese es el estado, entonces el indice tiene que ir a `indiceCartaVolteadaA`, y por lo tanto el estado pasa a `UnaCartaLevantada`.

El siguiente punto es muy sencillo, si el estado cuando pulsamos sobre la segunda carta es `UnaCartaLevantada` podemos añadir el índice a `indiceCartaVolteadaB` y cambiar el estado a `DosCartasLevantadas`.

### 4 sonPareja

Esta es la más fácil de todas, saber si la idFoto de la primera y segunda carta que hemos pulsado es la misma o no.

> Pista: Puedes usar el array method [every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every) que comprueba si todos los elementos de un array cumplen con la condición que le indiquemos.

### 5 parejaEncontrada

Esta función se encargará de modificar de true a false la propiedad de
encontrada. Acuérdate de que para poder encontrar la siguiente pareja,
las propiedades de `estaVuelta`, el estado de la partida y los índices A
y B tienen que estar de nuevo como al principio, `estaVuelta` a false,
los índices A y B a undefined y el estado a `CeroCartasLevantadas`.

### 6 parejaNoEncontrada

Lo mismo que la anterior, pero con la diferencia de que en vez de
modificar `encontrada`, ahora será volver a false la propiedad de `estaVuelta`.

### 7 esPartidaCompleta

Si todos los elementos cumplen con la condición de que la propiedad `encontrada` está a true, la partida está completa, en caso contrario false.

> Pista: Puedes hacerlo muy fácil con el array method [every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every).

### 8 iniciaPartida

Esta función se ejecutará cuando pulsemos sobre el botón de iniciar partida. Esta función tendrá varias partes:

- Barajar el array de cartas.
- Actualizar el array de cartas del tablero con las cartas barajadas del punto anterior.
- Modificar el estado de la partida a `CeroCartasLevantadas`.
