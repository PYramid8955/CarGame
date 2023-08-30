const car = document.getElementById("car");
const backlights = document.querySelectorAll('#backlights>span')
let isMovingBackward = false; // Initialize as false
let angle = 0; // Initialize angle
let posX = 0;  // Initialize X position
let posY = 0;  // Initialize Y position
const keysPressed = {}; // Track pressed keys
let movementInterval = null; // Timer interval for continuous movement

function moveCar() {
    let moveX = 0;
    let moveY = 0;

    if (keysPressed['w']) {
        moveX += Math.sin(angle * (Math.PI / 180)) * 20;
        moveY -= Math.cos(angle * (Math.PI / 180)) * 20;
        isMovingBackward = false; // Moving forward
    }

    if (keysPressed['s']) {
        moveX -= Math.sin(angle * (Math.PI / 180)) * 20;
        moveY += Math.cos(angle * (Math.PI / 180)) * 20;
        isMovingBackward = true; // Moving backward

        // Rotate the opposite way when moving backward ('s')
        if (keysPressed['a']) {
            angle += 10;
        }

        if (keysPressed['d']) {
            angle -= 10;
        }
    }

    // Rotation logic for 'w' movement remains the same
    if (keysPressed['w'] && !keysPressed['s']) {
        if (keysPressed['a']) {
            angle -= 10;
        }

        if (keysPressed['d']) {
            angle += 10;
        }
    }

    posX += moveX;
    posY += moveY;

    car.style.transform = `translate(${posX}px, ${posY}px) rotate(${angle}deg)`;

    // Change backlights color based on whether the car is moving backward
    for (i of backlights) i.style.backgroundColor = isMovingBackward ? 'white' : 'rgb(255, 109, 109)';
}


document.addEventListener('keydown', (event) => {
    if (['a', 's', 'd', 'w'].includes(event.key)) {
        keysPressed[event.key] = true;
        if (!movementInterval) {
            movementInterval = setInterval(moveCar, 100); // Call moveCar() every 100 milliseconds
        }
    }
});

document.addEventListener('keyup', (event) => {
    if (['a', 's', 'd', 'w'].includes(event.key)) {
        keysPressed[event.key] = false;
        if (!(keysPressed['w'] || keysPressed['s'])) 
            for (i of backlights) i.style.backgroundColor = 'red';
        if (!Object.values(keysPressed).some(value => value)) {
            clearInterval(movementInterval); // Clear the interval if no keys are pressed
            movementInterval = null;
        }
    }
});
