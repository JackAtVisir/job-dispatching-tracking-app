import {useNavigate} from 'react-router-dom'
import { useAtom } from 'jotai'
import { userRoleAtom } from './atoms/userAtoms' 

function Sidebar() {

  const [userRole] = useAtom(userRoleAtom);
  const navigate = useNavigate();

  return (
    <aside style={{
      width: '200px',
      padding: '1rem',
      borderRight: '1px solid #ccc',
      height: 'calc(100vh - 60px)',
      position: 'sticky',
      top: '60px'
    }}>
      <nav>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '0.5rem' 
        }}>
          {userRole === 'admin' ? (
            <>
              <button onClick={() => navigate('/createAssets')}>Create Assets</button>
              <button onClick={() => navigate('/assets')}>Assets</button>
              <button onClick={() => navigate('/allJobs')}>Jobs</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/jobs')}>Jobs</button>
              <button onClick={() => navigate('/completedJobs')}>Completed Jobs</button>
            </>
          )}
          <button onClick={() => navigate('/userRoles')}>User Roles</button>
        </div>
      </nav>
    </aside>
  )
}


export default Sidebar