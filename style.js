$(function() { 
    $("#btnSave").click(function() { 
        html2canvas($("#content-disp"), {
          onrendered: function (canvas) {
		        var a = document.createElement('a');
		        // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
		        a.href = canvas.toDataURL();
		        a.download = 'somefilename.jpg';
		        a.click();
  				}
        });
    });
});

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    var img_phone = document.getElementById("phones").value;
    var img_price = document.getElementById("price").value;
	  var img_ttl = document.getElementById("ttl").value;
	  var img_specsing = document.getElementById("specsing").value;

    document.getElementById('phonenumber').innerHTML = img_phone;
    document.getElementById('price_contents').innerHTML = img_price;
    document.getElementById('ttl_contents').innerHTML = img_ttl;
    document.getElementById('specs_contents').innerHTML = img_specsing;

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      	// Only process image files.
      	if (!f.type.match('image.*')) {
        	continue;
      	}

      	var reader = new FileReader();

      	// Closure to capture the file information.
      	reader.onload = (function(theFile) {
        	return function(e) {
	          	// Render thumbnail.
	          	var span = document.createElement('span');
	          	console.log(span);
	          	span.innerHTML = ['<img class="thumb" src="', e.target.result,
	                            '" title="', escape(theFile.name), '"/>'].join('');
	          	document.getElementById('preview').insertBefore(span, null);
        	};
    	})(f);

    	// Read in the image file as a data URL.
    	reader.readAsDataURL(f);
    }
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);