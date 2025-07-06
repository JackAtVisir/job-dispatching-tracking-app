import { useEffect } from "react"
import { useAuthenticator } from "@aws-amplify/ui-react"
import { generateClient } from "aws-amplify/data"
import type { Schema } from "../amplify/data/resource"

const client = generateClient<Schema>()

function UserInit() {

  const { user } = useAuthenticator()

  useEffect(() => {
    const syncUser = async () => {
      if (!user) return

      const userId = user.userId
      const username = user.signInDetails?.loginId ?? "Unnamed"
      const email = user.signInDetails?.loginId ?? "no-email"

      try {
        const existing = await client.models.Users.get({ id: userId })
        if (!existing.data) {
          await client.models.Users.create({
            id: userId,
            username,
            email,
          });
          console.log("User created in database")
        } else {
          console.log("User already exists")
        }
      } catch (error) {
        console.error("Error syncing user:", error)
      }
    }

    syncUser()
  }, [user])

  return null
}


export default UserInit