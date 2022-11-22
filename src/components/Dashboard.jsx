import React from "react";
import { logout } from "../firebase";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const Out = () => {
        logout().then( () => { navigate("/") })
    }
  
  return (
    <div>
        <button onClick={() => { Out() }}>Logout</button>
    </div>
  )
}

export default Dashboard
