function nuevoTablero(tamaño) {
    let tablero = {
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
    
    for(let i = 0; i < 2; i++)
        generarNumero(tablero);

    return tablero;
}

function generarNumero(tablero) {
    let libres = [];
    let generado = false;
    let {tamaño, fichas} = tablero;

    //busca las casillas disponibles
    for (i = 0; i < tamaño; i++) {
        for (j = 0; j < tamaño; j++) {
            if (fichas[i][j].v === 0) {
                libres.push([i, j]);
            }
        }
    }

    // si hay casillas diponibles genera un numero
    if (libres.length > 0) {
        let [f, c] = libres[Math.floor(Math.random() * libres.length)];
        fichas[f][c].v = Math.random() < 0.9 ? 2 : 4;
        fichas[f][c].u = ++ tablero.ultima;
        generado = true;
    }
    return generado;
}

function mover(tablero, direccion) {
    let obtenerVector = [
        [0, -1], //izquierda
        [-1, 0], //arriba
        [0, 1], //derecha
        [1, 0] //abajo    
    ];

    function moverPos(f1, c1, f2, c2) {
        const validoFila = f1 < tablero.tamaño && f1 >= 0;
        const validoColumna = c1 < tablero.tamaño && c1 >= 0;
        let continuar = false;
        if (validoFila && validoColumna) {
            let desde = tablero.fichas[f2][c2].v;
            let hasta = tablero.fichas[f1][c1].v;
            if (hasta === 0) {
                tablero.fichas[f1][c1].v = desde;
                continuar = true;
            }
            if (desde === hasta) {
                tablero.fichas[f1][c1].v = desde * 2;
            }
            if (hasta === 0 || desde === hasta){
                tablero.fichas[f1][c1].u = tablero.fichas[f2][c2].u;
                tablero.fichas[f2][c2].u = 0;
                tablero.fichas[f2][c2].v = 0;
            }
        }
        return continuar;
    }

    function obtenerSentido(dir) {
        let sentido = [...Array(tablero.tamaño).keys()];
        if (dir === 1) {
            sentido.reverse();
        }
        return sentido;
    }

    function moverFicha(ficha, dir) {
        let continuar = true;
        while (continuar) {
            let posicion = ficha.map((elem, i) => elem + dir[i]);
            continuar = moverPos(...posicion, ...ficha);
            ficha = posicion;
        }
    }

    const vector = obtenerVector[direccion];
    const filas = obtenerSentido(vector[0]);
    const columnas = obtenerSentido(vector[1]);

    for (let i = 0; i < tablero.tamaño; i++) {
        for (let j = 0; j < tablero.tamaño; j++) {
            if (tablero.fichas[filas[i]][columnas[j]].v > 0){
                moverFicha([filas[i], columnas[j]], vector);
            }
        }
    }
    generarNumero(tablero);
}

function comproletEstado(tablero){
    for (let i = 0; i < tablero.tamaño; i++){
        for (let j= 0; j < tablero.tamaño; j++){

        }
    }
}