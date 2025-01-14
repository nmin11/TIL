import { Container, Sprite, Stage, TilingSprite, useTick } from '@pixi/react';
import { DisplacementFilter, Texture, Sprite as PIXISprite, WRAP_MODES } from 'pixi.js';
import { useEffect, useState } from 'react';

const FISH_COUNT = 20;
const BACKGROUND_URL = 'https://pixijs.com/assets/tutorials/fish-pond/pond_background.jpg';
const OVERLAY_URL = 'https://pixijs.com/assets/tutorials/fish-pond/wave_overlay.png';
const DISPLACEMENT_URL = 'https://pixijs.com/assets/tutorials/fish-pond/displacement_map.png';
const FISH_URLS = [
  'https://pixijs.com/assets/tutorials/fish-pond/fish1.png',
  'https://pixijs.com/assets/tutorials/fish-pond/fish2.png',
  'https://pixijs.com/assets/tutorials/fish-pond/fish3.png',
  'https://pixijs.com/assets/tutorials/fish-pond/fish4.png',
  'https://pixijs.com/assets/tutorials/fish-pond/fish5.png',
];

interface Fish {
  id: number;
  texture: string;
  x: number;
  y: number;
  direction: number;
  speed: number;
  turnSpeed: number;
  scale: number;
}

const Background: React.FC = () => {
  return (
    <Sprite
      image={BACKGROUND_URL}
      anchor={0.5}
      x={window.innerWidth / 2}
      y={window.innerHeight / 2}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  )
}

const Fishes:React.FC = () => {
  const [fishes, setFishes] = useState<Fish[]>([]);

  useEffect(() => {
    setFishes(Array.from({ length: FISH_COUNT }).map((_, i) => ({
      id: i,
      texture: FISH_URLS[Math.floor(Math.random() * FISH_URLS.length)],
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      direction: Math.random() * Math.PI * 2,
      speed: 2 + Math.random() * 2,
      turnSpeed: Math.random() - 0.8,
      scale: 0.5 + Math.random() * 0.2,
    })));
  }, []);

  useTick(() => {
    setFishes((prevFishes) =>
      prevFishes.map((fish) => {
        const stagePadding = 100;
        const boundWidth = window.innerWidth + stagePadding * 2;
        const boundHeight = window.innerHeight + stagePadding * 2;

        const newDirection = fish.direction + fish.turnSpeed * 0.01;
        const newX = fish.x + Math.sin(newDirection) * fish.speed;
        const newY = fish.y + Math.cos(newDirection) * fish.speed;

        const wrappedX =
          newX < -stagePadding
            ? newX + boundWidth
            : newX > window.innerWidth + stagePadding
            ? newX - boundWidth
            : newX;
        const wrappedY =
          newY < -stagePadding
            ? newY + boundHeight
            : newY > window.innerHeight + stagePadding
            ? newY - boundHeight
            : newY;

        return {
          ...fish,
          direction: newDirection,
          x: wrappedX,
          y: wrappedY,
        };
      })
    );
  });

  return (
    <Container>
      {fishes.map((fish: Fish) => (
        <Sprite
            key={fish.id}
            image={fish.texture}
            x={fish.x}
            y={fish.y}
            anchor={0.5}
            scale={fish.scale}
            rotation={-fish.direction - Math.PI / 2}
            zIndex={fish.id}
          />
      ))}
    </Container>
  )
}

const WaterOverlay:React.FC = () => {
  const [tilePosition, setTilePosition] = useState({ x: 0, y: 0 });

  useTick((delta) => {
    setTilePosition((prev) => ({
      x: prev.x - delta,
      y: prev.y - delta,
    }));
  });

  return (
    <TilingSprite
      texture={Texture.from(OVERLAY_URL)}
      width={window.innerWidth}
      height={window.innerHeight}
      tilePosition={tilePosition}
    />
  )
}

const FishPond:React.FC = () => {
  const [displacementSprite] = useState(() => {
    const s = PIXISprite.from(DISPLACEMENT_URL);
    s.texture.baseTexture.wrapMode = WRAP_MODES.REPEAT;
    s.scale.x = 4;
    s.scale.y = 4;
    return s;
  });

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      options={{
        background: '#1099bb',
        resizeTo: window
      }}
    >
      <Container filters={[new DisplacementFilter(displacementSprite, 30)]}>
        <Background />
        <Fishes />
        <WaterOverlay />
      </Container>
    </Stage>
  )
}

export default FishPond;
