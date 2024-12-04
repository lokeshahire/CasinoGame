const icons = [
  "dist/imgs/icon1.png",
  "dist/imgs/icon2.png",
  "dist/imgs/icon3.png",
];
const columns = [
  document.getElementById("column1"),
  document.getElementById("column2"),
  document.getElementById("column3"),
  document.getElementById("column4"),
  document.getElementById("column5"),
];
const spinBtn = document.getElementById("spinBtn");

const spinSpeeds = [350, 450, 550, 650, 750];
const spinDuration = 1500;

function populateReel(reel) {
  reel.innerHTML = "";
  for (let i = 0; i < icons.length * 5; i++) {
    const div = document.createElement("div");
    const img = document.createElement("img");
    img.src = icons[i % icons.length];
    div.classList.add("innerDiv");
    div.appendChild(img);
    reel.appendChild(div);
  }
}

columns.forEach(populateReel);

let isSpinning = false;

function spinReels() {
  if (isSpinning) return;
  isSpinning = true;
  spinBtn.disabled = true;

  const results = [];

  const reelHeight = document.querySelector(".reel").offsetHeight;
  const iconHeight1 = reelHeight / 3.055;
  console.log("iconHeight", iconHeight1);
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  let iconHeight;

  if (screenWidth == 2560 && screenHeight == 1440) {
    iconHeight = 360;
  } else if (screenWidth == 1920 && screenHeight == 1080) {
    iconHeight = 270;
  } else if (screenWidth == 1920) {
    iconHeight = 215;
  } else if (screenWidth == 1792 && screenHeight == 1120) {
    iconHeight = 280;
  } else if (screenWidth == 1600 && screenHeight == 900) {
    iconHeight = 225;
  } else if (screenWidth >= 1600) {
    iconHeight = 172;
  } else if (screenWidth == 1536) {
    iconHeight = 180;
  } else if (screenWidth == 1512 && screenHeight == 982) {
    iconHeight = 250;
  } else if (screenWidth == 1440 && screenHeight == 900) {
    iconHeight = 225;
  } else if (screenWidth >= 1440) {
    iconHeight = 160;
  } else if (screenWidth == 1366 && screenHeight == 768) {
    iconHeight = 190;
  } else if (screenWidth == 1280 && screenHeight == 1024) {
    iconHeight = 250;
  } else if (screenWidth == 1280 && screenHeight == 720) {
    iconHeight = 180;
  } else if (screenWidth == 1280 && screenHeight == 800) {
    iconHeight = 200;
  } else if (screenWidth >= 1199) {
    iconHeight = 160;
  } else if (screenWidth == 1024) {
    iconHeight = 190;
  } else if (screenWidth == 991 && screenHeight == 642) {
    iconHeight = 160;
  } else if (screenWidth < 767) {
    iconHeight = 170;
  } else {
    iconHeight = 260;
  }

  columns.forEach((column, index) => {
    column.style.animation = `spin ${spinSpeeds[index]}ms linear infinite`;
  });

  columns.forEach((column, index) => {
    setTimeout(() => {
      column.style.animation = "";
      //   const randomIndex = Math.floor(Math.random() * icons.length);
      var randomIndex = Math.floor(Math.random() * (icons.length * 2.5));
      randomIndex = Math.min(randomIndex, icons.length - 1);

      console.log("randomIndex", randomIndex);
      results[index] = randomIndex;

      const offset = randomIndex * -iconHeight;
      column.style.transform = `translateY(${offset}px)`;

      if (index === columns.length - 1) {
        checkResult(results);
        setTimeout(() => {
          isSpinning = false;
          spinBtn.disabled = false;
        }, 500);
      }
    }, spinDuration + index * 800);
  });
}

function checkResult(results) {
  const middleIcons = results.map((index) => icons[index]);
  if (middleIcons.every((icon, _, arr) => icon === arr[0])) {
    const effects = document.querySelector(".effects");
    const wonText = document.getElementById("wonText");

    effects.style.visibility = "visible";
    wonText.style.transform = "scale(1)";

    setTimeout(() => {
      effects.style.visibility = "hidden";
      wonText.style.transform = "scale(0)";
    }, 5000);
  }
}

spinBtn.addEventListener("click", spinReels);
