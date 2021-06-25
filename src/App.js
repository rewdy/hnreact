import React from 'react';
import Header from './components/Header';
import StoryList from './components/StoryList';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <StoryList />
    </div>
  );
}

export default App;
