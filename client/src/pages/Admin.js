import Layout from "../components/Layout";

function Admin() {
  return (
    <Layout>
      <h2 style={{ marginBottom: "20px" }}>Admin Dashboard 👑</h2>

      <div style={styles.grid}>
        {/* USERS */}
        <div style={styles.card}>
          <h3>Users Overview</h3>
          <p>Total Users: 12</p>
          <p>Vendors: 5</p>
          <p>Verifiers: 6</p>
          <p>Admins: 1</p>
        </div>

        {/* QR REPORT */}
        <div style={styles.card}>
          <h3>QR Scan Reports</h3>
          <p>QR Generated: 40</p>
          <p>QR Verified: 30</p>
          <p>Fake / Reused QR: 3</p>
        </div>

        {/* SYSTEM STATUS */}
        <div style={styles.card}>
          <h3>System Status</h3>
          <p>🟢 Server: Running</p>
          <p>🟢 Database: Connected</p>
          <p>🟢 Authentication: Active</p>
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
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
};

export default Admin;

