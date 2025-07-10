import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

const client = generateClient<Schema>();

function UserRole () {
    
    const navigate = useNavigate()
    const [users, setUsers] = useState<Array<Schema["Users"]["type"]>>([]);

    useEffect(() => {
      client.models.Users.observeQuery().subscribe({
        next: (data) => setUsers([...data.items]),
      });
    }, []);

    const handleSelectUser = ( id: string) => {
    
      const currentUser = users.find((user)=>(user.id === id))
      const currentRole = currentUser?.role

      if (currentRole === 'admin') {
        client.models.Users.update({
            id: id,
            role: ''
        })
      } else {
        client.models.Users.update({
            id: id,
            role: 'admin'
        })
      }
    }

    return (

        <div>
            <h1>Select User Roles</h1>
            <ul>
                {users.map((user)=>(
                    <li
                      key={user.id}
                      onClick={()=>{handleSelectUser(user.id)}}>
                      {`${user.username ?? ''}    ${user.role ?? ''}`}
                    </li>
                ))}
            </ul>
            <button onClick={()=>{navigate('/')}}>Home</button>
        </div>
    )
}

export default UserRole