import {
  collection,
  deleteDoc,
  DocumentData,
  QueryDocumentSnapshot,
  setDoc,
} from "@firebase/firestore"
import { firestore } from "features/home/firebase-init"
import { doc, getDocs, query } from "firebase/firestore"
import { PokoySession, UserStatsData } from "shared/types"

const INIT_STATS_DATA: UserStatsData = {
  firstMeditationDate: null,
  count: 0,
  totalDuration: 0,
  userId: "",
}

interface UserData {
  email: string
  name: string
  uid: string
  statistics: {
    count: number
    totalDuration: number
    userId?: string
    lastFive?: PokoySession[]
  }
}

// eslint-disable-next-line max-statements, complexity, max-statements
export const migrateUserToStats = async (
  userSnapshot: QueryDocumentSnapshot<DocumentData>,
  index: number
) => {
  const timeout = index * 1000
  console.info("цикл")

  setTimeout(
    // eslint-disable-next-line max-statements
    async () => {
      const userData = userSnapshot.data() as UserData
      const userId = userData.uid

      const userStatsColRef = collection(firestore, "stats")

      const newUserStatsRef = doc(userStatsColRef)
      const newUserStatsData = {
        ...INIT_STATS_DATA,
        userId,
      }

      await setDoc(newUserStatsRef, newUserStatsData)
        .then(() => {
          console.info("success ", index)
        })
        .catch((e) => console.error("⛔️", e))
      await deleteDoc(userSnapshot.ref)
    },
    timeout
  )
}

export const migrateUsersToStats = async () => {
  const usersColRef = collection(firestore, "users")
  const q = query(usersColRef)
  const querySnapshot = await getDocs(q)
  console.info("осталось юзеров", querySnapshot.size)

  const pokoysDocs = querySnapshot.docs
  pokoysDocs.forEach((snapshot, i) => {
    migrateUserToStats(snapshot, i)
  })
}
