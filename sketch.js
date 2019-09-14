let mainF;
let video;

let vscale = 20;

let textArray = ["M", "O", "V", "E", "M", "E", "N", "T"];

let textIndex = 0;



function setup() {
  let cnv = createCanvas(1100, 800);
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width / vscale, height / vscale);
  video.hide();


}

function draw() {



  background(0);
  video.loadPixels();
  loadPixels();



  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      let index = (x + y * video.width) * 4;

      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];

      let dark = (255 - ((r + g + b) / 3));

      if (dark > 150) {
        fill(255);

        textSize(map(dark, 150, 255, 1, vscale));
      } else {
        fill(0);
        textSize(0);
      }

      //print(bright * 0.1);

      //rect(x * vscale, y * vscale, vscale, vscale);
      textIndex++;
      textIndex = textIndex % (textArray.length);


      text(textArray[textIndex], x * vscale, y * vscale);
    }
  }

}