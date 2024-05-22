import React from 'react';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import SongList from './components/SongList';
import Statistics from './components/Statistics';
import SongForm from './components/SongForm';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<SongList onAdd={() => {}} />} />
          <Route path="/add-song" element={<SongForm onClose={() => {}} />} />
          <Route path="/statistics" element={<Statistics/>} />
          <Route path="*" element={<Statistics/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
