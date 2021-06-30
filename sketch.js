let cnv;
let width;
let height;
let mainF;
let video;
let inp;
let mainText;
let snap;
let enter;
let firstInput;
let domBackground;
let domForeground;
let reroll;
let swap;
let selectedColors;
let previousColors;
let cacheForeground;



let backgroundColor;
let foregroundColor;

let vscale = 20;

let textArray = ["M", "O", "V", "E", "M", "E", "N", "T"];

let textIndex;
let previousFrame = 0;

let colors = [
  ["#FFE483", "#EC651A"],["#004466", "#2AEAA4"],["#FFFFFF", "#000000"],["#FF3981", "#3C4548"], ["#EEA748", "#0D55B4"],["#00042a", "#985fe4"], ["#93058c", "#b9fdbc"], ["#16005f", "#737cce"], ["#682061", "#9ae2a1"], ["#181b7a","#ede788"], ["#00527b", "#ffa981"], ["#8f2266", "#6fe89c"], ["#9e00ab", "#2aeccd"], ["#cfde5a", "#2d1ea2"], ["#001794", "#78a7ff"], ["#f7cf00", "#042df9"], ["#005100", "#3cf4c1"], ["#07296b", "#fed897"], ["#ffffff", "#0e183d"], ["#04335b", "#f47a66"], ["#6a383d", "#84bfb9"], ["#361b00", "#d26ffb"], ["#500042", "#ade7ba"], ["#e0623d", "#00233f"], ["#c3df9e", "#391d5e"], ["#752851", "#8ddab1"], ["#a91034", "#5af7ce"], ["#cdcab2", "#2f324a"],["#72f500", "#7d05e4"], ["#6f102d", "#58c3a9"], ["#eddeff", "#476859"]
]


function setup() {
  if (windowWidth - 80 < 1000) {
    width = windowWidth - 80;
  } else {
    width = 1000; 
  }
  height = width * 0.7;

  cnv = createCanvas(width, height);
  // var x = (windowWidth - width) / 2;
  // var y =  80;
  // cnv.position(x, y);
  backgroundColor = "#000000"; 
  foregroundColor = "#FFFFFF";


  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(1100 / vscale, 800 / vscale);
  video.hide();
   //move image by the width of image to the left

  inp = select("input");
  enter = select(".controls__input__return");
  snap = select(".controls__snap");
  document.documentElement.style.setProperty("--color-first", backgroundColor);
  document.documentElement.style.setProperty("--color-second", foregroundColor);
  document.getElementById("controls__color__swap__stroke").style.stroke = foregroundColor;
  document.getElementById("controls__color__swap__fill").style.fill = foregroundColor;
  reroll = select(".controls__color__reroll");
  swap = select(".controls__color__swap")
  firstInput = true;
  textIndex = 0;
  selectedColors = [];


}

function draw() {

  // if (mainText != undefined) {
  //   if (keyIsDown(13)) {

  //     changeText();

  //   }
  //   enter.mousePressed(changeText);
  // }
  snap.mousePressed(download);

  reroll.mousePressed(changeColor);
  swap.mousePressed(swapColor);

   if (keyIsDown(13)) {
     textArray = inp.value().split("");

  }
  // if ($("input").is(":focus")) {
  //   if (firstInput) {
  //     if (keyIsPressed) {
  //       inp.value(key);
  //       console.log("enter")
  //       console.log(inp)

  //       console.log(inp.value())
  //       firstInput = false;
  //     }
  //   }
  // }

  background(backgroundColor);
  video.loadPixels();
  loadPixels();
  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      let index = ((x*-1) + y * video.width) * 4;

      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];

      let dark = 255 - (r + g + b) / 3;
      
      if (dark > 150) {
        fill(foregroundColor);

        textSize(map(dark, 150, 255, 1, vscale));
      } else {
        fill(backgroundColor);
        textSize(0);
      }

      textIndex++;
      textIndex = textIndex % textArray.length;
      text(textArray[textIndex], x * vscale, y * vscale);
    }
  }
  textIndex = 0;
}

function inputEvent() {
  console.log(this.value())
  mainText = this.value();
}

function changeText() {
  textArray = mainText.split("");
}

function download() {
  saveCanvas(cnv, 'Type Mirror', 'png')
}

function changeColor() {

  previousColors = selectedColors;
  
  selectedColors = random(colors);
  while (selectedColors == previousColors ||selectedColors[0]==previousColors[1]) {
    selectedColors = random(colors);
  }
  let r = random(0,1);
  if (Math.random() >= 0.5) {
    foregroundColor = selectedColors[0];
    backgroundColor = selectedColors[1];
  } else {
    foregroundColor = selectedColors[1];
    backgroundColor = selectedColors[0];
  }

  document.getElementById("controls__color__swap__stroke").style.stroke = foregroundColor;
  document.getElementById("controls__color__swap__fill").style.fill = foregroundColor;

  document.documentElement.style.setProperty("--color-first", backgroundColor);
  document.documentElement.style.setProperty("--color-second", foregroundColor);
}

function swapColor() {
  cacheForeground = foregroundColor;

  foregroundColor = backgroundColor;
  backgroundColor = cacheForeground;

  document.getElementById("controls__color__swap__stroke").style.stroke = foregroundColor;
  document.getElementById("controls__color__swap__fill").style.fill = foregroundColor;

  document.documentElement.style.setProperty("--color-first", backgroundColor);
  document.documentElement.style.setProperty("--color-second", foregroundColor);
}