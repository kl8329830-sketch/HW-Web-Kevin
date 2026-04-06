
// CANVAS SIZE


const W = 1280;
const H = 720;


// BAR DIMENSIONS


const BarHeight = 15; // height of each bar in pixels
const BarGap = 6;  // gap between hp bar and block bar


// PLAYER BARS (bottom of screen)


const PlayerBar_X = 60;
const PlayerBar_W = W - 120;
const PlayerHP_Y = H - 20;
const PlayerBlock_Y = PlayerHP_Y - BarHeight - BarGap;


// ENEMY BARS (top of screen)


const EnemyHP_Y = 20;
const EnemyBlock_Y = EnemyHP_Y + BarHeight + BarGap;


// BOTTOM HUD POSITIONS


const cardPileB_Y = PlayerBlock_Y - 35; // y position of draw/discard pile buttons
const EnergyText_Y = cardPileB_Y - 30;   // y position of energy text and end turn button
const Hand_Y = cardPileB_Y - 200;  // y position of hand cards


// CARD DIMENSIONS


const Card_W = 130;
const Card_H = 170;


// COLORS


const COL_Background = [10, 15, 35];  // dark navy background
const COL_HpBar = [60, 180, 100];  // medium green
const COL_BlockBar = [80, 160, 220];  // sky blue
const COL_BarTrack = [30, 35, 55];   // dark blue-grey (empty bar)
const COL_Card = [25, 35, 70];   // dark blue
const COL_CardHover = [50, 80, 160];  // medium blue
const COL_EndTurnButton = [160, 50, 50];   // dark red
const COL_EndTurnButtonHover = [210, 80, 80];   // light red
const COL_PileButton = [40, 50, 100];  // dark blue
const COL_PileButtonHover = [80, 100, 180];  // medium blue
const COL_Text = [200, 220, 255];  // light blue-white
const COL_SubText = [100, 120, 160];  // muted blue-grey
const COL_WeakDebuff = [180, 100, 220];  // purple