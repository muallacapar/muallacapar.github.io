const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const restartBtn = document.getElementById("restartBtn");
const shootSound = document.getElementById("shootSound");
const explodeSound = document.getElementById("explodeSound");
const bgMusic = document.getElementById("bgMusic");
const startScreen = document.getElementById("startScreen");
const normalBtn = document.getElementById("normalBtn");
const hardcoreBtn = document.getElementById("hardcoreBtn");
const homeBtn = document.getElementById("homeBtn");


let demoAngle = 0;

let gameMode = "normal"; // varsayılan mod


let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

canvas.addEventListener("mousemove", function(e) {
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
});

const player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 40,
  angle: 0,
  moveDistance: 0,
  number: 1,
  health: 3
};

let score = 0;
let scoreTimer = 0;
let bullets = [];
let enemies = [];
let enemyBullets = [];
let enemySpawnTimer = 0;
let gameOver = false;
const stars = [];

for (let i = 0; i < 100; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5 + 0.5,
    speed: Math.random() * 0.5 + 0.2
  });
}


canvas.addEventListener("mousedown", () => {
    if (gameOver) return;
  
    // 🔊 MÜZİK BAŞLAT (ilk tıklamada)
    if (bgMusic.paused) {
      bgMusic.volume = 0.3;
      bgMusic.play().catch(e => console.log("Müzik çalma hatası:", e));
    }
  
    const rolled = Math.floor(Math.random() * 6) + 1;
    player.number = rolled;
    player.moveDistance = rolled * 20;
  
    bullets.push({
      x: player.x,
      y: player.y,
      angle: player.angle,
      speed: 5,
      distanceLeft: 300
    });
  
    shootSound.currentTime = 0;
    shootSound.play();
  });
  
  

restartBtn.addEventListener("click", () => {
 score = 0;
 scoreTimer = 0;

  player.x = canvas.width / 2;
  player.y = canvas.height / 2;
  player.health = 3;
  player.moveDistance = 0;
  player.number = 1;
  enemies = [];
  bullets = [];
  enemyBullets = [];
  gameOver = false;
  restartBtn.style.display = "none";
  shootSound.currentTime = 0;
  shootSound.play();

});
homeBtn.addEventListener("click", () => {
    // Her şeyi sıfırla
    score = 0;
    scoreTimer = 0;
  
    player.x = canvas.width / 2;
    player.y = canvas.height / 2;
    player.health = 3;
    player.moveDistance = 0;
    player.number = 1;
  
    enemies = [];
    bullets = [];
    enemyBullets = [];
    gameOver = false;
  
    // Butonları gizle
    restartBtn.style.display = "none";
    homeBtn.style.display = "none";
  
    // Anasayfaya dön
    startScreen.style.display = "flex";
    bgMusic.pause();
  });
  

function spawnEnemy() {
    const x = Math.random() < 0.5 ? 0 : canvas.width;
    const y = Math.random() * canvas.height;
  
    const speed = gameMode === "hardcore" ? 1.5 : 0.7;
  
    enemies.push({
      x: x,
      y: y,
      size: 30,
      speed: speed,
      angle: Math.atan2(player.y - y, player.x - x),
      color: "#cc0000",
      hit: false,
      shootTimer: 0,
      burstCount: 0,
      isBursting: false
    });
  }

  function drawDemoDice() {
    demoCtx.clearRect(0, 0, demoCanvas.width, demoCanvas.height);
    const x = demoCanvas.width / 2;
    const y = demoCanvas.height / 2;
    const size = 60;
  
    demoCtx.save();
    demoCtx.translate(x, y);
    demoCtx.rotate(demoAngle);
  
    // Zar gövdesi
    demoCtx.fillStyle = "#ffffff";
    demoCtx.strokeStyle = "#000";
    demoCtx.lineWidth = 3;
    demoCtx.shadowColor = "rgba(0,0,0,0.5)";
    demoCtx.shadowBlur = 8;
  
    demoCtx.beginPath();
    demoCtx.moveTo(-size / 2, -size / 2);
    demoCtx.lineTo(size / 2, -size / 2);
    demoCtx.lineTo(size / 2, size / 2);
    demoCtx.lineTo(-size / 2, size / 2);
    demoCtx.closePath();
    demoCtx.fill();
    demoCtx.stroke();
  
    // Noktaları çiz (örnek: 5)
    demoCtx.fillStyle = "#000";
    const dot = (dx, dy) => {
      demoCtx.beginPath();
      demoCtx.arc(dx, dy, 5, 0, Math.PI * 2);
      demoCtx.fill();
    };
    const o = size / 4;
    dot(-o, -o);
    dot(o, -o);
    dot(0, 0);
    dot(-o, o);
    dot(o, o);
  
    demoCtx.restore();
  
    demoAngle += 0.01;
    requestAnimationFrame(drawDemoDice);
  }
  
  
