# Common Names in Game Programming

## Class Names

### Core Game Classes
- `Game` / `GameEngine` / `Engine`
- `Scene` / `GameScene` / `Level`
- `Player` / `Character` / `Actor`
- `Enemy` / `Monster` / `Opponent`
- `GameObject` / `Entity` / `Object`
- `Component` / `Behavior`
- `Transform` / `Position`
- `Renderer` / `Graphics`
- `Camera` / `Viewport`
- `Input` / `InputManager`
- `Audio` / `SoundManager`
- `Sprite` / `Texture` / `Image`
- `Animation` / `Animator`
- `Physics` / `RigidBody` / `Collider`
- `Inventory` / `Item`
- `UI` / `HUD` / `Menu`
- `Timer` / `Clock`

### Manager Classes
- `ResourceManager` / `AssetManager`
- `SceneManager` / `StateManager`
- `EventManager` / `MessageManager`
- `NetworkManager` / `Multiplayer`
- `SaveManager` / `GameData`

## File Names

### Core Files
- `main.js` / `app.js` / `index.js`
- `game.js` / `engine.js`
- `player.js` / `character.js`
- `enemy.js` / `ai.js`
- `physics.js` / `collision.js`
- `input.js` / `controls.js`
- `audio.js` / `sound.js`
- `graphics.js` / `renderer.js`
- `animation.js` / `sprite.js`
- `utils.js` / `helpers.js`
- `constants.js` / `config.js`
- `level.js` / `scene.js`

### Asset Files
- `sprites/` / `images/` / `textures/`
- `sounds/` / `audio/` / `music/`
- `fonts/` / `ui/`
- `data/` / `levels/` / `maps/`
- `shaders/` / `effects/`

## Variable Names

### Position & Movement
- `x`, `y`, `z` - coordinates
- `pos` / `position` / `location`
- `vel` / `velocity` / `speed`
- `acc` / `acceleration`
- `rot` / `rotation` / `angle`
- `dir` / `direction`
- `scale` / `size`

### Game State
- `health` / `hp` / `life`
- `score` / `points`
- `level` / `stage`
- `lives` / `attempts`
- `energy` / `mana` / `stamina`
- `time` / `timer` / `countdown`
- `state` / `status` / `mode`
- `active` / `enabled` / `visible`

### Collections
- `enemies` / `monsters`
- `bullets` / `projectiles`
- `items` / `collectibles`
- `players` / `characters`
- `obstacles` / `walls`
- `particles` / `effects`

### Input & Control
- `keys` / `input` / `controls`
- `mouse` / `pointer` / `cursor`
- `touch` / `gesture`
- `pressed` / `down` / `held`
- `clicked` / `tapped`

## Function Names

### Game Loop
- `init()` / `initialize()` / `setup()`
- `update()` / `tick()` / `step()`
- `render()` / `draw()` / `paint()`
- `start()` / `begin()` / `play()`
- `pause()` / `resume()` / `stop()`
- `reset()` / `restart()` / `reload()`

### Movement & Physics
- `move()` / `translate()` / `setPosition()`
- `rotate()` / `turn()` / `face()`
- `jump()` / `fall()` / `land()`
- `collide()` / `hit()` / `intersect()`
- `bounce()` / `reflect()`
- `accelerate()` / `decelerate()`

### Game Actions
- `shoot()` / `fire()` / `attack()`
- `defend()` / `block()` / `dodge()`
- `collect()` / `pickup()` / `grab()`
- `use()` / `activate()` / `trigger()`
- `damage()` / `hurt()` / `heal()`
- `spawn()` / `create()` / `destroy()`
- `respawn()` / `revive()`

### Animation & Graphics
- `animate()` / `play()` / `stop()`
- `fade()` / `tween()` / `lerp()`
- `show()` / `hide()` / `toggle()`
- `scale()` / `resize()` / `transform()`
- `flash()` / `blink()` / `pulse()`

### Audio
- `playSound()` / `stopSound()`
- `playMusic()` / `pauseMusic()`
- `setVolume()` / `mute()` / `unmute()`

### Input Handling
- `onKeyDown()` / `onKeyUp()` / `onKeyPress()`
- `onMouseDown()` / `onMouseUp()` / `onMouseMove()`
- `onClick()` / `onTap()` / `onSwipe()`
- `handleInput()` / `processInput()`

### Utility Functions
- `random()` / `rand()` / `chance()`
- `clamp()` / `constrain()` / `limit()`
- `distance()` / `length()` / `magnitude()`
- `normalize()` / `clamp()` / `map()`
- `lerp()` / `interpolate()` / `blend()`
- `loadAssets()` / `preload()`
- `save()` / `load()` / `serialize()`

### Event Handlers
- `onCollision()` / `onHit()` / `onContact()`
- `onDeath()` / `onDestroy()` / `onGameOver()`
- `onLevelComplete()` / `onWin()` / `onLose()`
- `onPowerUp()` / `onPickup()`
- `onStateChange()` / `onTransition()`

## Common Patterns

### Naming Conventions
- Use **camelCase** for variables and functions
- Use **PascalCase** for classes
- Use **UPPER_CASE** for constants
- Use descriptive names over abbreviations
- Prefix booleans with `is`, `has`, `can`, `should`
- Use verbs for functions, nouns for variables

### Examples
```javascript
// Good naming examples
const GRAVITY = 9.8;
const MAX_HEALTH = 100;

let isAlive = true;
let hasKey = false;
let canJump = true;

function checkCollision() { }
function updatePosition() { }
function renderSprite() { }
```
