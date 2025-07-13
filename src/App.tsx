import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

function App() {

  return (

    <div style={{ 
      display: 'flex', 
      height: '100vh' 
    }}>
      <Topbar />
      <Sidebar />
      <main style={{ 
        padding: '1rem', 
        paddingTop: '50px', 
        flex: 1 
      }}>
        <Outlet />
      </main>
    </div>
  )
}


export default App;
