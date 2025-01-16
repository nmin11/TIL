import { Container, Graphics, Stage, Sprite, useTick } from '@pixi/react'
import * as PIXI from 'pixi.js';
import moonSvg from './assets/moon.svg';
import { useCallback, useState, useEffect, useRef } from 'react';

const Stars:React.FC<{width:number, height:number}> = ({width, height}) => {
  const starCount = 20;

  const drawStars = (g:PIXI.Graphics) => {
    for (let i = 0; i < starCount; i++) {
      const x = (i * 0.78695 * width) % width;
      const y = (i * 0.9382 * height) % height;
      const radius = 2 + Math.random() * 3;
      const rotation = Math.random() * Math.PI * 2;
      const points: number[] = [];
      
      for (let j = 0; j < 10; j++) {
        const r = j % 2 === 0 ? radius : radius / 2;
        const angle = (j * Math.PI / 5) + rotation;
        points.push(
          x + r * Math.cos(angle),
          y + r * Math.sin(angle)
        );
      }

      g.beginFill(0xffdf00, radius / 5);
      g.drawPolygon(points);
      g.endFill();
    }
  }

  return (
    <Graphics draw={drawStars} />
  )
}

const Moon:React.FC = () => {
  return (
    <Sprite
      image={moonSvg}
      x={window.innerWidth * 0.8}
      y={window.innerHeight * 0.2}
    />
  )
}

const Mountains: React.FC = () => {
  const [position1, setPosition1] = useState(0);
  const [position2, setPosition2] = useState(window.innerWidth);

  const drawMountainGroup = useCallback((g: PIXI.Graphics, xOffset: number) => {
    g.clear();
    
    const width = window.innerWidth / 2;
    const startY = window.innerHeight;

    const startXLeft = 0 + xOffset;
    const startXMiddle = window.innerWidth / 4 + xOffset;
    const startXRight = window.innerWidth / 2 + xOffset;

    const heightLeft = window.innerHeight / 2;
    const heightMiddle = (window.innerHeight * 4) / 5;
    const heightRight = (window.innerHeight * 2) / 3;

    const colorLeft = 0xc1c0c2;
    const colorMiddle = 0x7e818f;
    const colorRight = 0x8c919f;

    // Draw the middle mountain
    g.beginFill(colorMiddle);
    g.moveTo(startXMiddle, startY);
    g.bezierCurveTo(
      startXMiddle + width / 2,
      startY - heightMiddle,
      startXMiddle + width / 2,
      startY - heightMiddle,
      startXMiddle + width,
      startY
    );
    g.endFill();

    // Draw the left mountain
    g.beginFill(colorLeft);
    g.moveTo(startXLeft, startY);
    g.bezierCurveTo(
      startXLeft + width / 2,
      startY - heightLeft,
      startXLeft + width / 2,
      startY - heightLeft,
      startXLeft + width,
      startY
    );
    g.endFill();

    // Draw the right mountain
    g.beginFill(colorRight);
    g.moveTo(startXRight, startY);
    g.bezierCurveTo(
      startXRight + width / 2,
      startY - heightRight,
      startXRight + width / 2,
      startY - heightRight,
      startXRight + width,
      startY
    );
    g.endFill();
  }, []);

  useTick((delta: number) => {
    const speed = 0.5;
    const moveAmount = delta * speed;

    setPosition1(prev => {
      if (prev <= -window.innerWidth) {
        return position2 + window.innerWidth;
      }
      return prev - moveAmount;
    });

    setPosition2(prev => {
      if (prev <= -window.innerWidth) {
        return position1 + window.innerWidth;
      }
      return prev - moveAmount;
    });
  });

  return (
    <>
      <Graphics draw={(g) => drawMountainGroup(g, position1)} />
      <Graphics draw={(g) => drawMountainGroup(g, position2)} />
    </>
  )
};

