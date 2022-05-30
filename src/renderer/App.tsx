import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

const Hello = () => {
  const [keyList, setKeyList] = useState<string>('');
  const [mouseLocation, setMouseLocation] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [lolRunning, setLolRunning] = useState<boolean>(false);

  window.electron.ipcRenderer.updateKey?.((event: string, value: string) =>
    setKeyList(keyList.concat(value))
  );
  window.electron.ipcRenderer.updateMouse?.(
    (event: string, value: { x: number; y: number }) =>
      setMouseLocation({ x: value.x, y: value.y })
  );
  return (
    <div>
      <h1>IO Listener Testing</h1>
      <div className="keyText">
        <p>{keyList}</p>
      </div>
      <div className="mouseLocation">
        <p>
          x : {mouseLocation.x}, y: {mouseLocation.y}
        </p>
      </div>
      <div className="lolCheck">
        <p>lol is running? {lolRunning ? `✅` : `❌`}</p>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
