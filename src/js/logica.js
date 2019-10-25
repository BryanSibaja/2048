function nuevoTablero(tamaño, tablero) {
    var tablero = {
        tamaño: tamaño,
        fichas: [],
        puntos: 0,
        estado: "continuar",
        ultima: 0
    };
    for (i = 0; i < tamaño; i++) {
        tablero.fichas.push([]);
        for (j = 0; j < tamaño; j++) {
            tablero.fichas[i].push({
                f : i, //fila
                c : j, //columna
                v : 0, //valor
                u : 0 //identificador
            });
        }
    }
    generarNumero(tablero);
    generarNumero(tablero);
    return tablero;
}

function generarNumero(tablero) {
    var casillasLibres = [];
    var generado = false;

    //busca las casillas disponibles
    for (i = 0; i < tablero.tamaño; i++) {
        for (j = 0; j < tablero.tamaño; j++) {
            if (tablero.fichas[i][j].v === 0) {
                casillasLibres.push({ fila: i, columna: j });
            }
        }
    }

    // si hay casillas diponibles genera un numero
    if (casillasLibres.length > 0) {
        var casilla = casillasLibres[Math.floor(Math.random() * casillasLibres.length)];
        tablero.fichas[casilla.fila][casilla.columna].v = Math.random() < 0.9 ? 2 : 4;
        tablero.fichas[casilla.fila][casilla.columna].u = ++ tablero.ultima;
        generado = true;
    }
    return generado;
}

function mover(tablero, direccion) {
    var obtenerVector = [
        [0, -1], //izquierda
        [-1, 0], //arriba
        [0, 1], //derecha
        [1, 0] //abajo    
    ];

    function moverPos(pos, ficha) {
        var validoFila = pos[0] < tablero.tamaño && pos[0] >= 0;
        var validoColumna = pos[1] < tablero.tamaño && pos[1] >= 0;
        var continuar = false;
        if (validoFila && validoColumna) {
            var desde = tablero.fichas[ficha[0]][ficha[1]].v;
            var hasta = tablero.fichas[pos[0]][pos[1]].v;
            if (hasta === 0) {
                tablero.fichas[pos[0]][pos[1]].v = desde;
                continuar = true;
            }
            if (desde === hasta) {
                tablero.fichas[pos[0]][pos[1]].v = desde * 2;
            }
            if (hasta === 0 || desde === hasta){
                tablero.fichas[pos[0]][pos[1]].u = tablero.fichas[ficha[0]][ficha[1]].u;
                tablero.fichas[ficha[0]][ficha[1]].u = 0;
                tablero.fichas[ficha[0]][ficha[1]].v = 0;
            }
        }
        return continuar;
    }

    function obtenerSentido(dir) {
        var sentido = [...Array(tablero.tamaño).keys()];
        if (dir === 1) {
            sentido.reverse();
        }
        return sentido;
    }

    function moverFicha(ficha, dir) {
        var continuar = true;
        while (continuar) {
            var posicion = ficha.map((elem, i) => elem + dir[i]);
            continuar = moverPos(posicion, ficha);
            ficha = posicion;
        }
    }

    var vector = obtenerVector[direccion];
    var filas = obtenerSentido(vector[0]);
    var columnas = obtenerSentido(vector[1]);

    for (var i = 0; i < tablero.tamaño; i++) {
        for (var j = 0; j < tablero.tamaño; j++) {
            if (tablero.fichas[filas[i]][columnas[j]].v > 0){
                moverFicha([filas[i], columnas[j]], vector);
            }
        }
    }
    generarNumero(tablero);
}

function comprovarEstado(tablero){
    for (var i = 0; i < tablero.tamaño; i++){
        for (var j= 0; j < tablero.tamaño; j++){

        }
    }
}