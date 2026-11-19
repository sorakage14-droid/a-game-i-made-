# 🌴 Women's Island: The Lost Paradise

A small anime-inspired 3D island adventure prototype built with Three.js. The environment and stylized characters are generated in code, so no external 3D model files are required.

## Features

- Procedural 3D tropical island, ocean, palm trees, clouds, village and lighthouse
- Stylized anime-inspired player character and four NPCs
- Third-person follow camera with mouse/touch drag orbit
- WASD / arrow-key movement
- NPC proximity prompts and dialogue interactions
- Chapter 01 objective progression
- Mobile touch controls with on-screen directional pad, TALK/NEXT button, and swipe camera
- Lower rendering resolution and lighter water geometry on phones for smoother performance

## Run locally

Because the project uses JavaScript modules, serve it from a local web server rather than opening `index.html` directly.

For example, in VS Code install **Live Server**, then right-click `index.html` and choose **Open with Live Server**.

## Deploy to GitHub Pages

1. Create a repository and upload `index.html`, `style.css`, `script.js`, and this README.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and `/ (root)` folder, then save.
5. Wait for GitHub Pages to publish the site.

## Controls

| Input | Action |
|---|---|
| W / ↑ | Move forward |
| S / ↓ | Move backward |
| A / ← | Move left |
| D / → | Move right |
| E | Talk / continue dialogue |
| Mouse drag | Rotate camera |
| On-screen direction pad | Move on phones and tablets |
| Drag the scene | Rotate camera on touch screens |
| TALK button | Talk to nearby characters / continue dialogue |

## Play on a phone

1. Upload the project files to a GitHub repository.
2. Enable GitHub Pages using the `main` branch and `/ (root)` folder.
3. Open the published GitHub Pages URL in Chrome or Safari on your phone. You do not need to install an app.
4. Tap **START ADVENTURE**. Use the on-screen arrow pad to walk, drag across the 3D scene to rotate the camera, and tap **TALK** when near a character. During dialogue, the same button advances the conversation.
5. For the best experience, rotate your phone to landscape and keep the browser updated.

## Notes

- Three.js is loaded from jsDelivr, and the Nunito font is loaded from Google Fonts. An internet connection is needed for those CDN resources.
- This is a playable prototype. The characters are procedural low-poly/stylized figures, not professionally rigged anime models or motion-captured characters.
- The island is a fictional setting and the story is an original adventure premise.
