import { Spine } from '@esotericsoftware/spine-pixi-v7';
import { Container, Stage, useTick } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { useEffect, useState, useRef } from 'react';

const SPINE_SKELETON = 'https://raw.githubusercontent.com/pixijs/spine-v8/main/examples/assets/spineboy-pro.skel';
const SPINE_ATLAS = 'https://raw.githubusercontent.com/pixijs/spine-v8/main/examples/assets/spineboy-pma.atlas';
const SKY_IMAGE = 'https://pixijs.com/assets/tutorials/spineboy-adventure/sky.png';
const BACKGROUND_IMAGE = 'https://pixijs.com/assets/tutorials/spineboy-adventure/background.png';
const MIDGROUND_IMAGE = 'https://pixijs.com/assets/tutorials/spineboy-adventure/midground.png';
const PLATFORM_IMAGE = 'https://pixijs.com/assets/tutorials/spineboy-adventure/platform.png';

const KEY_MAP = {
  Space: 'space',
  KeyW: 'up',
  ArrowUp: 'up',
  KeyA: 'left',
  ArrowLeft: 'left',
  KeyS: 'down',
  ArrowDown: 'down',
  KeyD: 'right',
  ArrowRight: 'right'
};

// Define the Spine animation map for the character.
// name: animation track key.
// loop: do the animation once or infinitely.
const ANIMATION_MAP: Record<string, { name: string, loop?: boolean, timeScale?: number }> = {
  idle: {
    name: 'idle',
    loop: true
  },
  walk: {
    name: 'walk',
    loop: true
  },
  run: {
    name: 'run',
    loop: true
  },
  jump: {
    name: 'jump',
    timeScale: 1.5
  },
  hover: {
    name: 'hoverboard',
    loop: true
  },
  spawn: {
    name: 'portal'
  }
};

class Controller {
  keys: Record<KeyboardEvent['code'], { pressed: boolean, doubleTap: boolean, timestamp: number }> = {};

  constructor() {
    this.keys = {
      up: { pressed: false, doubleTap: false, timestamp: 0 },
      left: { pressed: false, doubleTap: false, timestamp: 0 },
      down: { pressed: false, doubleTap: false, timestamp: 0 },
      right: { pressed: false, doubleTap: false, timestamp: 0 },
      space: { pressed: false, doubleTap: false, timestamp: 0 }
    };

    // Register event listeners for keydown and keyup events.
    window.addEventListener('keydown', (event) => this.onKeyDown(event));
    window.addEventListener('keyup', (event) => this.onKeyUp(event));
  }

  onKeyDown(event: KeyboardEvent) {
    const key = KEY_MAP[event.code as keyof typeof KEY_MAP];

    if (!key) return;

    const now = Date.now();

    // If not already in the double-tap state, toggle the double tap state if the key was pressed twice within 300ms.
    this.keys[key].doubleTap = this.keys[key].doubleTap || now - this.keys[key].timestamp < 300;

    // Toggle on the key pressed state.
    this.keys[key].pressed = true;
  }

  onKeyUp(event: KeyboardEvent) {
    const key = KEY_MAP[event.code as keyof typeof KEY_MAP];

    if (!key) return;

    const now = Date.now();

    // Reset the key pressed state.
    this.keys[key].pressed = false;

    // Reset double tap only if the key is in the double-tap state.
    if (this.keys[key].doubleTap) this.keys[key].doubleTap = false;
    // Otherwise, update the timestamp to track the time difference till the next potential key down.
    else this.keys[key].timestamp = now;
  }
}

class Animation {
  state: Record<string, boolean>;
  view: PIXI.Container = new PIXI.Container();
  directionalView: PIXI.Container;
  spine: Spine;

  constructor() {
    this.state = {
      walk: false,
      run: false,
      hover: false,
      jump: false,
    }
    this.directionalView = new PIXI.Container();
    this.spine = Spine.from({
      skeleton: 'spineSkeleton',
      atlas: 'spineAtlas',
    });

    // Add the Spine instance to the directional view.
    this.directionalView.addChild(this.spine);

    // Add the directional view to the main view.
    this.view.addChild(this.directionalView);

    // Set the default mix duration for all animations.
    // This is the duration to blend from the previous animation to the next.
    this.spine.state.data.defaultMix = 0.2;

    this.spine.scale.set(0.2);
  }

  spawn() {
    this.spine.state.setAnimation(0, ANIMATION_MAP.spawn.name, false);
  }

  // Play the spine animation.
  playAnimation({ name, loop = false, timeScale = 1 }: { name: string, loop?: boolean, timeScale?: number }) {
    // Skip if the animation is already playing.
    if (this.currentAnimationName === name) return;

    // Play the animation on main track instantly.
    const trackEntry = this.spine.state.setAnimation(0, name, loop);

    // Apply the animation's time scale (speed).
    trackEntry.timeScale = timeScale;
  }

  update() {
    // Play the jump animation if not already playing.
    if (this.state.jump) this.playAnimation(ANIMATION_MAP.jump);

    // Skip the rest of the animation updates during the jump animation.
    if (this.isAnimationPlaying(ANIMATION_MAP.jump)) return;

    // Handle the character animation based on the latest state and in the priority order.
    if (this.state.hover) this.playAnimation(ANIMATION_MAP.hover);
    else if (this.state.run) this.playAnimation(ANIMATION_MAP.run);
    else if (this.state.walk) this.playAnimation(ANIMATION_MAP.walk);
    else this.playAnimation(ANIMATION_MAP.idle);
  }

  isSpawning() {
    return this.isAnimationPlaying(ANIMATION_MAP.spawn);
  }

