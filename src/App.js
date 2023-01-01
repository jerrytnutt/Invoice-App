import './App.css';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
