const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

// canvas size
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOR; // set line color
ctx.fillStyle = INITIAL_COLOR; // set fill color
ctx.lineWidth = 2.5; // set line width (선 두께)
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

let painting = false;
let filling = false;

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) { // 마우스를 떼고 있을 때 (painting = false)
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else { // 마우스를 누르고 있을 때 (painting = true)
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown(event) {
    painting = true;
}

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
    if (filling)
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove); // 마우스 움직일 때마다 작동
    canvas.addEventListener("mousedown", startPainting); // 마우스 클릭할 때마다 작동
    canvas.addEventListener("mouseup", stopPainting); // 마우스 클릭을 떼면 작동
    canvas.addEventListener("mouseleave", stopPainting); // 마우스가 바깥으로 나가면 작동
    canvas.addEventListener("click", handleCanvasClick); // 마우스 클릭하면 작동
    canvas.addEventListener("contextmenu", handleCM); // 우클릭 (메뉴창) 누를 시 작동
}

if (colors) {
    Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
}

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}