import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useState, useEffect } from "react";
import { useSetAtom } from "jotai"
import { userRoleAtom } from "./atoms/userAtoms"
import { useAuthenticator } from "@aws-amplify/ui-react"

function Users () {

  const client = generateClient<Schema>()
    
    const [users, setUsers] = useState<Array<Schema["Users"]["type"]>>([]);
    const setUserRole = useSetAtom(userRoleAtom)

    useEffect(() => {
      client.models.Users.observeQuery().subscribe({
        next: (data) => setUsers([...data.items]),
      });
    }, []);

    const { user } = useAuthenticator()

    const handleSelectUser = ( id: string) => {
    
      const selectedUser = users.find((user)=>(user.id === id))
      const currentRole = selectedUser?.role

      if (currentRole === 'admin') {
        client.models.Users.update({
            id: id,
            role: ''
        })
        if (user.userId === id) {setUserRole('')}
      } else {
        client.models.Users.update({
            id: id,
            role: 'admin'
        })
        if (user.userId === id) {setUserRole('admin')}
      }
    }

    return (

        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user)=>(
                    <li
                      key={user.id}
                      onClick={()=>{handleSelectUser(user.id)}}>
                      {`${user.username ?? ''}    ${user.role ?? ''}`}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Users