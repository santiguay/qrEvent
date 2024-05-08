import QrScanner from '.qr-scanner-master/qr-scanner.min.js';
function onScanSuccess(decodedText) {
  // Asegúrate de que el texto decodificado es un número antes de asignarlo al input
  if (!isNaN(decodedText)) {
      document.getElementById('codigoe').value = decodedText;
      console.log(decodedText);
  }
}

const videoElement = document.getElementById('my-qr-reader');
const qrScanner = new QrScanner(videoElement, onScanSuccess);

qrScanner.start().catch((error) => {
  console.error('No se pudo iniciar el escaneo', error);
});