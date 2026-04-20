function shuffleDeck() {
  for (let i = drawPile.length - 1; i > 0; i--) {
    let j = floor(random(i + 1));
    let tmp = drawPile[i];
    drawPile[i] = drawPile[j];
    drawPile[j] = tmp;
  }
}

function drawCards(n) {
  for (let i = 0; i < n; i++) {
    if (drawPile.length === 0) {
      drawPile = discardPile;
      discardPile = [];
      shuffleDeck();
    }
    if (drawPile.length > 0) hand.push(drawPile.pop());
  }
}