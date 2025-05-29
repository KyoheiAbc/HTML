const c = document.getElementById('canvas'), x = c.getContext('2d'), i = new Input();
let u = new Ball(112, 80, Math.floor(Math.random() * 4) + 1);
const b = []; b.push(u);
for (let j = 0; j < 16; j++)for (let k = 0; k < 8; k++)if (k == 0 || j == 0 || k == 7 || j == 15) b.push(new Ball(k * 32 + 16, j * 32 + 16, 0));
const cls = ['#808080', '#ff0000', '#00ff00', '#0000ff', '#ffff00'];
const g = () => {
    const v = i.getInput();
    if (v) {
        switch (v) {
            case 4: u.put(u.x - 32, u.y, b); break;
            case 6: u.put(u.x + 32, u.y, b); break;
            case 2: u.put(u.x, u.y + 32, b); break;
            case 8: u.put(u.x, u.y - 32, b); break;
            case 5: const n = new Ball(112, 80, Math.floor(Math.random() * 4) + 1); b.push(n); u = n; break;
        }
    }
    for (let j = 0; j < b.length; j++) if (b[j] !== u) b[j].update(b);
    x.clearRect(0, 0, 256, 512);
    for (let j = 0; j < b.length; j++) {
        x.fillStyle = cls[b[j].colorNumber];
        x.beginPath();
        x.arc(b[j].x, b[j].y, 16, 0, 7);
        x.fill();
    }
    requestAnimationFrame(g);
};
g();
