const qrCode = new QRCodeStyling({
  width: 260,
  height: 260,
  type: "canvas",
  data: "",
  dotsOptions: {
    type: "square",
    color: "#111827"
  },
  cornersSquareOptions: {
    type: "square",
    color: "#020617"
  },
  cornersDotOptions: {
    type: "square",
    color: "#020617"
  },
  backgroundOptions: {
    color: "#ffffff"
  }
});

qrCode.append(document.getElementById("qrBox"));

const qrCard = document.getElementById("qrCard");

function showQR() {
  qrCard.style.display = "block";
}

function generateFromText() {
  const text = document.getElementById("qrText").value.trim();
  if (!text) {
    alert("Please enter a valid link");
    return;
  }
  qrCode.update({ data: text });
  showQR();
}

function generateFromFile() {
  const file = document.getElementById("fileInput").files[0];
  if (!file) {
    alert("Please select a file");
    return;
  }
  const fileURL = URL.createObjectURL(file);
  qrCode.update({ data: fileURL });
  showQR();
}

function downloadQR() {
  qrCode.download({
    name: "Sree-QR",
    extension: "png"
  });
}
