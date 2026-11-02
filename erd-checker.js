/*
 * Bloque que se incrusta en la pagina de la pregunta de Moodle.
 */
(function () {
    // Comprobador principal. Cuando i3lab de produccion tenga la version actual,
    // cambiar a 'https://i3lab.unex.es/sql-snippets/erd-checker.html'
    const PRINCIPAL = 'https://i3lab.unex.es/sql-snippets-beta/erd-checker.html';
    const ALTERNATIVO = new URL('erd-checker.html', document.currentScript.src).href;
    const ORIGENES = [new URL(PRINCIPAL).origin, new URL(ALTERNATIVO).origin];
    const ESPERA_MS = 3000;
    const K = 'PcPLJeUDB0ivbtSN';

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

        if (await principalDisponible()) {
            const texto = await leerParametro(checker_parameter);
            iframe.src = PRINCIPAL + '?s=' + encodeURIComponent(btoa(encodeURIComponent(texto)));
        } else {
            console.warn('Comprobador principal no disponible: se usa el alternativo');
            iframe.src = ALTERNATIVO + '?c=' + checker_parameter;
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