const Trees: React.FC = () => {
  const [trees, setTrees] = useState<Array<{x: number, width: number, height: number}>>([]);
  
  useEffect(() => {
    const treeWidth = 200;
    const spacing = 15;
    const count = Math.ceil(window.innerWidth / (treeWidth + spacing)) + 1;
    
    const initialTrees = Array.from({ length: count }, (_, index) => ({
      x: index * (treeWidth + spacing),
      width: treeWidth,
      height: 225 + Math.random() * 50
    }));
    
    setTrees(initialTrees);
  }, []);

  useTick((delta) => {
    const dx = delta * 3;
    const treeWidth = 200;
    const spacing = 15;
    const count = trees.length;

    setTrees(prevTrees => prevTrees.map(tree => {
      let newX = tree.x - dx;
      if (newX <= -(treeWidth / 2 + spacing)) {
        newX += count * (treeWidth + spacing) + spacing * 3;
      }
      return { ...tree, x: newX };
    }));
  });

  const drawTree = useCallback((g: PIXI.Graphics, width: number, height: number) => {
    const trunkWidth = 30;
    const trunkHeight = height / 4;
    const crownHeight = height - trunkHeight;
    const crownLevels = 4;
    const crownLevelHeight = crownHeight / crownLevels;
    const crownWidthIncrement = width / crownLevels;
    
    // Draw the trunk.
    g.beginFill(0x563929);
    g.drawRect(-trunkWidth / 2, -trunkHeight, trunkWidth, trunkHeight);
    g.endFill();

    // Draw a crown layer.
    g.beginFill(0x264d3d);
    for (let index = 0; index < crownLevels; index++) {
      const y = -trunkHeight - crownLevelHeight * index;
      const levelWidth = width - crownWidthIncrement * index;
      const offset = index < crownLevels - 1 ? crownLevelHeight / 2 : 0;

      g.moveTo(-levelWidth / 2, y);
      g.lineTo(0, y - crownLevelHeight - offset);
      g.lineTo(levelWidth / 2, y);
    }
    g.endFill();
  }, []);

  return (
    <>
      {trees.map((tree, index) => (
        <Graphics
          key={index}
          draw={(g) => {
            g.clear();
            g.position.set(tree.x, window.innerHeight - 20);
            drawTree(g, tree.width, tree.height);
          }}
        />
      ))}
    </>
  );
};

const Ground: React.FC = () => {
  const [planks, setPlanks] = useState<Array<{ x: number }>>([]);
  const plankWidth = 50;
  const plankGap = 20;
  const plankHeight = 7.5;
  const plankY = window.innerHeight - 20;
  const railHeight = 10;
  const railY = plankY - plankHeight;
  
  useEffect(() => {
    const plankCount = Math.ceil(window.innerWidth / (plankWidth + plankGap)) + 1;
    
    const initialPlanks = Array.from({ length: plankCount }, (_, index) => ({
      x: index * (plankWidth + plankGap)
    }));
    
    setPlanks(initialPlanks);
  }, []);

  useTick((delta) => {
    const dx = delta * 6;
    const count = planks.length;

    setPlanks(prevPlanks => prevPlanks.map(plank => {
      let newX = plank.x - dx;
      if (newX <= -(plankWidth + plankGap)) {
        newX += count * (plankWidth + plankGap) + plankGap * 1.5;
      }
      return { ...plank, x: newX };
    }));
  });

  const drawGround = useCallback((g: PIXI.Graphics) => {
    // Add the ground to the stage.
    const width = window.innerWidth;
    const groundHeight = 20;
    const groundY = window.innerHeight;

    g.beginFill(0xdddddd);
    g.drawRect(0, groundY - groundHeight, width, groundHeight);
    g.endFill();
  }, []);

  const drawPlank = useCallback((g: PIXI.Graphics) => {
    g.beginFill(0x241811);
    g.drawRect(0, plankY - plankHeight, plankWidth, plankHeight);
    g.endFill();
  }, [plankY]);

  const drawRail = useCallback((g: PIXI.Graphics) => {
    g.beginFill(0x5c5c5c);
    g.drawRect(0, railY - railHeight, window.innerWidth, railHeight);
    g.endFill();
  }, [railY]);

  return (
    <>
      <Graphics draw={drawGround} />
      {planks.map((plank, index) => (
        <Graphics
          key={index}
          draw={drawPlank}
          x={plank.x}
        />
      ))}
      <Graphics draw={drawRail} />
    </>
  );
};

const TrainWheel: React.FC<{ radius: number, x: number, y: number }> = ({ radius, x, y }) => {
  const wheelRef = useRef<PIXI.Graphics>(null);
  const baseRadius = 35;

  useTick((delta) => {
    if (wheelRef.current) {
      const dr = delta * 0.15;
      wheelRef.current.rotation += dr * (baseRadius / radius);
    }
  });

  const drawTrainWheel = (g: PIXI.Graphics) => {
    g.clear();

    const strokeThickness = radius / 3;
    const spokeLength = radius - strokeThickness / 2;

    // Draw the main wheel circle.
    g.beginFill(0x848484)
      .drawCircle(0, 0, radius)
      .endFill();
    
    // Draw the wheel border.
    g.lineStyle(strokeThickness, 0x121212, 1)
      .drawCircle(0, 0, radius);
    
    // Draw the spokes.
    g.lineStyle(strokeThickness, 0x4f4f4f, 1)
      .moveTo(-spokeLength, 0)
      .lineTo(spokeLength, 0)
      .moveTo(0, -spokeLength)
      .lineTo(0, spokeLength);
  }

  return (
    <Graphics ref={wheelRef} draw={drawTrainWheel} x={x} y={y} />
  )
}

