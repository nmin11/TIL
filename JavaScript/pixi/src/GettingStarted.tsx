import { Sprite, Stage, useTick } from '@pixi/react';
import { useState } from 'react';

const Rabbit:React.FC = () => {
  const bunnyUrl = 'https://pixijs.io/pixi-react/img/bunny.png';
  const [rotation, setRotation] = useState(0);

  useTick((delta) => {
    setRotation((rotation) => rotation + 0.1 * delta);
  });

  return (
    <Sprite
      image={bunnyUrl}
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
        background: '#1099bb'
      }}
    >
      <Rabbit />
    </Stage>
  );
};

export default GettingStarted;
