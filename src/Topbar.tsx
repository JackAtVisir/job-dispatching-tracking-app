import { useAuthenticator } from '@aws-amplify/ui-react'

function Topbar() {
  const { user, signOut } = useAuthenticator()

  return (
    
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      borderBottom: '1px solid #ccc',
      backgroundColor: '#f5f5f5',
      height: '60px',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
    }}>
      <h2>Work App</h2>
      <h1>Welcome {user?.signInDetails?.loginId}</h1>
      <button onClick={signOut}>Sign out</button>
    </header>
  )
}

export default Topbar