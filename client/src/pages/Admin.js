import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  getQrGenerationLogs,
  getQrVerificationLogs,
} from "../services/api";

function Admin() {
  const [activeTab, setActiveTab] = useState("generation");
  const [generationLogs, setGenerationLogs] = useState([]);
  const [verificationLogs, setVerificationLogs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    getQrGenerationLogs(token).then((res) =>
      setGenerationLogs(res.data)
    );

    getQrVerificationLogs(token).then((res) =>
      setVerificationLogs(res.data)
    );
  }, []);

  return (
    <Layout>
      <div style={styles.container}>
        <h2 style={{ textAlign: "center" }}>Admin Dashboard</h2>

        {/* TABS */}
        <div style={styles.tabs}>
          <button onClick={() => setActiveTab("generation")}>
            QR Generation Logs
          </button>
          <button onClick={() => setActiveTab("verification")}>
            QR Verification Logs
          </button>
        </div>

        {/* CONTENT */}
        {activeTab === "generation" && (
          <GenerationTable logs={generationLogs} />
        )}

        {activeTab === "verification" && (
          <VerificationTable logs={verificationLogs} />
        )}
      </div>
    </Layout>
  );
}

export default Admin;

function GenerationTable({ logs }) {
  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th>Vendor</th>
          <th>Product</th>
          <th>Batch</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <tr key={log._id}>
            <td>{log.vendorUsername}</td>
            <td>{log.productName}</td>
            <td>{log.batchNumber}</td>
            <td>{new Date(log.createdAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function VerificationTable({ logs }) {
  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th>Verifier</th>
          <th>Product</th>
          <th>Status</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <tr key={log._id}>
            <td>{log.verifierUsername}</td>
            <td>{log.productName}</td>
            <td
              style={{
                fontWeight: "600",
                color:
                  log.status === "VALID"
                    ? "green"
                    : log.status === "USED"
                    ? "orange"
                    : "red",
              }}
            >
              {log.status}
            </td>
            <td>{new Date(log.verifiedAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


const styles = {
  container: {
    background: "white",
    padding: "25px",
    borderRadius: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  tabs: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
};


