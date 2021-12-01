let width;
let height;

const handleImage = (e) => {
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvas.width = img.width;
            width = img.width;
            canvas.height = img.height;
            height = img.height;
            ctx.drawImage(img,0,0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}

var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
const sampleSize = 40;


const mosaic = () => {

    let pixelArray = ctx.getImageData(0, 0, width, height);
    for (let y = 0; y < height; y += sampleSize) {
        for (let x = 0; x < width; x += sampleSize) {
          let p = (x + (y*width)) * 4;
          console.log(`rgba(${pixelArray[p]}, ${pixelArray[p + 1]}, ${pixelArray[p + 2]}, ${pixelArray[p + 3]})`);
          ctx.fillStyle = "rgba(" + pixelArray[p] + "," + pixelArray[p + 1] + "," + pixelArray[p + 2] + "," + pixelArray[p + 3] + ")";
          ctx.fillRect(x, y, sampleSize, sampleSize);
        }
    }
}