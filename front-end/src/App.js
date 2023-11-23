import './App.css';
import DataDisplay from './components/display_paper';
import AddQuestion from './components/AddNewQuestion';
import UpdateDifficulty from './components/update_difficulty_level';
function App() {
  return (
    <div className="App">
      <AddQuestion/>
      <UpdateDifficulty/>
     <DataDisplay/>
    </div>
  );
}

export default App;
