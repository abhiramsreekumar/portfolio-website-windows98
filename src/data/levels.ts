export interface Rect {
  x: number;
  bottom: number;
  width: number;
  height: number;
}

export interface Hazard extends Rect {
  type: 'fire' | 'water';
}

export interface LevelData {
  id: number;
  startX: number;
  startBottom: number;
  platforms: Rect[];
  hazards: Hazard[];
  door: Rect;
}

// A standard screen is ~1200x800 for the game area. 
// We will use abstract coords, bottom 80 is the floor.
const FLOOR_HEIGHT = 80;

export const gameLevels: LevelData[] = [
  {
    id: 1,
    startX: 50,
    startBottom: FLOOR_HEIGHT,
    platforms: [
      { x: 300, bottom: FLOOR_HEIGHT + 60, width: 80, height: 20 },
      { x: 450, bottom: FLOOR_HEIGHT + 120, width: 80, height: 20 },
      { x: 650, bottom: FLOOR_HEIGHT + 60, width: 80, height: 20 },
    ],
    hazards: [
      { type: 'water', x: 200, bottom: FLOOR_HEIGHT, width: 80, height: 20 }
    ],
    door: { x: 800, bottom: FLOOR_HEIGHT, width: 40, height: 60 }
  },
  {
    id: 2,
    startX: 50,
    startBottom: FLOOR_HEIGHT,
    platforms: [
      { x: 200, bottom: FLOOR_HEIGHT + 80, width: 60, height: 20 },
      { x: 350, bottom: FLOOR_HEIGHT + 160, width: 60, height: 20 },
      { x: 550, bottom: FLOOR_HEIGHT + 160, width: 60, height: 20 },
      { x: 750, bottom: FLOOR_HEIGHT + 80, width: 60, height: 20 },
    ],
    hazards: [
      { type: 'fire', x: 450, bottom: FLOOR_HEIGHT, width: 60, height: 25 },
      { type: 'water', x: 650, bottom: FLOOR_HEIGHT, width: 60, height: 20 }
    ],
    door: { x: 900, bottom: FLOOR_HEIGHT, width: 40, height: 60 }
  },
  {
    id: 3,
    startX: 50,
    startBottom: FLOOR_HEIGHT,
    platforms: [
      { x: 150, bottom: FLOOR_HEIGHT + 40, width: 40, height: 20 },
      { x: 300, bottom: FLOOR_HEIGHT + 100, width: 40, height: 20 },
      { x: 450, bottom: FLOOR_HEIGHT + 160, width: 40, height: 20 },
      { x: 600, bottom: FLOOR_HEIGHT + 220, width: 40, height: 20 },
      { x: 720, bottom: FLOOR_HEIGHT + 280, width: 80, height: 20 },
    ],
    hazards: [
      { type: 'fire', x: 200, bottom: FLOOR_HEIGHT, width: 400, height: 25 }
    ],
    door: { x: 740, bottom: FLOOR_HEIGHT + 280, width: 40, height: 60 }
  },
  {
    id: 4,
    startX: 50,
    startBottom: FLOOR_HEIGHT,
    platforms: [
      { x: 250, bottom: FLOOR_HEIGHT + 60, width: 100, height: 20 },
      { x: 500, bottom: FLOOR_HEIGHT + 120, width: 100, height: 20 },
    ],
    hazards: [
      { type: 'water', x: 300, bottom: FLOOR_HEIGHT, width: 150, height: 20 },
      { type: 'fire', x: 650, bottom: FLOOR_HEIGHT, width: 150, height: 25 }
    ],
    door: { x: 800, bottom: FLOOR_HEIGHT, width: 40, height: 60 }
  }
];
