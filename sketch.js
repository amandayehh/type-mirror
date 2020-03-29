let mainF;
let video;
let inp;
let mainText;
let enter;
let firstInput;

let vscale = 16;

let textArray = ["M", "O", "V", "E", "M", "E", "N", "T"];

let textIndex;
let previousFrame = 0;

function setup() {
  let cnv = createCanvas(1100, 800);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(1100 / vscale, 800 / vscale);
  video.hide();
  inp = select("input");
  enter = select(".return");
  firstInput = true;
  textIndex = 0;
}

function draw() {
  inp.input(inputEvent);

  if (mainText != undefined) {
    if (keyIsDown(13)) {
      changeText();
    }
    enter.mousePressed(changeText);
  }

  if ($("input").is(":focus")) {
    if (firstInput) {
      if (keyIsPressed) {
        inp.value(key);
        firstInput = false;
      }
    }
  }

  background(0);
  video.loadPixels();
  loadPixels();
  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      let index = (x + y * video.width) * 4;

      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];

      let dark = 255 - (r + g + b) / 3;

      if (dark > 150) {
        fill(255);

        textSize(map(dark, 150, 255, 1, vscale));
      } else {
        fill(0);
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
  mainText = this.value();
}

function changeText() {
  textArray = mainText.split("");
}
