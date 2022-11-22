import React from "react";
import { logout } from "../firebase";


function Dashboard() {
  
  return (
    <div>
        <button onClick={()=>{logout()}}>Déconnexion</button>
    </div>
  )
}

export default Dashboard