const TrainHead: React.FC = () => {
  const drawTrainHead = (g: PIXI.Graphics) => {
    g.clear();

    const frontHeight = 100;
    const frontWidth = 140;
    const frontRadius = frontHeight / 2;

    const cabinHeight = 200;
    const cabinWidth = 150;
    const cabinRadius = 15;

    const chimneyBaseWidth = 30;
    const chimneyTopWidth = 50;
    const chimneyHeight = 70;
    const chimneyDomeHeight = 25;
    const chimneyTopOffset = (chimneyTopWidth - chimneyBaseWidth) / 2;
    const chimneyStartX = cabinWidth + frontWidth - frontRadius - chimneyBaseWidth;
    const chimneyStartY = -frontHeight;

    const roofHeight = 25;
    const roofExcess = 20;

    const doorWidth = cabinWidth * 0.7;
    const doorHeight = cabinHeight * 0.7;
    const doorStartX = (cabinWidth - doorWidth) * 0.5;
    const doorStartY = -(cabinHeight - doorHeight) * 0.5 - doorHeight;

    const windowWidth = doorWidth * 0.8;
    const windowHeight = doorHeight * 0.4;
    const offset = (doorWidth - windowWidth) / 2;

    g.beginFill(0x121212)
      .moveTo(chimneyStartX, chimneyStartY)
      .lineTo(chimneyStartX - chimneyTopOffset, chimneyStartY - chimneyHeight + chimneyDomeHeight)
      .quadraticCurveTo(
        chimneyStartX + chimneyBaseWidth / 2,
        chimneyStartY - chimneyHeight - chimneyDomeHeight,
        chimneyStartX + chimneyBaseWidth + chimneyTopOffset,
        chimneyStartY - chimneyHeight + chimneyDomeHeight
      )
      .lineTo(chimneyStartX + chimneyBaseWidth, chimneyStartY)
      .endFill();

    g.beginFill(0x7f3333)
      .drawRoundedRect(
        cabinWidth - frontRadius - cabinRadius,
        -frontHeight,
        frontWidth + frontRadius + cabinRadius,
        frontHeight,
        frontRadius
      )
      .endFill();

    g.beginFill(0x725f19)
      .drawRoundedRect(0, -cabinHeight, cabinWidth, cabinHeight, cabinRadius)
      .endFill();

    g.beginFill(0x52431c)
      .drawRect(-roofExcess / 2, cabinRadius - cabinHeight - roofHeight, cabinWidth + roofExcess, roofHeight)
      .endFill();

    g.lineStyle(3, 0x52431c)
      .drawRoundedRect(doorStartX, doorStartY, doorWidth, doorHeight, cabinRadius);

    g.beginFill(0x848484)
      .drawRoundedRect(doorStartX + offset, doorStartY + offset, windowWidth, windowHeight, 10)
      .endFill();
  }

  const bigWheelRadius = 55;
  const smallWheelRadius = 35;
  const wheelGap = 15;
  const wheelOffsetY = -5;
  const backWheelX = bigWheelRadius;
  const backWheelY = wheelOffsetY;
  const midWheelX = backWheelX + bigWheelRadius + smallWheelRadius + wheelGap;
  const midWheelY = backWheelY + bigWheelRadius - smallWheelRadius;
  const frontWheelX = midWheelX + smallWheelRadius * 2 + wheelGap;
  const frontWheelY = midWheelY;

  return (
    <Container>
      <Graphics draw={drawTrainHead} />
      <TrainWheel radius={bigWheelRadius} x={backWheelX} y={backWheelY} />
      <TrainWheel radius={smallWheelRadius} x={midWheelX} y={midWheelY} />
      <TrainWheel radius={smallWheelRadius} x={frontWheelX} y={frontWheelY} />
    </Container>
  )
}

