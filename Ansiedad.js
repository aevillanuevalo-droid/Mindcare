// Preguntas del test
const preguntas = [
    "Me siento cansada(o) aunque haya descansado.",
    "Me cuesta concentrarme en clases, trabajo u otras actividades.",
    "Me siento tensa(o), nerviosa(o) o preocupada(o) sin razón clara.",
    "Siento presión en el pecho o respiración acelerada.",
    "Me irrito o enojo fácilmente.",
    "Tengo dificultad para dormir o descanso mal.",
    "Siento que no puedo con todas mis responsabilidades.",
    "Pierdo interés en actividades que antes disfrutaba.",
    "Me cuesta tomar decisiones o pensar con claridad.",
    "Tengo dolores de cabeza, estómago o musculares frecuentes."
];

// Insertar preguntas en el HTML
let contenedor = document.getElementById("preguntas");
preguntas.forEach((pregunta, i) => {
    let num = i + 1;
    contenedor.innerHTML += `
        <div class="question">
            ${num}. ${pregunta}
            <div class="options">
                <input type="radio" name="p${num}" value="0" onchange="actualizarBarra()"> 0 (Nunca)
                <input type="radio" name="p${num}" value="1" onchange="actualizarBarra()"> 1 (A veces)
                <input type="radio" name="p${num}" value="2" onchange="actualizarBarra()"> 2 (Frecuentemente)
                <input type="radio" name="p${num}" value="3" onchange="actualizarBarra()"> 3 (Siempre)
            </div>
        </div>
    `;
});

// Actualizar barra de progreso
function actualizarBarra() {
    let respondidas = 0;

    for (let i = 1; i <= 10; i++) {
        if (document.querySelector(`input[name="p${i}"]:checked`)) {
            respondidas++;
        }
    }

    let porcentaje = (respondidas / 10) * 100;
    document.getElementById("barra").style.width = porcentaje + "%";
}

// Calcular resultado
function calcular() {
    let total = 0;

    for (let i = 1; i <= 10; i++) {
        let r = document.querySelector(`input[name='p${i}']:checked`);
        if (!r) {
            alert("Por favor responde todas las preguntas.");
            return;
        }
        total += parseInt(r.value);
    }

    let interpretacion = "";
    if (total <= 7) {
        interpretacion = "(◕‿◕) Bajo estrés/ansiedad.";
    } else if (total <= 15) {
        interpretacion = "(˶º⤙º˶) Estrés moderado.";
    } else if (total <= 24) {
        interpretacion = "(ó﹏ò｡) Estrés alto / ansiedad significativa.";
    } else {
        interpretacion = "(╥﹏╥) Muy alto estrés / riesgo de ansiedad.";
    }

    let resultado = document.getElementById("resultado");

    resultado.innerHTML =
        `Puntaje total: <strong>${total}/30</strong><br>${interpretacion}`;

    resultado.style.opacity = "1";
    resultado.style.transform = "scale(1)";
    resultado.classList.remove("pop");
    void resultado.offsetWidth;
    resultado.classList.add("pop");

    document.getElementById("mensaje").innerHTML = `
        <i>“Reconocer cómo nos sentimos es el primer paso para cuidarnos. 
        No estás sola(o); pedir apoyo y descansar también es parte del éxito.”</i>
        <br><br>
        <strong>MindCare UCV</strong> invita a detenerse, respirar y reconectarse con uno mismo.
    `;
}