  isAnimationPlaying({ name }: { name: string }) {
    // Check if the current animation on main track equals to the queried.
    // Also check if the animation is still ongoing.
    return this.currentAnimationName === name && !this.spine.state.getCurrent(0)?.isComplete();
  }

  // Return the name of the current animation on main track.
  get currentAnimationName() {
    return this.spine?.state?.getCurrent(0)?.animation?.name ?? '';
  }

  // Return character's facing direction.
  get direction() {
    return this.directionalView.scale.x > 0 ? 1 : -1;
  }

  // Set character's facing direction.
  set direction(value: number) {
    this.directionalView.scale.x = value;
  }
}

class Scene {
  view: PIXI.Container = new PIXI.Container();
  sky: PIXI.Sprite;
  scale: number = 1;
  floorHeight: number = 0;
  background: PIXI.TilingSprite;
  midground: PIXI.TilingSprite;
  platform: PIXI.TilingSprite;

  constructor() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Create textures for the background, mid-ground, and platform.
    const backgroundTexture = PIXI.Texture.from('background');
    const midgroundTexture = PIXI.Texture.from('midground');
    const platformTexture = PIXI.Texture.from('platform');

    this.sky = PIXI.Sprite.from('sky');
    this.sky.anchor.set(0, 1);
    this.sky.width = width;
    this.sky.height = height;

    // Calculate the ideal platform height depending on the passed-in screen height.
    const maxPlatformHeight = platformTexture.height;
    const platformHeight = Math.min(maxPlatformHeight, height * 0.4);

    // Calculate the scale to be apply to all tiling textures for consistency.
    const scale = (this.scale = platformHeight / maxPlatformHeight);

    // Create the tiling sprite layers.
    this.background = new PIXI.TilingSprite(backgroundTexture, width, backgroundTexture.height * scale);
    this.midground = new PIXI.TilingSprite(midgroundTexture, width, midgroundTexture.height * scale);
    this.platform = new PIXI.TilingSprite(platformTexture, width, platformHeight);
    this.background.tileScale = { x: scale, y: scale };
    this.midground.tileScale = { x: scale, y: scale };
    this.platform.tileScale = { x: scale, y: scale };
    this.background.anchor.set(0, 1);
    this.midground.anchor.set(0, 1);
    this.platform.anchor.set(0, 1);

    // Calculate the floor height for external referencing.
    this.floorHeight = platformHeight * 0.43;

    // Position the backdrop layers.
    this.background.y = this.midground.y = -this.floorHeight;

    // Add all layers to the main view.
    this.view.addChild(this.sky, this.background, this.midground, this.platform);
  }

  // Use the platform's horizontal position as the key position for the scene.
  get positionX() {
    return this.platform.tilePosition.x;
  }

  // Set the horizontal position of the platform layer while applying parallax scrolling to the backdrop layers.
  set positionX(value) {
    this.background.tilePosition.x = value * 0.1;
    this.midground.tilePosition.x = value * 0.25;
    this.platform.tilePosition.x = value;
  }
}

const GameContainer: React.FC = () => {
  const containerRef = useRef<PIXI.Container>(null);
  const controller = new Controller();
  const animation = new Animation();
  const scene = new Scene();

  // Adjust views' transformation.
  scene.view.y = window.innerHeight;
  animation.view.x = window.innerWidth / 2;
  animation.view.y = window.innerHeight - scene.floorHeight;
  animation.spine.scale.set(scene.scale * 0.32);

  animation.spawn();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addChild(scene.view);
      containerRef.current.addChild(animation.view);
    }
  }, [animation.view, scene.view]);

  useTick(() => {
    // Ignore the update loops while the character is doing the spawn animation.
    if (animation.isSpawning()) return;

    // Update character's state based on the controller's input.
    animation.state.walk = controller.keys.left.pressed || controller.keys.right.pressed;
    if (animation.state.run && animation.state.walk) animation.state.run = true;
    else animation.state.run = controller.keys.left.doubleTap || controller.keys.right.doubleTap;
    animation.state.hover = controller.keys.down.pressed;
    if (controller.keys.left.pressed) animation.direction = -1;
    else if (controller.keys.right.pressed) animation.direction = 1;
    animation.state.jump = controller.keys.space.pressed;

    // Update character's animation based on the latest state.
    animation.update();

    // Determine the scene's horizontal scrolling speed based on the character's state.
    let speed = 1.25;

    if (animation.state.hover) speed = 7.5;
    else if (animation.state.run) speed = 3.75;

    // Shift the scene's position based on the character's facing direction, if in a movement state.
    if (animation.state.walk) scene.positionX -= speed * scene.scale * animation.direction;
  });

  return <Container ref={containerRef} />;
}

const SpineBoyAdventure: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        await PIXI.Assets.load([
          {
            alias: 'spineSkeleton',
            src: SPINE_SKELETON,
          },
          {
            alias: 'spineAtlas',
            src: SPINE_ATLAS,
          },
          {
            alias: 'sky',
            src: SKY_IMAGE,
          },
          {
            alias: 'background',
            src: BACKGROUND_IMAGE,
          },
          {
            alias: 'midground',
            src: MIDGROUND_IMAGE,
          },
          {
            alias: 'platform',
            src: PLATFORM_IMAGE,
          },
        ]);
        setIsLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Error occurred while loading assets');
        setIsLoading(false);
      }
    };

    loadAssets();
  }, []);

  if (error) {
    return <div>Error occurred: {error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      options={{
        background: '#1099bb',
        resizeTo: window
      }}
    >
      <GameContainer />
    </Stage>
  )
}

export default SpineBoyAdventure;
