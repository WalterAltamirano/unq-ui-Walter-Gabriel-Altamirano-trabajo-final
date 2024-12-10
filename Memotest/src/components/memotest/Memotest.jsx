import React, { useState, useEffect } from "react";
import "./Memotest.css"; // Archivo de estilos
import ButtonOption from "../atoms/buttonOption/ButtonOption";
import arg from "../../../public/paisesIcons/arg.png"
import bra from "../../../public/paisesIcons/bra.png"
import col from "../../../public/paisesIcons/col.png"
import corea from "../../../public/paisesIcons/corea.png"
import guat from "../../../public/paisesIcons/guat.png"
import jap from "../../../public/paisesIcons/jap.png"
import uru from "../../../public/paisesIcons/uru.png"
import venz from "../../../public/paisesIcons/venz.png"

const Memotest = () => {
  const [tablero, setTablero] = useState([]);
  const [volteadas, setVolteadas] = useState([]);
  const [emparejadas, setEmparejadas] = useState([]);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [eligio, setEligio] = useState(false);


  const generarTablero = (opcion) => {
    const opciones = {
      Animales: ["🐶", "🐱", "🐭", "🐰", "🦊", "🐻", "🐼", "🐨"],
      Paises: [arg, bra, col, corea, guat, jap, uru, venz],
      Objetos: ["🚗", "🚲", "🛶", "🛩", "🚀", "🚢", "🏍", "🚒"],
    };

    const elementos = opciones[opcion];
    const elementosDuplicados = [...elementos, ...elementos];
    setTablero(elementosDuplicados.sort(() => Math.random() - 0.5));
    setEligio(true);
  };
  const manejarVoltear = (indice) => {
    if (
      volteadas.length === 2 ||
      volteadas.includes(indice) ||
      emparejadas.includes(indice)
    ) {
      return;
    }

    const nuevasVolteadas = [...volteadas, indice];
    setVolteadas(nuevasVolteadas);

    if (nuevasVolteadas.length === 2) {
      const [primerIndice, segundoIndice] = nuevasVolteadas;
      if (tablero[primerIndice] === tablero[segundoIndice]) {
        setEmparejadas([...emparejadas, primerIndice, segundoIndice]);
      }
      setTimeout(() => setVolteadas([]), 1000);
    }
  };

  useEffect(() => {
    if (emparejadas.length === tablero.length && tablero.length > 0) {
      setJuegoTerminado(true);
    }
  }, [emparejadas, tablero]);

  const reiniciarJuego = () => {
    setTablero([]);
    setVolteadas([]);
    setEmparejadas([]);
    setJuegoTerminado(false);
    setEligio(false);
  };

  return (
    <>
    {!eligio ? (
    <div className="contenedor-memotest">
      <h1>Memotest</h1>
      <div className="contenedor-opciones">
        Elije con que quieres jugar: 
        <ButtonOption handleCreateBoard={generarTablero} name="Animales" />
        <ButtonOption handleCreateBoard={generarTablero} name="Paises" />
        <ButtonOption handleCreateBoard={generarTablero} name="Objetos" />
      </div>
    </div>
        ) : (
      <div>
        <div className="tablero">
            {tablero.map((item, indice) => (
                <div
                    key={indice}
                    className={`carta ${
                    volteadas.includes(indice) || emparejadas.includes(indice)
                        ? "volteada"
                        : ""
                    }`}
                    onClick={() => manejarVoltear(indice)}
                    >
                    <div className="frente">{item}</div>
                    <div className="dorso">?</div>
                </div>
            ))}
      </div>
        {juegoTerminado && (
            <div className="mensaje-final">
            <h2>¡Juego terminado!</h2>
            <button onClick={reiniciarJuego}>Reiniciar juego</button>
            </div>
        )}
    </div>
    )}
    </>
  );
};

export default Memotest;