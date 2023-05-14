import React from 'react';
// import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Users from './components/Users';
import General from './components/General';
import Plan from './components/Plan';
import Billing from './components/Billing';
import Integrations from './components/Integrations';
import { QueryClient,QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
    <div className="App">
      <div className='header' ><h2 style={{paddingLeft:"8px"}}>Company Settings</h2></div>
      <Navbar/>
      <Routes>
            <Route path="/" element={<Users/>}/>
            <Route path="/general" element={<General/>}/>
            <Route path="/plan" element={<Plan/>}/>
            <Route path="/billing" element={<Billing/>}/>
            <Route path="/integrations" element={<Integrations/>}/>
      </Routes>
    </div>
    </Router>
    </QueryClientProvider>
  );
}

export default App;
