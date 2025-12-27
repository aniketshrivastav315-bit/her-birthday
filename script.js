let bgm = new Audio("songs/birthday.mp3");
bgm.loop = true;

// restore music time
const savedTime = localStorage.getItem("musicTime");
if (savedTime) bgm.currentTime = savedTime;

function toggleMusic(){
  if(bgm.paused){
    bgm.play().catch(()=>{});
  } else {
    bgm.pause();
  }
}

// save progress
setInterval(() => {
  if (!bgm.paused) {
    localStorage.setItem("musicTime", bgm.currentTime);
  }
}, 500);

function toggleMusic(){
  if(bgm.paused) bgm.play();
  else bgm.pause();
}

/* ---------- LOGIN ---------- */
function login(){
  if (user.value === "Cutie" && pass.value === "guukhalo") {
    location.href = "home.html";
  } else {
    err.innerText = "Dimaag Lagao... Acha ha wo to hai nhi... Guukhalo😢";
  }
}

function go(p){ location.href = p; }

/* ---------- CUTENESS LOADER ---------- */
function openLoader(){
  const load = document.getElementById("load");
  const fill = document.getElementById("fill");
  const percent = document.getElementById("percent");
  const warn = document.getElementById("warn");
  const box = document.getElementById("loaderBox");

  load.classList.add("active");     // 🔥 IMPORTANT
  box.classList.remove("pulse");

  let p = 0;
  fill.style.width = "0%";
  percent.innerText = "Loading... 0%";
  warn.innerText = "💖 Preparing cuteness 💖";

  const interval = setInterval(() => {
    p += 1;
    if(p > 120) p = 120;

    fill.style.width = p + "%";
    percent.innerText = `Loading... ${p}%`;

    if(p === 120){
      clearInterval(interval);
      percent.innerText = "⚠️ CUTENESS OVERLOADED ⚠️";
      warn.innerText = "🔥 Too cute to handle 🔥";
      box.classList.add("pulse");   // 💓 NOW WORKS

      setTimeout(()=>{
        load.classList.remove("active");
        box.classList.remove("pulse");
      },6000);
    }
  },40);
}
/* ---------- GALLERY ---------- */
function openPhoto(src){
  document.getElementById("photoModal").style.display="flex";
  document.getElementById("modalImg").src = src;
}

/* ---------- SURPRISE : KNIFE DRAMA ---------- */
function startKnifeDrama(){
  knifeStage = 0; // 🔥 RESET
  badBtn.style.display = "inline-block";
  changeBtn.innerText = "change kro knife";
  knifeImg.src = "images/knife-bad.png";

  const loader = document.getElementById("knifeLoader");
  loader.classList.add("active");
}

function badKnife(){
  knifeStage++;

  if(knifeStage === 1){
    knifeText.innerText =
      "Thode se suar ho kyaa... change kro chup chap 😤";
  } 
  else {
    knifeText.innerText =
      "Aap ghodu ho... ruko mai button gyb krta hu..... hush 😶";

    setTimeout(()=>{
      badBtn.style.display="none";
      changeBtn.innerText="chup chap change kro";
    },5000);
  }
}

function changeKnife(){
  knifeImg.src="images/knife-good.png";
  knifeText.innerText="haa ab aagya na asli chaku 😌🔪";

  badBtn.style.display="none";
  changeBtn.innerText="cut krooooooo.....";
  changeBtn.onclick = cutCakeSlice;
}

function cutCakeSlice(){

  // 🔪 loader band (correct way)
  document.getElementById("knifeLoader").classList.remove("active");

  const plate = document.getElementById("plate");
  const slice = document.getElementById("cakeSlice");

  // reset
  plate.classList.remove("show");
  slice.classList.remove("slice-move");

  // force reflow (VERY IMPORTANT)
  void plate.offsetWidth;

  // show
  plate.style.display = "block";
  slice.style.display = "block";

  // next frame animation
  setTimeout(() => {
    plate.classList.add("show");
    slice.classList.add("slice-move");
  }, 50);

  // cake drag after animation
  setTimeout(enableCakeDrag, 1400);
}


function enableCakeDrag(){
  const cake = document.getElementById("cake");
  const loveBtn = document.getElementById("loveBtn");

  let startX = 0;
  let currentX = 0;
  let dragging = false;
  let revealed = false;

  cake.addEventListener("mousedown", startDrag);
  cake.addEventListener("touchstart", startDrag);

  document.addEventListener("mousemove", drag);
  document.addEventListener("touchmove", drag);

  document.addEventListener("mouseup", endDrag);
  document.addEventListener("touchend", endDrag);

  function startDrag(e){
    dragging = true;
    startX = getX(e);
    cake.style.transition = "none";
  }

  function drag(e){
    if(!dragging) return;

    currentX = getX(e) - startX;
    if(currentX > 0) currentX = 0;

    cake.style.transform = `translateX(${currentX}px)`;

    if(currentX < -120 && !revealed){
      revealed = true;
      loveBtn.style.display = "block";
      requestAnimationFrame(()=>{
        loveBtn.classList.add("show");
      });
    }
  }

  function endDrag(){
    dragging = false;
    cake.style.transition = "transform .6s ease";

    if(revealed){
      cake.style.transform = "translateX(-180px)";
    }else{
      cake.style.transform = "translateX(0)";
    }
  }

  function getX(e){
    return e.touches ? e.touches[0].clientX : e.clientX;
  }
}
function goBack(){
  window.history.back();
}

