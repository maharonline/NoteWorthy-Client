import { Bounce, ToastContainer } from 'react-toastify';
import './App.css';
import Routes from './Pages/Routes'


function App() {
  return (
    <>
     <ToastContainer position='top-center' autoClose={2000} transition={Bounce}/>
   <Routes/>
    
    </>
  );
}

export default App;
