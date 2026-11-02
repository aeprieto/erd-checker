/*
 * Bloque que se incrusta en la pagina de la pregunta de Moodle.
 *
 * Si el comprobador principal responde, se muestra en el iframe. Si no, el
 * comprobador se construye dentro de la propia pagina (iframe blob:), con
 * recursos que la politica de seguridad del campus permite: app.js desde
 * jsDelivr y CodeMirror y crypto-js desde cdnjs.
 */
(function () {
    // Comprobador principal
    const PRINCIPAL = 'https://i3lab.unex.es/sql-snippets/erd-checker.html';
    // El iframe blob: tiene el mismo origen que la pagina del campus
    const ORIGENES = [new URL(PRINCIPAL).origin, window.location.origin];
    const ESPERA_MS = 3000;
    const K = 'PcPLJeUDB0ivbtSN';

    const APP_JS = 'https://cdn.jsdelivr.net/gh/aeprieto/erd-checker@main/app.js';
    const CDN = 'https://cdnjs.cloudflare.com/ajax/libs';
    const CSS = `/* Reset some default styles */
body, h1, h2, p, ul, li, table {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f7f6;
}

/* Toolbar Styling */
.toolbar {
    background-color: #fff;
    padding: 10px 40px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 1000;
}

.toolbar h1 {
    margin: 0;
    font-size: 1.8em;
    color: #333;
}

.toolbar-controls {
    display: flex;
    align-items: center;
    gap: 15px;
}

/* Main Content Area */
main {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px 40px;
}

#loadStatus {
    margin-bottom: 20px;
    padding: 15px;
    border-radius: 4px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 14px;
}

.description {
    margin-bottom: 20px;
    color: #555;
}

/* CodeMirror Editor */
.CodeMirror {
    height: 600px !important;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    margin-top: 10px;
}

/* Button Styling */
button {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1em;
    font-weight: bold;
    transition: background-color 0.3s ease, color 0.3s ease;
}

#checkBtn {
    background-color: #007bff;
    color: #fff;
}

#checkBtn:hover {
    background-color: #0056b3;
}

/* Submit Button */
#submitBtn {
    background-color: #28a745;
    color: #fff;
}

#submitBtn:hover:not(:disabled) {
    background-color: #218838;
}

#submitBtn:disabled {
    background-color: #6c757d;
    color: #ccc;
    cursor: not-allowed;
}

/* Results Display */
#results {
    margin-top: 20px;
    padding: 15px;
    border-radius: 4px;
    font-family: 'Courier New', Courier, monospace;
    white-space: pre-wrap;
}

.success {
    background-color: #e6ffed;
    border: 1px solid #b7ebc9;
    color: #257942;
}

.error {
    background-color: #ffebe6;
    border: 1px solid #ffc5b3;
    color: #c0392b;
}

.warning {
    background-color: #fff3cd;
    border: 1px solid #ffcc00;
    color: #856404;
}

/* Info Box */
.info {
    margin-top: 20px;
    padding: 15px;
    background-color: #e7f3ff;
    border: 1px solid #b3d9ff;
    border-radius: 4px;
    font-size: 13px;
}

.info h3 {
    margin-top: 0;
    color: #0056b3;
}

.info code {
    background-color: #f4f4f4;
    padding: 2px 6px;
    border-radius: 3px;
    font-family: 'Courier New', Courier, monospace;
}`;

    console.log('erd-checker.js cargado');
    const iframe = document.getElementById('checker');

    window.addEventListener('message', function (event) {
        if (!ORIGENES.includes(event.origin)) return;
        if (event.source !== iframe.contentWindow) return;

        if (event.data.type === 'md5') {
            const answer = document.getElementById('id_answer');
            if (answer) {
                answer.hidden = true;
                answer.value = event.data.hash;
            }
            const submit = document.getElementById('id_submitbutton');
            if (submit) {
                submit.hidden = true;
                submit.click();
            } else {
                console.error('Submit button not found!');
            }
        } else if (event.data.type === 'ping') {
            iframe.contentWindow.postMessage('false', event.origin);
        }
    });

    async function principalDisponible() {
        const control = new AbortController();
        const temporizador = setTimeout(() => control.abort(), ESPERA_MS);
        try {
            await fetch(PRINCIPAL, { mode: 'no-cors', cache: 'no-store', signal: control.signal });
            return true;
        } catch (e) {
            return false;
        } finally {
            clearTimeout(temporizador);
        }
    }

    async function leerParametro(p) {
        const b = p.replace(/-/g, '+').replace(/_/g, '/');
        const d = atob(b + '='.repeat((4 - b.length % 4) % 4));
        const e = new TextEncoder().encode(K);
        const u = Uint8Array.from(d, (x, i) => x.charCodeAt(0) ^ e[i % e.length]);
        const f = new Blob([u]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
        return await new Response(f).text();
    }

    // La misma pagina que erd-checker.html, con la solucion ya incluida
    function paginaComprobador(s) {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ERD Checker</title>
    <style>${CSS}</style>
    <link rel="stylesheet" href="${CDN}/codemirror/5.65.2/codemirror.min.css">
    <link rel="stylesheet" href="${CDN}/codemirror/5.65.2/theme/monokai.min.css">
    <script src="${CDN}/crypto-js/4.1.1/crypto-js.min.js"></script>
</head>
<body>
    <div class="toolbar">
        <h1>ERD Checker</h1>
        <div class="toolbar-controls">
            <button id="checkBtn">Check</button>
            <button id="submitBtn" disabled hidden>Submit</button>
        </div>
    </div>
    <main>
        <p class="description">Enter your ERD solution in the text area below using bigER notation.</p>
        <textarea id="studentSolution" placeholder="entity Student { ... }"></textarea>
        <div id="results"></div>
        <div id="loadStatus"></div>
    </main>
    <script src="${CDN}/codemirror/5.65.2/codemirror.min.js"></script>
    <script src="${CDN}/codemirror/5.65.2/addon/mode/simple.min.js"></script>
    <script>
        (function () {
            var s = '${s}';
            var g = URLSearchParams.prototype.get;
            URLSearchParams.prototype.get = function (n) {
                return n === 's' ? s : g.call(this, n);
            };
        })();
    </script>
    <script src="${APP_JS}"></script>
</body>
</html>`;
    }

    async function cargarComprobador() {
        if (!document.getElementById('id_answer')) {
            borrarRespuestaMD5('text_to_html');
            return;
        }

        const answer = document.getElementById('id_answer');
        if (answer) answer.hidden = true;
        const label = document.getElementById('id_answer_label');
        if (label) label.innerHTML = '';
        const submit = document.getElementById('id_submitbutton');
        if (submit) submit.hidden = true;

        const texto = await leerParametro(checker_parameter);
        const s = btoa(encodeURIComponent(texto));

        if (await principalDisponible()) {
            iframe.src = PRINCIPAL + '?s=' + encodeURIComponent(s);
        } else {
            console.warn('Comprobador principal no disponible: se usa el alternativo');
            const pagina = new Blob([paginaComprobador(s)], { type: 'text/html' });
            iframe.src = URL.createObjectURL(pagina);
        }
        iframe.hidden = false;
    }

    function borrarRespuestaMD5(className) {
        const md5Regex = /^[a-f0-9]{32}$/;
        for (const div of document.querySelectorAll('.' + className)) {
            if (md5Regex.test(div.innerHTML)) {
                div.innerHTML = '';
                return;
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', cargarComprobador);
    } else {
        cargarComprobador();
    }
})();
