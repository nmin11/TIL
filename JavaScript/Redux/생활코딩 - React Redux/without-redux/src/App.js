import { Component } from 'react';
import './App.css';

class AddNumber extends Component {
  render() {
    return (
      <div>
        <h1>Add Number</h1>
        <input type="button" value="+"/>
        <input type="text" value="0"/>
      </div>
    );
  }
}

class AddNumberRoot extends Component {
  render() {
    return (
      <div>
        <h1>Add Number Root</h1>
        <AddNumber/>
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <h1>Root</h1>
      <AddNumberRoot></AddNumberRoot>
    </div>
  );
}

export default App;
