// script_diario.js
// Actualiza las preguntas automáticamente desde Lichess cada día a las 21:00 (hora España)

async function actualizarPreguntasDiarias() {
  const ahora = new Date();
  const horaEspaña = new Date(ahora.toLocaleString("en-US", { timeZone: "Europe/Madrid" }));

  if (horaEspaña.getHours() === 21 && horaEspaña.getMinutes() === 0) {
    console.log("⏳ Actualizando preguntas desde Lichess...");
    try {
      const response = await fetch("https://lichess.org/api/puzzle/daily");
      const data = await response.json();
      const nuevaPregunta = {
        pregunta: "Basado en el puzzle diario de Lichess (" + data.game.id + "): ¿Cuál es la mejor jugada?",
        opciones: ["Jugada del puzzle", "Otra", "Defensiva", "No se sabe"],
        respuesta: "Jugada del puzzle"
      };
      console.log("✅ Pregunta actualizada:", nuevaPregunta);
    } catch (err) {
      console.error("❌ Error al actualizar preguntas:", err);
    }
  }
}

// Ejecutar cada minuto para comprobar si es hora de actualización
setInterval(actualizarPreguntasDiarias, 60000);
