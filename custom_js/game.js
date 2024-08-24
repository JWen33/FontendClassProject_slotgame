// game.js
const symbols = ['🍒', '🍋', '🍊', '🍉', '🍇', '🍓'];
const reels = [document.getElementById('reel1'), document.getElementById('reel2'), document.getElementById('reel3')];
const spinButton = document.getElementById('spinButton');
const resultDiv = document.getElementById('result');

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function spinReels() {
    let results = [];
    for (let i = 0; i < reels.length; i++) {
        let symbol = getRandomSymbol();
        reels[i].textContent = symbol;
        results.push(symbol);
    }
    return results;
}

function checkResults(results) {
    if (results[0] === results[1] && results[1] === results[2]) {
        resultDiv.textContent = '恭喜！你赢了！';
    } else {
        resultDiv.textContent = '再试一次。';
    }
}

spinButton.addEventListener('click', () => {
    let results = spinReels();
    checkResults(results);
});
