import './App.css';
import GettingStarted from './GettingStarted';
import Home from './Home';
import NavBar from './NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App:React.FC = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/getting-started" element={<GettingStarted />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
