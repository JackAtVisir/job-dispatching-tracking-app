import { useEffect } from "react"
import { useAuthenticator } from "@aws-amplify/ui-react"
import { generateClient } from "aws-amplify/data"
import type { Schema } from "../amplify/data/resource"
import { useSetAtom } from "jotai"
import { userRoleAtom } from "./atoms/userAtoms"

function UserInit() {

  const client = generateClient<Schema>()

  const { user } = useAuthenticator()
  const setUserRole = useSetAtom(userRoleAtom)

  useEffect(() => {
    const syncUser = async () => {
      if (!user) return

      const userId = user.userId
      const username = user.signInDetails?.loginId ?? "Unnamed"
      const email = user.signInDetails?.loginId ?? "no-email"

      try {
        const existing = await client.models.Users.get({ id: userId })
      
        let userRecord = existing.data
      
        if (!userRecord) {
          const newUser = await client.models.Users.create({
            id: userId,
            username,
            email,
            role: "",
          })
          userRecord = newUser.data
          console.log("User created in database")
        } else {
          console.log("User already exists")
        }
      
        setUserRole(userRecord?.role ?? "")
      
      } catch (error) {
        console.error("Error syncing user:", error)
      }

    }

    syncUser()
    
  }, [user])

  return null
}


export default UserInit