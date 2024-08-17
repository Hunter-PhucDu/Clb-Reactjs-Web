import './App.css';
import Homepage from './pages/homepage';

function App({ notify }) {
  return (
    <div className="App">
      <Homepage notify={notify} />
    </div>
  );
}

export default App;

