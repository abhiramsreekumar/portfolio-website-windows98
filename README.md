# Abhiram Sreekumar - DevOps Portfolio

A retro Windows 98 themed interactive portfolio website designed to showcase my engineering background. 

## Overview
This repository contains the source code for a fully functional, nostalgia-driven desktop environment. It operates natively in the browser, complete with a taskbar, draggable applications, and a fully playable custom physics game that acts as an interactive resume explorer.

## Features
- **Nostalgic Architecture**: Fully functional Windows 98 desktop environment including an interactive taskbar, draggable/resizable windows, and a start menu.
- **Dangerous Dave Game Engine**: A fully playable, custom physics-based web clone of the classic DOS game "Dangerous Dave" with custom level design that displays resume data as you progress. Includes mobile touch-controls.
- **Internet Explorer & Notepad**: Retro applications rendering semantic HTML, downloadable PDF logic, and markdown-styled text files.
- **CI/CD Pipeline**: Fully automated continuous integration and continuous deployment pipeline out of GitHub Actions directly to **AWS S3 + CloudFront**.
- **Mobile First Adjustments**: Native mobile styling with dynamic zooming, OS-level viewport scaling, and simulated D-Pad controls for touchscreen gameplay.

## Technologies
- **Core**: React 18, TypeScript, Vite
- **Styling**: Vanilla CSS (EGA Color Palettes, CRT Scanline Effects)
- **Engine**: Custom `requestAnimationFrame` 60fps Game Loop & AABB Collision Detection
- **Audio**: Web Audio API (8-bit Synthesized Audio)
- **Infrastructure**: AWS S3, AWS CloudFront, GitHub Actions

## Thanks to
- **Icons From**: https://win98icons.alexmeub.com/