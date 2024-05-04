// script.js file
function domReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
      setTimeout(fn, 1000);
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }
  
  domReady(function () {
    // Si se encuentra el código QR
    function onScanSuccess(decodeText, decodeResult) {
      // Asegúrate de que el texto decodificado es un número antes de asignarlo al input
      if (!isNaN(decodeText)) {
        document.getElementById('codigoe').value = decodeText;
        console.log(decodeText);
      }
    }
  
    let htmlscanner = new Html5QrcodeScanner("my-qr-reader", { fps: 10, qrbos: 250 });
    htmlscanner.render(onScanSuccess);
});