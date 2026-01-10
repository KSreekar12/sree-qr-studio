// 🔥 PASTE YOUR REAL FIREBASE CONFIG HERE
const firebaseConfig = {
  apiKey: "PASTE_REAL_API_KEY",
  authDomain: "PASTE_PROJECT.firebaseapp.com",
  projectId: "PASTE_PROJECT_ID",
  storageBucket: "PASTE_PROJECT_ID.appspot.com",
  messagingSenderId: "PASTE_SENDER_ID",
  appId: "PASTE_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

// QR setup (after DOM ready)
const qrCode = new QRCodeStyling({
  width: 240,
  height: 240,
  type: "canvas",
  data: "",
  dotsOptions: {
    type: "square",
    color: "#020617"
  },
  backgroundOptions: {
    color: "#ffffff"
  }
});

document.addEventListener("DOMContentLoaded", () => {
  qrCode.append(document.getElementById("qrBox"));
});

const qrCard = document.getElementById("qrCard");
const statusText = document.getElementById("status");

// Show QR card
function showQR() {
  qrCard.style.display = "block";
}

// TEXT / LINK / EMOJI
function generateFromText() {
  const text = document.getElementById("qrText").value.trim();
  if (!text) {
    alert("Enter text or link");
    return;
  }
  qrCode.update({ data: text });
  showQR();
}

// FILE → FIREBASE → QR
function uploadAndGenerateQR() {
  const file = document.getElementById("fileInput").files[0];
  if (!file) {
    alert("Select a file first");
    return;
  }

  statusText.innerText = "Uploading…";

  const ref = storage.ref("uploads/" + Date.now() + "_" + file.name);
  const uploadTask = ref.put(file);

  uploadTask.on(
    "state_changed",
    snapshot => {
      const percent =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      statusText.innerText = `Uploading ${Math.round(percent)}%`;
    },
    error => {
      console.error(error);
      alert("Upload failed: " + error.message);
    },
    async () => {
      const url = await ref.getDownloadURL();
      qrCode.update({ data: url });
      statusText.innerText = "Upload complete ✅";
      showQR();
    }
  );
}

// Download QR
function downloadQR() {
  qrCode.download({
    name: "Sree-QR",
    extension: "png"
  });
}
