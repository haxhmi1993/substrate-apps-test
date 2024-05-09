import React from 'react';
import NotificationSystem from './components/NotificationSystem';
import NotificationsList from './components/NotificationsList';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Notification System</h1>
      </header>
      <main>
        <NotificationSystem />
        <NotificationsList />
      </main>
    </div>
  );
};

export default App;
