const c = document.getElementById('canvas'), x = c.getContext('2d'), i = new Input();
let u = new Ball(112, 80, Math.floor(Math.random() * 4) + 1);
const b = [u];
for (let j = 0; j < 16; j++) for (let k = 0; k < 8; k++) if (!k || !j || k == 7 || j == 15) b.push(new Ball(k * 32 + 16, j * 32 + 16, 0));
const cls = ['#808080', '#f00', '#0f0', '#00f', '#ff0'];
const g = () => {
    const v = i.get();
    v && (v == 4 ? u.put(u.x - 32, u.y, b) : v == 6 ? u.put(u.x + 32, u.y, b) : v == 2 ? u.put(u.x, u.y + 32, b) : v == 8 ? u.put(u.x, u.y - 32, b) : v == 5 && (u = new Ball(112, 80, Math.floor(Math.random() * 4) + 1), b.push(u)));
    b.forEach(o => o !== u && o.update(b));
    x.clearRect(0, 0, 256, 512);
    b.forEach(o => (x.fillStyle = cls[o.c], x.beginPath(), x.arc(o.x, o.y, 16, 0, 7), x.fill()));
    requestAnimationFrame(g);
};
g();
