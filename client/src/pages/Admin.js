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

        <div style={styles.tabs}>
          <button onClick={() => setActiveTab("generation")}>
            QR Generation Logs
          </button>
          <button onClick={() => setActiveTab("verification")}>
            QR Verification Logs
          </button>
        </div>

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

/* ================= HELPERS ================= */

const getDate = (date) =>
  new Date(date).toLocaleDateString();

const getTime = (date) =>
  new Date(date).toLocaleTimeString();

/* ================= TABLES ================= */

function GenerationTable({ logs }) {
  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Vendor</th>
          <th style={styles.th}>Product</th>
          <th style={styles.th}>Batch</th>
          <th style={styles.th}>Date</th>
          <th style={styles.th}>Time</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <tr key={log._id}>
            <td style={styles.td}>{log.vendorUsername}</td>
            <td style={styles.td}>{log.productName}</td>
            <td style={styles.td}>{log.batchNumber}</td>
            <td style={styles.td}>{getDate(log.createdAt)}</td>
            <td style={styles.td}>{getTime(log.createdAt)}</td>
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
          <th style={styles.th}>Verifier</th>
          <th style={styles.th}>Product</th>
          <th style={styles.th}>Status</th>
          <th style={styles.th}>Date</th>
          <th style={styles.th}>Time</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <tr key={log._id}>
            <td style={styles.td}>{log.verifierUsername}</td>
            <td style={styles.td}>{log.productName}</td>
            <td
              style={{
                ...styles.td,
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
            <td style={styles.td}>{getDate(log.createdAt)}</td>
            <td style={styles.td}>{getTime(log.createdAt)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ================= STYLES ================= */

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
    marginTop: "20px",
  },
  th: {
    textAlign: "left",
    padding: "12px 10px",
    backgroundColor: "#f4f6f8",
    fontWeight: "600",
    borderBottom: "2px solid #ddd",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #eee",
  },
};




