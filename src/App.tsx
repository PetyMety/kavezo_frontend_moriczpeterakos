import { useState } from 'react';
import './App.css';
import Main from './components/Main';
import ConcertAdd from './components/ConcertAdd';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [activeSection, setActiveSection] = useState('list');

  return (
    <>
      <h1 className="text-center my-4">Kávézó koncert lista:</h1>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <div className="container-fluid">
            <div className="navbar-nav">
              <div style={{ display: 'flex' }}>
                <a
                  href=""
                  className='nav-link'
                  onClick={(e) => { e.preventDefault(); setActiveSection('lista'); }}
                >Lista</a>
                <a
                  href=""
                  className='nav-link'
                  onClick={(e) => { e.preventDefault(); setActiveSection('felvetel'); }}
                >Felvétel</a>
              </div>
            </div>
          </div>
        </nav>
        {activeSection === 'lista' && <Main />}
        {activeSection === 'felvetel' && <ConcertAdd />}
        {(activeSection !== 'lista' && activeSection !== 'felvetel') && <Main />}
      </div>
    </>
  );
}

export default App;