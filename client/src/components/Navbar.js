function Navbar() {
  return (
    <div style={styles.nav}>
      <h3>QR Verification System</h3>
    </div>
  );
}

const styles = {
  nav: {
    height: "60px",
    background: "#1e293b",
    color: "white",
    display: "flex",
    alignItems: "center",
    padding: "0 20px",
  },
};

export default Navbar;

