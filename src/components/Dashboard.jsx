import React, {useState} from "react";
import { logout, db } from "../firebase";
import { collection, writeBatch, doc } from "firebase/firestore";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const Out = () => {
        logout().then( () => { navigate("/") })
    }

    const [contacts, setContacts] = useState([])
    const [error,setError] = useState(null);

    const handleClick = async () => {
      const props = ['name', 'email', 'tel', 'address'];
      const opts = {multiple: true};
      
      try {
          const contacts = await navigator.contacts.select(props, opts);
          setContacts(contacts);
          const batch = writeBatch(db);
          contacts.map(async (item)=> {
              batch.set(doc(collection(db,"contacts")),item)
          });

          batch.commit()
      } catch (e) {
          setError(e)
      }
    }
  
  return (
    <div>
        <button onClick={() => { Out() }}>Logout</button>
        {
            error && <p className="error">{error.message}</p>
        }
        <button onClick={handleClick}>HACK</button>
        {
            contacts.map((contact)=>{
                return (
                    <div className="contact" key={contact.email}>
                        <p className="contact__text">{contact.name}</p>
                        <p className="contact__text">{contact.email}</p>
                        <p className="contact__text">{contact.tel}</p>
                        <p className="contact__text">{contact.address}</p>
                    </div>
                )
            })
        }
        <QRCode
            style={{ height: "auto", maxWidth: "100%", width: "30%" }}
            value="https://console.firebase.google.com/u/0/project/pwaapp-8feaf/overview"
            viewBox={`0 0 256 256`}
        />
    </div>
  )
}

export default Dashboard
