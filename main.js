const start_config = {
    'lineSize': 5,
    'color': '#333',
}

window.onload = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const indicator = document.getElementById('indicator');

    canvas.height = document.body.clientHeight;
    canvas.width = document.body.clientWidth;

    ctx.lineWidth = start_config.lineSize;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = start_config.color;
    ctx.fillStyle = start_config.color;

    let isRec = false,
        newDraw = false,
        posX = [],
        posY = []

    canvas.addEventListener("mousedown", (e) => {
        console.log('mouse pressed');
        if (isRec) return;
        clearCanvas();
        canvas.onmousemove = (e) => recordMousePos(e);
    })

    canvas.addEventListener("mouseup", () => stopDrawing());

    function recordMousePos(e) {
        posX.push(e.clientX);
        posY.push(e.clientY);
        drawLine(e.clientX, e.clientY);

    }

    function drawLine(x, y) {
        ctx.lineTo(x, y)
        ctx.stroke();
    }

    function clearCanvas() {
        if (newDraw) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            newDraw = false;
            if (sketch != null) {
                sketch.style.visibility = 'visible';
            }
        }
        ctx.beginPath();
    }

    function stopDrawing() {
        canvas.onmousemove = null;
        posX.push(undefined);
        posY.push(undefined);
    }

}