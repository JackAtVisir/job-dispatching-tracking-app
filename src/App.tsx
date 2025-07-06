import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';


function App() {

  const { user, signOut } = useAuthenticator();

  const navigate = useNavigate()
  
  return (
    <main>
      <h1>Welcome {user?.signInDetails?.loginId}</h1>
      <button onClick={()=>{navigate('/assets')}}>Assets</button>
      <button onClick={()=>{navigate('/createAssets')}}>Create Assets</button>
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default App;
