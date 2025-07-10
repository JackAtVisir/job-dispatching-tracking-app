import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai'
import { userRoleAtom } from './atoms/userAtoms' 



function App() {

  const { user, signOut } = useAuthenticator();
  const [userRole] = useAtom(userRoleAtom)
  const navigate = useNavigate()
  
  
  return (

    <main>
      <h1>Welcome {user?.signInDetails?.loginId}</h1>
  
      {userRole === 'admin' && (
        <div>
          <button onClick={() => navigate('/createAssets')}>Create Assets</button>
          <button onClick={() => navigate('/assets')}>Assets</button>
        </div>
      )}
      <button onClick={() => navigate('/jobs')}>Jobs</button>
      <button onClick={() => navigate('/completedJobs')}>Completed Jobs</button>
      <button onClick={() => navigate('/userRoles')}>User Roles</button>
      <button onClick={signOut}>Sign out</button>
    </main>
  )
}

export default App;
