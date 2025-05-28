const input = new Input();

const gameLoop = () => {

    console.log(input.getInput());

    setTimeout(gameLoop, 33);
};

gameLoop();
