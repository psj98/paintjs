const canvas = document.getElementById("jsCanvas");

let painting = false;

function stopPainting() {
    painting = false;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
}

function onMouseDown(event) {
    painting = true;
}

function onMouseUp(event) {
    stopPainting();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove); // 마우스 움직일 때마다 작동
    canvas.addEventListener("mousedown", onMouseDown); // 마우스 클릭할 때마다 작동
    canvas.addEventListener("mouseup", onMouseUp); // 마우스 클릭을 떼면 작동
    canvas.addEventListener("mouseleave", stopPainting); // 마우스가 바깥으로 나가면 작동
}