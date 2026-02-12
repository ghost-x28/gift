document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById('mensaje-texto');
    const gardenContainer = document.getElementById('jardin-container');
    
    // --- EL MENSAJE ---
    // \n crea saltos de línea.
    const message = "Aún no puedo comprarte un campo entero de tulipanes reales, así que decidí programarte uno que nunca se marchite.\n\nGracias por cada momento que hemos compartido hasta ahora. Me encantas. 💜";
    
    let index = 0;

    // --- CONFIGURACIÓN ---
    // Aumentamos la cantidad para pantallas móviles
    const tulipsPerRow = 7; 
    const colorFront = "#9b59b6"; 
    const colorBack = "#5b2c6f"; // Un morado más oscuro y profundo para el fondo

    // 1. SVG MEJORADO (Tallo más largo)
    function getTulipSVG(color) {
        // Cambié el viewBox a "0 0 100 200" (antes 150) para dar espacio a un tallo más alto
        return `
        <svg viewBox="0 0 100 220" class="tulipan-svg" width="100%" height="100%" style="overflow: visible;">
            <path d="M50 220 Q50 150 50 50" stroke="#1e5631" stroke-width="5" fill="none" />
            
            <path d="M50 200 Q10 150 10 90 Q30 130 50 150" fill="#2d6a4f" opacity="0.9"/>
            <path d="M50 200 Q90 150 90 90 Q70 130 50 150" fill="#2d6a4f" opacity="0.9"/>
            
            <g transform="translate(0, 0)">
                <path d="M30 50 Q50 80 70 50 Q60 20 50 30 Q40 20 30 50" fill="${color}" opacity="0.8" />
                <path d="M35 50 Q50 90 65 50 Q50 10 35 50" fill="${color}" />
            </g>
        </svg>
        `;
    }

    // 2. CREACIÓN CON OFFSET DE ALTURA
    function createTulip(xPos, bottomOffset, delay, scale, color, zIndex) {
        const div = document.createElement('div');
        div.classList.add('tulipan');
        div.innerHTML = getTulipSVG(color);
        
        div.style.left = `${xPos}%`;
        div.style.bottom = `${bottomOffset}px`; // Controlamos la altura base aquí
        
        // El scale ahora solo afecta el tamaño, no la posición base
        div.style.transform = `translateX(-50%) scale(${scale})`; 
        div.style.zIndex = zIndex;
        div.style.transitionDelay = `${delay}s`;

        gardenContainer.appendChild(div);

        setTimeout(() => {
            div.classList.add('crecer');
        }, 50);
    }

    function startGarden() {
        // Lógica de distribución matemática para eliminar huecos
        // step = distancia entre cada tulipán
        const step = 100 / (tulipsPerRow - 1); // -1 asegura que el último toque el 100%

        // --- FILA TRASERA (FONDO) ---
        for (let i = 0; i < tulipsPerRow; i++) {
            // xPos exacto para cubrir de 0 a 100
            const xPos = (i * step); 
            const delay = Math.random() * 1.5;
            
            // Fila trasera: Más arriba (bottom: 20px), más pequeños, oscuros
            createTulip(xPos, 20, delay, 0.75, colorBack, 1);
        }

        // --- FILA DELANTERA (FRENTE) ---
        setTimeout(() => {
            for (let i = 0; i < tulipsPerRow + 1; i++) {
                // Desplazamos la fila delantera a la mitad del paso (step/2) 
                // para que queden intercalados en los huecos de atrás
                // Iniciamos un poco antes (-step/2) para cubrir el borde izquierdo visualmente
                const xPos = (i * step) - (step / 2); 
                const delay = Math.random() * 1.5;

                // Fila delantera: Más abajo (bottom: -40px), más grandes, claros
                // bottom negativo oculta el inicio del tallo y da sensación de cercanía
                createTulip(xPos, -40, delay, 1.2, colorFront, 10);
            }
        }, 300); // Salen un pelín después
    }

    function typeWriter() {
        if (index < message.length) {
            // Si encontramos un salto de línea (\n), usamos <br> HTML
            if (message.charAt(index) === '\n') {
                textElement.innerHTML += '<br>';
            } else {
                textElement.innerHTML += message.charAt(index);
            }
            index++;
            // Velocidad variable para que parezca escritura humana real
            const randomSpeed = 30 + Math.random() * 50; 
            setTimeout(typeWriter, randomSpeed);
        } else {
            startGarden();
        }
    }

    typeWriter();
});