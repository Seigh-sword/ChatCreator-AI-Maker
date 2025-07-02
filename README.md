# 🤖 ChatCreator: AI Maker

**ChatCreator: AI Maker** is an interactive AI-based chatbot + game builder inside your browser.  
It’s a magical fusion of ChatGPT vibes and a live game-coding playground! 🔥🎮

🚀 [Click here to chat](https://seigh-sword.github.io/ChatCreator-AI-Maker/)

---

## ✨ Features

- 💬 **Chatbot that learns about YOU** – answers questions and remembers you  
- 🧠 **Save/Load Conversations** – name them, delete them, reload them anytime!  
- 🎨 **Code Editor (HTML/CSS/JS)** – build games and run them live  
- 🛠️ **In-Browser Game Maker** – design games with code and play instantly  
- 🎮 **Game can speak in chat** using `say("Hello!")` via iframe messaging  
- 🎭 **Custom AI Bot Naming** – rename the AI personality on the fly  
- 🗂️ **Saved Games Panel** – organize and run all your creations  

---

## 🛠️ How It Works

### 1️⃣ Name your AI
Type in a name and click **“Set AI Name”**. Your bot will talk with this name.

### 2️⃣ Start Chatting
Type anything! It’ll ask 15 fun questions like:
- What’s your real name?
- What’s your favorite game?
- What’s your dream job?
- etc.

You can skip a question by typing `no`, `nan`, or `I don’t know`.

---

### 3️⃣ Use Commands

```bash
/code            → Show the HTML/CSS/JS code editor  
/new             → Start a new conversation  
/delete          → Delete a saved convo  
/game [name]     → Load and run a saved game  
```

---

### 4️⃣ Build Games
Use the code editor to create custom mini-games using HTML, CSS, and JavaScript.  
Save them using the **Game Maker** panel.

---

### 5️⃣ Make Games Talk
Inside your JavaScript game, make the bot speak using:

```js
parent.postMessage("say('🎉 I’m talking from the game!')", "*");
```

---

## 🎮 Example Game: Number Guesser

Here’s a simple working game where the bot reacts when you win or lose:

### 💻 HTML

```html
<h3>🎲 Number Guesser</h3>
<p>I’m thinking of a number between 1 and 10. Can you guess it?</p>
<input id="guess" type="number" placeholder="Enter number 1–10">
<button onclick="checkGuess()">Guess!</button>
<p id="result"></p>
```

### 🎨 CSS

```css
body {
  font-family: sans-serif;
  background-color: #f9f9f9;
}
```

### ⚙️ JavaScript

```js
let number = Math.floor(Math.random() * 10) + 1;

function checkGuess() {
  const guess = parseInt(document.getElementById("guess").value);
  const result = document.getElementById("result");

  if (guess === number) {
    result.innerText = "🎉 You WON!! The number was " + number;
    parent.postMessage("say('🎉 I won the game! That was awesome!')", "*");
  } else {
    result.innerText = "❌ Nope! Try again.";
    parent.postMessage("say('❌ That wasn’t it! Try again!')", "*");
  }
}
```

---

Made with 💖 by **Arunkumar.S.J.**  
