// 2nd dimension of perlin noise - controls the horizontal position
let yPos = 0.0; // 2nd dimension of perlin noise
var canvas;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-10')
}

function draw() {
    background(255, 255, 255);

    strokeWeight(0);
    stroke(0);
    fill(118, 170, 206);
    // We are going to draw a polygon out of the wave points
    beginShape();

    let xPos = 0; // Option #1: 2D Noise
    // let xoff = yoff; // Option #2: 1D Noise

    // Iterate over horizontal pixels
    for (let x = 0; x <= width; x += 10) {
        // Calculate a y value according to noise, map to

        // Option #1: 2D Noise
        let y = map(noise(xPos, yPos/2), 0, 1, 350, 300);


        // Set the vertex
        vertex(x, y);
        // Increment x dimension for noise
        xPos += 0.05;
    }
    // increment y dimension for noise
    yPos += 0.01;
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
}

