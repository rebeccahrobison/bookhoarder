import { useEffect } from "react";
import "./BarcodeScanner.css"
import { BarcodeDetector } from 'barcode-detector';

export const BarcodeScanner = ({ setBarcode, showScanner }) => {

  useEffect(() => {
    if (showScanner) {
      async function initializeBarcodeScanner() {
        // Initialize the barcode detector and video feed
        if (!("BarcodeDetector" in window)) {
          console.log("Barcode Detector is not supported by this browser.");
        } else {
          console.log("Barcode Detector supported!");

          const barcodeDetector = new BarcodeDetector({
            formats: [
              'aztec',
              'code_128',
              'code_39',
              'code_93',
              'codabar',
              'data_matrix',
              'ean_13',
              'ean_8',
              'itf',
              'pdf417',
              'qr_code',
              'upc_a',
              'upc_e'],
          });

          const list = document.getElementById("barcode-list");
          const videoContainer = document.getElementById("video-container");
          let itemsFound = [];
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }
          });

          const video = document.createElement("video");
          videoContainer.appendChild(video);
          video.srcObject = mediaStream;
          video.autoplay = true;

          
          list?.before(video);

          function render() {
            barcodeDetector
              .detect(video)
              .then((barcodes) => {
                barcodes.forEach((barcode) => {
                  if (!itemsFound.includes(barcode.rawValue)) {
                    itemsFound.push(barcode.rawValue);
                    setBarcode(barcode.rawValue);
                  }
                });
              })
              .catch(console.error);
          }

          (function renderLoop() {
            requestAnimationFrame(renderLoop);
            render();
          })();
        }

      }
      
      initializeBarcodeScanner();
    }
  }, [showScanner, setBarcode]);

  // check compatibility
  // if (!("BarcodeDetector" in window)) {
  //   console.log("Barcode Detector is not supported by this browser.");
  // } else {
  //   console.log("Barcode Detector supported!");

  //   // create new detector
  //   const barcodeDetector = new BarcodeDetector({
  //     formats: [
  //       'aztec',
  //       'code_128',
  //       'code_39',
  //       'code_93',
  //       'codabar',
  //       'data_matrix',
  //       'ean_13',
  //       'ean_8',
  //       'itf',
  //       'pdf417',
  //       'qr_code',
  //       'upc_a',
  //       'upc_e'],
  //   });
  // }

  // async function checkIfFormatIsSupported(format) {

  //   return await BarcodeDetector.getSupportedFormats()
  //     .then(supportedFormats => {
  //       console.log(supportedFormats);
  //       return supportedFormats.indexOf(format) !== -1;
  //     });
  // }

  // window.onload = () => {
  //   detect();
  // };

  // // checkIfFormatIsSupported()

  // async function detect() {
  //   const barcodeDetector = new BarcodeDetector({
  //     formats: [
  //       'aztec',
  //       'code_128',
  //       'code_39',
  //       'code_93',
  //       'codabar',
  //       'data_matrix',
  //       'ean_13',
  //       'ean_8',
  //       'itf',
  //       'pdf417',
  //       'qr_code',
  //       'upc_a',
  //       'upc_e'],
  //   });

  //   const list = document.getElementById("barcode-list");
  //   const videoContainer = document.getElementById("video-container")
  //   let itemsFound = [];
  //   const mediaStream = await navigator.mediaDevices.getUserMedia({
  //     video: { facingMode: "environment" }
  //   });

  //   // const videoContainer = document.createElement("div")
  //   // videoContainer.className = "video-container"
  //   const video = document.createElement("video");
  //   videoContainer?.appendChild(video)
  //   video.srcObject = mediaStream;
  //   video.autoplay = true;

  //   list?.before(video);

  //   function render() {
  //     barcodeDetector
  //       .detect(video)
  //       .then((barcodes) => {
  //         barcodes.forEach((barcode) => {
  //           if (!itemsFound.includes(barcode.rawValue)) {
  //             itemsFound.push(barcode.rawValue);
  //             // const li = document.createElement("li");
  //             // li.innerHTML = barcode.rawValue;
  //             // list.appendChild(li);
  //             setBarcode(barcode.rawValue)
  //           }
  //         });
  //       })
  //       .catch(console.error);
  //   }

  //   (function renderLoop() {
  //     requestAnimationFrame(renderLoop);
  //     render();
  //   })();

  // }

  return (
    <div className="App">
      <div id="video-container"></div>
    </div>
  );
}



// try {
//   const barcodes = await barcodeDetector.detect(image);
//   barcodes.forEach(barcode => console.log(barcode));
// } catch (e) {
//  // if the imageElement is invalid, the DOMException will be thrown
//   console.error('Barcode detection failed:', e);
// }