function update() {
    if (player.health <= 0) {
      gameOver = true;
      return;
    }
  
    scoreTimer++;
    if (scoreTimer >= 60) {
      score++;
      scoreTimer = 0;
    }
  
    player.angle = Math.atan2(mouseY - player.y, mouseX - player.x);
  
    if (player.moveDistance > 0) {
      const step = 2;
      player.x += Math.cos(player.angle) * step;
      player.y += Math.sin(player.angle) * step;
      player.moveDistance -= step;
    }
  
    enemySpawnTimer++;
    if (enemySpawnTimer >= 120) {
      spawnEnemy();
      enemySpawnTimer = 0;
    }
  
    enemies.forEach(enemy => {
      enemy.x += Math.cos(enemy.angle) * enemy.speed;
      enemy.y += Math.sin(enemy.angle) * enemy.speed;
  
      enemy.angle = Math.atan2(player.y - enemy.y, player.x - enemy.x);
      enemy.shootTimer++;
  
      if (!enemy.isBursting && enemy.shootTimer >= 120) {
        enemy.isBursting = true;
        enemy.burstCount = 0;
        enemy.shootTimer = 0;
      }
  
      if (enemy.isBursting && enemy.shootTimer >= 30) {
        enemyBullets.push({
          x: enemy.x,
          y: enemy.y,
          angle: enemy.angle,
          speed: 3,
          radius: 5,
          lifetime: 100
        });
  
        enemy.burstCount++;
        enemy.shootTimer = 0;
  
        if (enemy.burstCount >= 3) {
          enemy.isBursting = false;
        }
      }
    });
  
    enemies.forEach(enemy => {
      const dx = player.x - enemy.x;
      const dy = player.y - enemy.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
  
      if (distance < (player.size + enemy.size) / 2) {
        player.moveDistance = 0;
        if (!enemy.hit) {
          player.health -= 1;
          enemy.hit = true;
        }
      }
    });
  
    bullets.forEach(bullet => {
      bullet.x += Math.cos(bullet.angle) * bullet.speed;
      bullet.y += Math.sin(bullet.angle) * bullet.speed;
      bullet.distanceLeft -= bullet.speed;
    });
  
    for (let i = bullets.length - 1; i >= 0; i--) {
      if (bullets[i].distanceLeft <= 0) {
        bullets.splice(i, 1);
      }
    }
  
    for (let i = enemies.length - 1; i >= 0; i--) {
      for (let j = bullets.length - 1; j >= 0; j--) {
        const dx = enemies[i].x - bullets[j].x;
        const dy = enemies[i].y - bullets[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < enemies[i].size / 2) {
          enemies.splice(i, 1);
          bullets.splice(j, 1);
  
          // 🔊 Patlama sesi
          explodeSound.currentTime = 0;
          explodeSound.play().catch(err => console.log("Patlama sesi hatası:", err));
  
          break;
        }
      }
    }
  
    enemyBullets.forEach(bullet => {
      bullet.x += Math.cos(bullet.angle) * bullet.speed;
      bullet.y += Math.sin(bullet.angle) * bullet.speed;
      bullet.lifetime -= 1;
    });
  
    for (let i = enemyBullets.length - 1; i >= 0; i--) {
      if (enemyBullets[i].lifetime <= 0) {
        enemyBullets.splice(i, 1);
      }
    }
  
    for (let i = enemyBullets.length - 1; i >= 0; i--) {
      const dx = player.x - enemyBullets[i].x;
      const dy = player.y - enemyBullets[i].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < player.size / 2) {
        player.health -= 1;
        enemyBullets.splice(i, 1);
      }
    }
  
    // ⭐ Yıldız arka planı kaydır
    stars.forEach(star => {
      star.y += star.speed;
      if (star.y > canvas.height) {
        star.y = 0;
        star.x = Math.random() * canvas.width;
      }
    });
  }
  
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke === 'undefined') stroke = true;
    if (typeof radius === 'undefined') radius = 5;
    if (typeof radius === 'number') {
      radius = {tl: radius, tr: radius, br: radius, bl: radius};
    }
  
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
  
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
  }
  
