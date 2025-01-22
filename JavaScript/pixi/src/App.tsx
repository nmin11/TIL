import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ChooChooTrain from './ChooChooTrain';
import FishPond from './FishPond';
import GettingStarted from './GettingStarted';
import Home from './Home';
import NavBar from './NavBar';
import SpineBoyAdventure from './SpineBoyAdventure';

const App:React.FC = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/getting-started" element={<GettingStarted />} />
          <Route path="/fish-pond" element={<FishPond />} />
          <Route path="/choo-choo-train" element={<ChooChooTrain />} />
          <Route path="/spine-boy-adventure" element={<SpineBoyAdventure />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
