// 🔥 REAL FIREBASE CONFIG (PUT YOUR REAL VALUES)
const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY",
  authDomain: "PASTE_YOUR_PROJECT.firebaseapp.com",
  projectId: "PASTE_YOUR_PROJECT_ID",
  storageBucket: "PASTE_YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "PASTE_SENDER_ID",
  appId: "PASTE_APP_ID"
};

// Init Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

// QR setup
const qrCode = new QRCodeStyling({
  width: 240,
  height: 240,
  type: "canvas",
  data: "",
  dotsOptions: { type: "square", color: "#020617" },
  backgroundOptions: { color: "#ffffff" }
});

qrCode.append(document.getElementById("qrBox"));

const qrCard = document.getElementById("qrCard");
const statusText = document.getElementById("status");

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

// FILE UPLOAD + QR
function uploadAndGenerateQR() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (!file) {
    alert("Select a file first");
    return;
  }

  statusText.innerText = "Uploading…";

  const storageRef = storage
    .ref()
    .child("uploads/" + Date.now() + "_" + file.name);

  const uploadTask = storageRef.put(file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      statusText.innerText = `Uploading ${Math.round(progress)}%`;
    },
    (error) => {
      console.error(error);
      alert("Upload failed: " + error.message);
    },
    async () => {
      const downloadURL = await storageRef.getDownloadURL();
      qrCode.update({ data: downloadURL });
      statusText.innerText = "Upload complete ✅";
      showQR();
    }
  );
}

// Download QR
function downloadQR() {
  qrCode.download({ name: "Sree-QR", extension: "png" });
}
