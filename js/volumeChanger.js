var vid = document.getElementById("Bamboozled");
var slider = document.getElementById("audioadjust");

slider.oninput = function() {
  vid.volume = (slider.value / 100);
  document.getElementById('audiolevel').innerHTML = "Volume: " +Math.floor(vid.volume * 100) + " %";
}


