import { useEffect, useState } from "react";
import "./App.css";
import { SunMedium, Mic, Image } from "lucide-react";
import SideBar from "./Components/SideBar";
import Mainc from "./Components/Mainc";
import {getAuth,GoogleAuthProvider,signInWithPopup,onAuthStateChanged,signOut}  from 'firebase/auth'
import {app} from "./config/firebase";
import Login from "./Components/Login";


const auth = getAuth(app);

const loginHandler = ()=>{
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth,provider)
}
const logOutHandler = ()=>signOut(auth)

function App() {
  const [extended, setExtended] = useState(false);
  const [user,setUser] = useState(false);
  const [userName,setUserName] = useState("");
  const [photo,setPhoto] = useState("");
  useEffect(()=>{
    onAuthStateChanged(auth,(data)=>{
      setUser(data)
      console.log(data.email);
      const email = data.displayName      ;
      setUserName(email);

      console.log(data
      
        );
        setPhoto(data.photoURL)
    })
  },[])
  return (
    <div className="dark">
      {
        user?<div className="flex min-h-screen bg-[#161618] text-white">
        {/* Sidebar */}
        <SideBar extended={extended} setExtended={setExtended} />
        {/* Main Content */}
        <Mainc extended={extended} setExtended={setExtended} logOutHandler={logOutHandler} photo={photo} userName={userName}/>
      </div>:
      <div>
        {/* <button onClick={loginHandler}>sign in with google</button> */}
        <Login loginHandler={loginHandler}/>
      </div>
      }
      
    </div>
  );
}

export default App;
