import { useState } from "react";
import { generateQR } from "../services/api";
import Layout from "../components/Layout";

function Vendor() {
  const [productName, setProductName] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [qrImage, setQrImage] = useState("");

  const handleGenerate = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await generateQR({ productName, batchNumber }, token);
      setQrImage(res.data.qrImage);
    } catch {
      alert("QR generation failed");
    }
  };

  const downloadQR = () => {
  const link = document.createElement("a");
  link.href = qrImage;
  link.download = "qr-code.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  };


  return (
    <Layout>
      <div style={styles.card}>
        <h2 style={{ textAlign: "center" }}>Vendor Dashboard</h2>
<p style={{ textAlign: "center", color: "#6b7280" }}>
  Generate QR codes for products
</p>


        <input
          placeholder="Product Name"
          onChange={(e) => setProductName(e.target.value)}
        />

        <input
          placeholder="Batch Number"
          onChange={(e) => setBatchNumber(e.target.value)}
        />

        <button onClick={handleGenerate}>Generate QR</button>

        {qrImage && (
  <>
    <img
  src={qrImage}
  alt="QR Code"
  style={{ width: "180px", margin: "10px auto" }}
/>

    <button onClick={downloadQR} style={styles.download}>
      Download QR Code
    </button>
  </>
)}

      </div>
    </Layout>
  );
}

const styles = {
  card: {
  background: "white",
  padding: "30px",
  maxWidth: "440px",
  margin: "0 auto",
  borderRadius: "14px",
  boxShadow: "0 15px 30px rgba(0,0,0,0.12)",
  display: "flex",
  flexDirection: "column",
  gap: "14px",
}
,
  download: {
  background: "#16a34a",
  color: "white",
}
,

};

export default Vendor;