const TrainContainer: React.FC = () => {
  const containerHeight = 125;
  const containerWidth = 200;
  const containerRadius = 15;
  const edgeHeight = 25;
  const edgeExcess = 20;
  const connectorWidth = 30;
  const connectorHeight = 10;
  const connectorGap = 10;
  const connectorOffsetY = 20;

  const wheelRadius = 35;
  const wheelGap = 40;
  const centerX = (containerWidth + edgeExcess) / 2;
  const offsetX = wheelRadius + wheelGap / 2;
  const backWheelX = centerX - offsetX;
  const frontWheelX = centerX + offsetX;
  const backWheelY = 15;
  const frontWheelY = 15;

  const trainContainerRef = useRef<PIXI.Container>(null);
  
  useEffect(() => {
    if (trainContainerRef.current) {
      trainContainerRef.current.x = -trainContainerRef.current.width;
    }
  }, []);

  const drawTrainContainer = (g: PIXI.Graphics) => {
    g.clear();

    // Draw the container body.
    g.beginFill(0x725f19)
      .drawRoundedRect(edgeExcess / 2, -containerHeight, containerWidth, containerHeight, containerRadius)
      .endFill();
    
    // Draw the container edge.
    g.beginFill(0x52431c)
      .drawRect(0, containerRadius - containerHeight - edgeHeight, containerWidth + edgeExcess, edgeHeight)
      .endFill();
    
    // Draw the connectors.
    g.beginFill(0x121212)
      .drawRect(containerWidth + edgeExcess / 2, -connectorOffsetY - connectorHeight, connectorWidth, connectorHeight)
      .drawRect(
        containerWidth + edgeExcess / 2,
        -connectorOffsetY - connectorHeight * 2 - connectorGap,
        connectorWidth,
        connectorHeight
      )
      .endFill();
  }

  return (
    <Container ref={trainContainerRef}>
      <Graphics draw={drawTrainContainer} />
      <TrainWheel radius={wheelRadius} x={backWheelX} y={backWheelY} />
      <TrainWheel radius={wheelRadius} x={frontWheelX} y={frontWheelY} />
    </Container>
  )
}

const Smokes: React.FC = () => {
  const [groups, setGroups] = useState<Array<{
    x: number,
    y: number,
    tick: number,
    scale: { x: number, y: number, set: (scale: number) => void },
    particles: Array<{
      x: number,
      y: number,
      radius: number
    }>
  }>>([]);

  const baseX = window.innerWidth / 2 + 95;
  const baseY = window.innerHeight - 200;

  useEffect(() => {
    const groupCount = 5;
    const particleCount = 7;
    const initialGroups = [];

    for (let index = 0; index < groupCount; index++) {
      const particles = [];
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: (Math.random() * 2 - 1) * 40,
          y: (Math.random() * 2 - 1) * 40,
          radius: 20 + Math.random() * 20
        });
      }

      initialGroups.push({
        x: baseX,
        y: baseY,
        tick: index * (1 / groupCount),
        scale: {
          x: 0,
          y: 0,
          set(s: number) {
            this.x = s;
            this.y = s;
          }
        },
        particles
      });
    }

    setGroups(initialGroups);
  }, [baseX, baseY]);

  const drawSmokes = useCallback((g: PIXI.Graphics) => {
    g.clear();
    
    groups.forEach(group => {
      g.beginFill(0xc9c9c9, 0.5);
      group.particles.forEach(particle => {
        g.drawCircle(
          group.x + particle.x * group.scale.x,
          group.y + particle.y * group.scale.y,
          particle.radius * group.scale.x
        );
      });
      g.endFill();
    });
  }, [groups]);

  useTick((delta) => {
    const dt = delta * 0.01;

    setGroups(prevGroups => prevGroups.map(group => {
      group.tick = (group.tick + dt) % 1;
      group.x = baseX - Math.pow(group.tick, 2) * 400;
      group.y = baseY - group.tick * 200;
      const scale = group.tick * 1.5;
      group.scale.set(scale);
      return group;
    }));
  });

  return <Graphics draw={drawSmokes} />;
};

const Train: React.FC = () => {
  const trainRef = useRef<PIXI.Container>(null);
  const scale = 0.75;

  let elapsed = 0;
  const shakeDistance = 2;
  const baseY = window.innerHeight - 35 - 55 * scale;
  const speed = 0.5;

  useTick((delta) => {
    elapsed += delta * speed;
    const offset = Math.sin(elapsed * 0.5 + 0.5) * shakeDistance;
    trainRef.current?.position.set(window.innerWidth / 2 - 75, baseY + offset);
  });

  return (
    <Container
      ref={trainRef}
      scale={scale}
      x={window.innerWidth / 2 - 75}
      y={baseY}
    >
      <TrainHead />
      <TrainContainer />
    </Container>
  );
};

const ChooChooTrain:React.FC = () => {
  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      options={{
        background: '#021f4b',
        resizeTo: window
      }}
    >
      <Stars width={window.innerWidth} height={window.innerHeight} />
      <Moon />
      <Mountains />
      <Trees />
      <Ground />
      <Train />
      <Smokes />
    </Stage>
  )
}

export default ChooChooTrain;
