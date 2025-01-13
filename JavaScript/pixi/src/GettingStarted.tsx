import { Sprite, Stage, useTick } from '@pixi/react';
import { useState } from 'react';

const BUNNY_URL = 'https://pixijs.io/pixi-react/img/bunny.png';

const Rabbit:React.FC = () => {
  const [rotation, setRotation] = useState(0);

  useTick((delta) => {
    setRotation((rotation) => rotation + 0.1 * delta);
  });

  return (
    <Sprite
      image={BUNNY_URL}
      anchor={0.5}
      x={window.innerWidth / 2}
      y={window.innerHeight / 2}
      rotation={rotation}
    />
  )
}

const GettingStarted:React.FC = () => {
  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      options={{
        background: '#1099bb',
        resizeTo: window
      }}
    >
      <Rabbit />
    </Stage>
  );
};

export default GettingStarted;
