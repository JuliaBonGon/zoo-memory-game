[![Netlify Status](https://api.netlify.com/api/v1/badges/546d661a-f145-4aea-8d44-7a70180c1ecd/deploy-status)](https://app.netlify.com/sites/zoomemorygamejulia/deploys)

# My memory game
For the class exercise explained below, I wanted to create a simple, child friendly memory game for my little son.
I was able to code this after only 2 months since I started learning to code.

# Memory game exercise 🧠

- Repository: `memory-game`
- Type of Challenge: `Learning Challenge`
- Duration: `Remainder of the week`
- Deployment strategy: `Github pages` or `Netlify`
- Team challenge : `solo`

## Learning Objectives
- Change things in the DOM (Aka canvas = cheating)
- Array manipulation

## The Mission
We want to recreate the game `memory`. It is a game where  you have a bunch of cards. Each card contains an image. Of each image there are exactly two cards. The cards are placed in a random order. You get to turn them around. If you turned around two cards they either turn back, so you can't see their image if they did not match. If they did match they stay image face visible.

### 🌱 Must-have features
- Clicking cards turns them around
- Randomly position the cards
- Readme, but that shouldn't even have to be said
- Explanation on the page itself

### 🌼 Nice-to-have features
- Make it playable by keyboard
- Let a user define custom image urls
- Make it pleasing to look at
- Multiplayer (local)

### Tips (You might want to only read this if you are stuck)

Here is a good way to split up the work. You might want to try to split it up even further:

- Have a bunch of square images (hard code their order, use html)
- Make them turn on click
- Make their order random using javascript
- Turn them back around if you clicked two
- Then implement the logic to only turn back if they don't match
