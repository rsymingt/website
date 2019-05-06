var blobURL = URL.createObjectURL(new Blob(["https://www.crave.ca/tv-shows/game-of-thrones/episode-3-s8e3?ua=eyJtIjoiYSIsInAiOlsiYyIsImNwIl0sImwiOiJlbiJ9"]));
fetch(blobURL)
.then(response => response.blob())
.then(blob => {
  // do stuff with `blob`: `Blob`
  console.log(blob);
    
  var reader = new FileReader();
  reader.onload = function(event)
  {
      console.log("blob" +
        + ' => ' + JSON.stringify(reader.result));
  }
  reader.readAsText(blob);
});