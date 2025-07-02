window.addEventListener("DOMContentLoaded", () => {
  let chatbox = document.getElementById("chatbox");
  let input = document.getElementById("input");
  let send = document.getElementById("send");
  let aiInput = document.getElementById("ai-name");
  let setNameBtn = document.getElementById("setNameBtn");

  let gameStorage = JSON.parse(localStorage.getItem("games")) || {};
  let conversations;
  try {
    conversations = JSON.parse(localStorage.getItem("convos")) || { default: [] };
  } catch {
    conversations = { default: [] };
  }

  let currentConvo = "default";
  let aiName = "Botzo";
  let profile = {};
  let qIndex = 0;

  const questions = [
    "What’s your real name?", "What should I call you?",
    "How old are you?", "What’s your favorite game?",
    "What’s your hobby?", "What’s your favorite food?",
    "What country do you live in?", "What’s your favorite animal?",
    "Are you a morning or night person?", "What’s your dream job?",
    "What’s your favorite color?", "What’s a random fact about you?",
    "What type of music do you like?", "Do you prefer indoors or outdoors?",
    "Who inspires you the most?"
  ];

  function saveConvo() {
    localStorage.setItem("convos", JSON.stringify(conversations));
  }

  function showConvos() {
    const list = document.getElementById("convoList");
    list.innerHTML = "";
    for (let name in conversations) {
      let div = document.createElement("div");
      div.innerHTML = `<b>${name}</b> 
        <button onclick='loadConvo("${name}")'>Load</button> 
        <button onclick='deleteConvo("${name}")'>🗑️</button>`;
      list.appendChild(div);
    }
    list.style.display = "block";
  }

  function botSay(msg, pink = false) {
    let div = document.createElement("div");
    div.className = pink ? "pink-bot" : "bot";
    div.innerHTML = `<b>${aiName}:</b> ${msg}`;
    chatbox.appendChild(div);
    chatbox.scrollTop = chatbox.scrollHeight;
    if (!conversations[currentConvo]) conversations[currentConvo] = [];
    conversations[currentConvo].push({ from: "bot", text: msg });
    saveConvo();
  }

  function userSay(msg) {
    let div = document.createElement("div");
    div.className = "user";
    div.innerHTML = `<b>You:</b> ${msg}`;
    chatbox.appendChild(div);
    chatbox.scrollTop = chatbox.scrollHeight;
    if (!conversations[currentConvo]) conversations[currentConvo] = [];
    conversations[currentConvo].push({ from: "user", text: msg });
    saveConvo();
  }

  function askNext() {
    if (qIndex < questions.length) {
      botSay(questions[qIndex]);
    } else {
      botSay("📘 Here's what I know about you:");
      for (let key in profile) {
        botSay(`🔹 ${key}: ${profile[key]}`);
      }
    }
  }

  send.onclick = () => {
    let msg = input.value.trim();
    if (!msg) return;
    userSay(msg);
    input.value = "";

    if (msg.startsWith("say(")) {
      const match = msg.match(/say\("(.*)"\)/);
      if (match) {
        botSay(match[1]);
      } else {
        botSay("⚠️ Use say like: say(\"Hello!\")");
      }
    } else if (msg === "/code") {
      ["html-editor", "js-editor", "css-editor"].forEach(id =>
        document.getElementById(id).style.display = "block"
      );
      botSay("Code editors opened!");
    } else if (msg.startsWith("/new")) {
      let name = prompt("New convo name:");
      if (name) {
        conversations[name] = [];
        currentConvo = name;
        botSay("New convo created!");
        showConvos();
      }
    } else if (msg.startsWith("/delete")) {
      let name = prompt("Delete which convo?");
      if (name && conversations[name]) {
        delete conversations[name];
        saveConvo();
        showConvos();
        botSay("Deleted.");
      }
    } else if (msg.startsWith("/game")) {
      let name = msg.split(" ")[1];
      if (gameStorage[name]) {
        let g = gameStorage[name];
        runGame(g.html, g.css, g.js);
        botSay(`🎮 Loaded game: ${name}`);
      } else botSay("No game found!");
    } else if (["no", "nan", "non", "i don’t know", "i don't know"].includes(msg.toLowerCase())) {
      profile[questions[qIndex]] = "unknown";
      qIndex++;
      askNext();
    } else if (qIndex < questions.length) {
      profile[questions[qIndex]] = msg;
      botSay(`✅ Stored: ${msg}`);
      qIndex++;
      askNext();
    } else {
      botSay("Try /code, /new convo, or just chat with me.");
    }
  };

  function setAIName() {
    let name = aiInput.value.trim();
    if (name) {
      aiName = name;
      document.getElementById("title-name").textContent = name;
      botSay(`Yo! My new name is ${aiName} 🤖🔥`);
    }
  }

  function loadConvo(name) {
    chatbox.innerHTML = "";
    currentConvo = name;
    conversations[name].forEach(entry => {
      if (entry.from === "bot") botSay(entry.text);
      else userSay(entry.text);
    });
  }

  function deleteConvo(name) {
    delete conversations[name];
    saveConvo();
    showConvos();
  }

  function saveGame() {
    let name = document.getElementById("gameName").value.trim();
    if (!name) return alert("Name your game!");
    gameStorage[name] = {
      html: document.getElementById("html-code").value,
      css: document.getElementById("css-code").value,
      js: document.getElementById("js-code").value
    };
    localStorage.setItem("games", JSON.stringify(gameStorage));
    botSay("✅ Game saved!");
  }

  function loadGame() {
    let name = document.getElementById("gameName").value.trim();
    if (gameStorage[name]) {
      document.getElementById("html-code").value = gameStorage[name].html;
      document.getElementById("css-code").value = gameStorage[name].css;
      document.getElementById("js-code").value = gameStorage[name].js;

      // show editors when loading
      ["html-editor", "js-editor", "css-editor"].forEach(id =>
        document.getElementById(id).style.display = "block"
      );

      botSay("Game loaded in editor! 🛠️");
    } else botSay("No game with that name!");
  }

  function runGame(html, css, js) {
    const full = `<style>${css}</style>${html}<script>${js}<\/script>`;
    document.getElementById("game-frame").srcdoc = full;
  }

  setNameBtn.onclick = setAIName;
  showConvos();
});
