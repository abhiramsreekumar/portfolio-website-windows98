import { useState, useEffect, useRef } from 'react';
import { Rect, Hazard } from '../data/levels';

interface PlayerState {
  x: number;
  bottom: number;
  vx: number;
  vy: number;
  isGrounded: boolean;
  facingRight: boolean;
  isDead: boolean;
  doorReached: boolean;
}

export function useGameEngine(
  initialX: number, 
  initialBottom: number, 
  platforms: Rect[], 
  hazards: Hazard[], 
  door: Rect,
  isPlaying: boolean
) {
  const [player, setPlayer] = useState<PlayerState>({
    x: initialX,
    bottom: initialBottom,
    vx: 0,
    vy: 0,
    isGrounded: true,
    facingRight: true,
    isDead: false,
    doorReached: false
  });

  const playerWidth = 32;
  const playerHeight = 40;
  
  const GRAVITY = -0.5;
  const JUMP_FORCE = 10;
  const SPEED = 4;

  const keys = useRef<{ [key: string]: boolean }>({});
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Input handling
    const onKeyDown = (e: KeyboardEvent) => { keys.current[e.code] = true; };
    const onKeyUp = (e: KeyboardEvent) => { keys.current[e.code] = false; };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  const resetPlayer = () => {
    setPlayer({
      x: initialX,
      bottom: initialBottom,
      vx: 0,
      vy: 0,
      isGrounded: true,
      facingRight: true,
      isDead: false,
      doorReached: false
    });
  };

  useEffect(() => {
    // Reset player position when level changes or dies
    if (!isPlaying) return;
    
    // We only reset if specifically told to or starting a new level.
    // The parent controls `initialX` and `initialBottom`.
  }, [initialX, initialBottom, isPlaying]);

  useEffect(() => {
    if (!isPlaying) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    const update = () => {
      setPlayer(prev => {
        if (prev.isDead || prev.doorReached) return prev;

        let { x, bottom, vx, vy, isGrounded, facingRight } = prev;

        // Apply input
        if (keys.current['ArrowRight']) {
          vx = SPEED;
          facingRight = true;
        } else if (keys.current['ArrowLeft']) {
          vx = -SPEED;
          facingRight = false;
        } else {
          vx = 0;
        }

        if ((keys.current['ArrowUp'] || keys.current['Space']) && isGrounded) {
          vy = JUMP_FORCE;
          isGrounded = false;
        }

        // Apply physics
        vy += GRAVITY;
        let nextX = x + vx;
        let nextBottom = bottom + vy;

        // X world bounds clamp
        if (nextX < 0) nextX = 0;
        if (nextX > 1000 - playerWidth) nextX = 1000 - playerWidth;

        // Collision detection AABB
        isGrounded = false;
        
        // Floor check (abstracted to constant 80px)
        const FLOOR_HEIGHT = 80;
        if (nextBottom <= FLOOR_HEIGHT) {
           nextBottom = FLOOR_HEIGHT;
           vy = 0;
           isGrounded = true;
        }

        // Check platforms AABB
        for (const p of platforms) {
           // check collision
           if (
             nextX < p.x + p.width &&
             nextX + playerWidth > p.x &&
             nextBottom < p.bottom + p.height &&
             nextBottom + playerHeight > p.bottom
           ) {
              // Resolving collision. Simply check from which direction we hit.
              // If we were above it last frame:
              if (bottom >= p.bottom + p.height) {
                 nextBottom = p.bottom + p.height;
                 vy = 0;
                 isGrounded = true;
              } 
              // Hit head on bottom of platform
              else if (bottom + playerHeight <= p.bottom) {
                 vy = 0;
                 // Don't modify nextBottom here to let gravity pull down naturally, or set exactly.
                 nextBottom = p.bottom - playerHeight;
              }
              // Horizontal collisions (walking into wall)
              else {
                 if (vx > 0) nextX = p.x - playerWidth;
                 else if (vx < 0) nextX = p.x + p.width;
              }
           }
        }

        // Check hazards
        let dead = false;
        for (const h of hazards) {
           if (
             nextX + 10 < h.x + h.width && // add slight margin for fairness
             nextX + playerWidth - 10 > h.x &&
             nextBottom < h.bottom + h.height &&
             nextBottom + playerHeight > h.bottom
           ) {
             dead = true;
           }
        }

        // Check door
        let reached = false;
        if (
             nextX < door.x + door.width &&
             nextX + playerWidth > door.x &&
             nextBottom < door.bottom + door.height &&
             nextBottom + playerHeight > door.bottom
        ) {
             reached = true;
        }

        return {
           x: nextX,
           bottom: nextBottom,
           vx,
           vy,
           isGrounded,
           facingRight,
           isDead: dead,
           doorReached: reached
        };
      });

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, platforms, hazards, door]);

  return { player, resetPlayer };
}
