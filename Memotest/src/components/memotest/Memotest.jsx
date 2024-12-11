import React, { useState, useEffect } from "react";
import "./Memotest.css"; // Archivo de estilos
import ButtonOption from "../atoms/buttonOption/ButtonOption";

const Memotest = () => {
  const [tablero, setTablero] = useState([]);
  const [volteadas, setVolteadas] = useState([]);
  const [emparejadas, setEmparejadas] = useState([]);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [tableroSize, setTableroSize] = useState(4);
  const [eligio, setEligio] = useState(false);


  const generarTablero = (opcion) => {
    const opciones = {
      Animales: [
        "🐶", "🐱", "🐭", "🐰", "🦊", "🐻", "🐼", "🐨", "🦁", "🐸", "🐷", "🐮", "🐔", "🐵", "🦓", "🦒",
        "🐘", "🦏", "🐊", "🐢", "🦎", "🐍", "🦂", "🕷️", "🐌", "🐞", "🦋", "🐝", "🐜", "🐚", "🐳", "🐬",
      ],
      Paises: [
        "🇦🇷", "🇧🇷", "🇨🇱", "🇺🇾", "🇲🇽", "🇨🇴", "🇪🇸", "🇫🇷", "🇮🇹", "🇺🇸", "🇬🇧", "🇩🇪", "🇯🇵", "🇨🇳", "🇮🇳", "🇦🇺",
        "🇨🇦", "🇷🇺", "🇿🇦", "🇳🇿", "🇰🇷", "🇸🇪", "🇳🇴", "🇩🇰", "🇳🇱", "🇧🇪", "🇨🇭", "🇦🇹", "🇧🇴", "🇵🇪", "🇻🇪", "🇬🇷",
      ],
      Objetos: [
        "📱", "💻", "🎮", "🖨️", "📷", "🎧", "🔑", "💡", "📚", "🚪", "🖊️", "🖌️", "📝", "📒", "✂️", "📎",
        "📐", "📏", "🔬", "🔭", "📡", "💾", "📀", "📼", "🎥", "📽️", "📠", "🕹️", "🔋", "🔌", "🛠️", "🔧",
      ],
    };
  
    const elementos = opciones[opcion].slice(0, (tableroSize * tableroSize) / 2);
    const elementosDuplicados = [...elementos, ...elementos];
    const tableroAleatorio = elementosDuplicados.sort(() => Math.random() - 0.5)
    setTablero(tableroAleatorio);
    setEligio(true);
  };
  const cambiarTamañoTablero = (e) => {
    const newSize = parseInt(e.target.value);
    setTableroSize(newSize);
    setEligio(false); // Reiniciar tablero si se cambia tamaño
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
    <div className="background-dinamico">
    <div className="contenedor-memotest">
      <h1 className="title-memotest">Memotest</h1>
      {!eligio ? (
        <div className="contenedor-opciones">
          <p>Elije con qué quieres jugar:</p>
          <ButtonOption handleCreateBoard={generarTablero} name="Animales" />
          <ButtonOption handleCreateBoard={generarTablero} name="Paises" />
          <ButtonOption handleCreateBoard={generarTablero} name="Objetos" />
          <div className="contenedor-tamanios">
            <label htmlFor="tamanio-tablero">Elegi el Tamaño del tablero:</label>
              <select
                id="tamanio-tablero"
                value={tableroSize}
                onChange={cambiarTamañoTablero}
                >
                <option value={4}>4x4</option>
                <option value={6}>6x6</option> 
                <option value={8}>8x8</option>
              </select>
          </div>
        </div>
      ) : (
        <div className="containerTablero">
          <div className={`tablero size-${tableroSize}`}>
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
      </div>
    </div>
  );
}
export default Memotest;