import { useState, useEffect } from "react";

function Cronometro() {
  const [segundos, setSegundos] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [estilo, setEstilo] = useState("clasico"); // Estilos disponibles: clasico, infantil, degradado, aesthetic, robot, formal

  // Efecto del cronómetro (sin cambios)
  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setSegundos((prevSegundos) => prevSegundos + 1);
      }, 100);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  // Funciones existentes (sin cambios)
  const iniciarDetenerCronometro = () => setIsRunning(!isRunning);
  const reiniciarCronometro = () => {
    setSegundos(0);
    setIsRunning(false);
  };

  // Función para rotar entre estilos
  const cambiarEstilo = () => {
    const estilos = ["clasico", "infantil", "degradado", "aesthetic", "robot", "formal"];
    const nextIndex = (estilos.indexOf(estilo) + 1) % estilos.length;
    setEstilo(estilos[nextIndex]);
  };

  // Formatear tiempo (sin cambios)
  const formatearTiempo = () => {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = segundos % 60;
    return [
      horas.toString().padStart(2, "0"),
      minutos.toString().padStart(2, "0"),
      segundosRestantes.toString().padStart(2, "0")
    ].join(":");
  };

  // Estilos dinámicos para el texto
  const estilosTexto = {
    clasico: { color: "#fff", fontFamily: "Courier, sans-serif" },
    infantil: { color: "#FF6B6B", fontFamily: "'Comic Sans MS', cursive" },
    degradado: { 
      background: "linear-gradient(45deg, #FF9A8B, #FF6B6B, #FF8E53, #FFCA3A)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent",
      fontFamily: "'Arial', sans-serif"
    },
    aesthetic: { color: "#FFB6C1", fontFamily: "'Dancing Script', cursive" },
    robot: { color: "#00FF00", fontFamily: "'Roboto Mono', monospace" },
    formal: { color: "#333", fontFamily: "'Times New Roman', serif" }
  };

  return (
  <div className="contenedor-cronometro">
    <p className="texto-tiempo">Tiempo transcurrido</p>
    <div className={`cronometro ${estilo}`}>
      <p>
        <strong style={{
          fontSize: "80px",
          ...estilosTexto[estilo]
        }}>
          {formatearTiempo()}
        </strong>
      </p>
      <div className="botones">
        <button onClick={iniciarDetenerCronometro}>
          {isRunning ? "Detener" : "Iniciar"}
        </button>
        <button onClick={reiniciarCronometro}>Reiniciar</button>
        <button onClick={cambiarEstilo} className="estilo-btn">
          Cambiar Estilo ({estilo})
        </button>
      </div>
    </div>
  </div>
);
}

export default Cronometro;