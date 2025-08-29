import react from 'react'
import Routess from './components/routess'
import './App.css'
import { ToastContainer } from 'react-toastify'
function App() {
return(<><Routess/>
     <ToastContainer position="top-right" style={{ top: "75px" }} autoClose={1000} />
     </>
)}

export default App
