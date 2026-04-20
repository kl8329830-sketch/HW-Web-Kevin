// canvas size
const W = 1280;
const H = 720;

// bar dimensions
const barHeight = 15;
const barGap = 6;

// player bars (bottom of screen)
const playerBarX = 60;
const playerBarW = W - 120;
const playerHpY = H - 20;
const playerBlockY = playerHpY - barHeight - barGap;

// enemy bars (top of screen)
const enemyHpY = 20;
const enemyBlockY = enemyHpY + barHeight + barGap;

// bottom HUD positions
const cardPileBY = playerBlockY - 35;
const energyTextY = cardPileBY - 30;
const handY = cardPileBY - 200;

// card dimensions
const cardW = 130;
const cardH = 170;

// colors
const colBackground = [10, 15, 35];  // dark navy
const colHpBar = [60, 180, 100];  // green
const colBlockBar = [80, 160, 220];  // sky blue
const colBarTrack = [30, 35, 55];   // dark blue-grey
const colCard = [25, 35, 70];   // dark blue
const colCardHover = [50, 80, 160];  // medium blue
const colEndTurnButton = [160, 50, 50];   // dark red
const colEndTurnButtonHover = [210, 80, 80];   // light red
const colPileButton = [40, 50, 100];  // dark blue
const colPileButtonHover = [80, 100, 180];  // medium blue
const colText = [200, 220, 255];  // light blue-white
const colSubText = [100, 120, 160];  // muted blue-grey
const colWeakDebuff = [180, 100, 220];  // purple
const colTutorialButton = [40, 60, 120];  // dark blue
const colTutorialButtonHover = [70, 100, 180];  // hover