function drawPlayer() {
    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.rotate(player.angle);
  
    // Zar gövdesi (yuvarlak köşe + gölge)
    ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
  
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
  
    roundRect(ctx, -player.size / 2, -player.size / 2, player.size, player.size, 10, true, true);
  
    // Zar noktalarını çiz
    drawDiceDots(player.number, player.size);
  
    ctx.restore();
  }
  

function drawDiceDots(number, size) {
  const dotSize = 5;
  const offset = size / 4;

  function drawDot(dx, dy) {
    ctx.beginPath();
    ctx.arc(dx, dy, dotSize, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();
  }

  const pos = {
    center: [0, 0],
    tl: [-offset, -offset],
    tr: [offset, -offset],
    bl: [-offset, offset],
    br: [offset, offset],
    ml: [-offset, 0],
    mr: [offset, 0]
  };

  const patterns = {
    1: [pos.center],
    2: [pos.tl, pos.br],
    3: [pos.tl, pos.center, pos.br],
    4: [pos.tl, pos.tr, pos.bl, pos.br],
    5: [pos.tl, pos.tr, pos.center, pos.bl, pos.br],
    6: [pos.tl, pos.tr, pos.ml, pos.mr, pos.bl, pos.br]
  };

  patterns[number].forEach(([dx, dy]) => drawDot(dx, dy));
}

function drawEnemies() {
  enemies.forEach(enemy => {
    ctx.fillStyle = enemy.color;
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, enemy.size / 2, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawBullets() {
  ctx.fillStyle = "#00ffff";
  bullets.forEach(bullet => {
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, 4, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawEnemyBullets() {
  ctx.fillStyle = "#ffcc00";
  enemyBullets.forEach(bullet => {
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, bullet.radius || 5, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawStars() {
    ctx.fillStyle = "#111"; // opsiyonel: arka plan karanlığı
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    ctx.fillStyle = "#ffffff";
    stars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
    });
  }
  function startGame(mode) {
    gameMode = mode;
    startScreen.style.display = "none";
  
    if (bgMusic.paused) {
      bgMusic.volume = 0.3;
      bgMusic.play().catch(err => console.log("Müzik hatası:", err));
    }
  
    gameLoop();
  }
  
  normalBtn.addEventListener("click", () => {
    startGame("normal");
  });
  
  hardcoreBtn.addEventListener("click", () => {
    startGame("hardcore");
  });
  
  
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    drawStars();
    drawEnemies();
    drawBullets();
    drawEnemyBullets();
    drawPlayer();
  
    // CAN bilgisi
    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Can: " + player.health, 20, 20);
  
    // SKOR bilgisi
    ctx.fillText("Skor: " + score, 20, 45);
  
    // GAME OVER ekranı
    if (gameOver) {
      ctx.fillStyle = "#ff4444";
      ctx.font = "60px Arial";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
  
      // GAME OVER'da skor tekrar gösterilsin
      ctx.font = "30px Arial";
      ctx.fillText("Skor: " + score, canvas.width / 2, canvas.height / 2 + 50);
  
      // Butonları göster
      restartBtn.style.display = "block";
      homeBtn.style.display = "block";
    } else {
      // Butonları gizle
      restartBtn.style.display = "none";
      homeBtn.style.display = "none";
    }
  }
  
  

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}




