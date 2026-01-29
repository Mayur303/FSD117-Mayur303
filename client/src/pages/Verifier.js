import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";
import { useState } from "react";
import { verifyQR } from "../services/api";
import Layout from "../components/Layout";

function Verifier() {
  const [qrToken, setQrToken] = useState("");
  const [result, setResult] = useState(null);
  const [scanMode, setScanMode] = useState(false);

  useEffect(() => {
  if (!scanMode) return;

  const scanner = new Html5QrcodeScanner(
    "qr-reader",
    { fps: 10, qrbox: 250 },      
    false
  );

  scanner.render(
    async (decodedText) => {
      scanner.clear();
      setScanMode(false);

      try {
        const jwt = localStorage.getItem("token");
        const res = await verifyQR({ token: decodedText }, jwt);
        setResult(res.data);
      } catch {
        setResult({ status: "INVALID", message: "Verification failed" });
      }
    },
    () => {}
  );

  return () => {
    scanner.clear().catch(() => {});
  };
}, [scanMode]);


  const handleVerify = async () => {
    try {
      const jwt = localStorage.getItem("token");
      const res = await verifyQR({ token: qrToken }, jwt);
      setResult(res.data);
    } catch {
      setResult({ status: "INVALID", message: "Verification failed" });
    }
  };

  const getResultStyle = () => {
    if (!result) return {};
    if (result.status === "VALID") return styles.valid;
    if (result.status === "USED") return styles.used;
    return styles.invalid;
  };

  return (
    <Layout>
      <div style={styles.card}>
       <h2 style={{ textAlign: "center" }}>Verifier Dashboard</h2>
<p style={{ textAlign: "center", color: "#6b7280" }}>
  Scan or verify QR codes
</p>


{/* CAMERA SCAN BUTTON */}
<button style={{ background: "#2563eb", color: "white" }} onClick={() => setScanMode(true)}>
  Scan QR using Camera
</button>

{/* CAMERA VIEW */}
{scanMode && (
  <div
    id="qr-reader"
    style={{ width: "100%", marginTop: "15px" }}
  ></div>
)}

<hr />

{/* MANUAL TOKEN VERIFY (OPTIONAL BACKUP) */}
<input
  placeholder="Paste QR Token"
  onChange={(e) => setQrToken(e.target.value)}
/>

<button onClick={handleVerify}>Verify Manually</button>


        {result && (
          <div style={getResultStyle()}>
            <strong>{result.status}</strong>
            <p>
              {result.productName
                ? `Product: ${result.productName}`
                : result.message}
            </p>
          </div>
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
 valid: {
  background: "#dcfce7",
  color: "#178740",
  padding: "14px",
  borderRadius: "8px",
  transition: "all 0.3s ease",
},

  used: {
    background: "#fef9c3",
    color: "#e2c671",
    padding: "12px",
    borderRadius: "6px",
  },
  invalid: {
    background: "#fee2e2",
    color: "#EF4444",
    padding: "12px",
    borderRadius: "6px",
  },
};

export default Verifier;

