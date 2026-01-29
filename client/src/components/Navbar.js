import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={styles.nav}>
      <h3 >QR Verification System</h3>
      <button style={styles.logout} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  
  nav: {
    height: "60px",
    background: "#142C52",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
  },
  logout: {
  background: "#F4F7FA",
  color: "black",
  padding: "8px 16px",
  borderRadius: "999px",
},


};

export default Navbar;


