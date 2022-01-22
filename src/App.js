import { useState, useEffect } from 'react';
import { auth } from './services/firebase';
import './App.css';

// Import Components
import Header from './components/Header';
import Main from './components/Main';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => setUser(user));
  }, []);
  // In the above code, user is either null or a user with their details 

  return (
    <div className="App">
      <Header user={user} />
      <Main user={user} />
    </div>
  );
}

export default App;
