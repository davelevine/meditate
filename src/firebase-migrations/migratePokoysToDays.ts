import {
  collection,
  deleteDoc,
  DocumentData,
  QueryDocumentSnapshot,
  setDoc,
} from "@firebase/firestore"
import { firestore } from "features/home/firebase-init"
import {
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore"
import {
  PokoySession,
  DayData,
  ServerDayData,
  PseudoDayData,
} from "shared/types"

// eslint-disable
const timestamp = Timestamp.fromDate(new Date(new Date().toDateString()))
const INIT_DAY_DATA: PseudoDayData = {
  // NOTE: hardcode!
  timestamp,
  count: 0,
  totalDuration: 0,
  meditations: [],
  userId: "",
}

// eslint-disable-next-line max-statements, complexity, max-statements
export const migratePokoyToDay = async (
  pokoySnapshot: QueryDocumentSnapshot<DocumentData>,
  index: number
) => {
  const timeout = index * 1000

  setTimeout(
    // eslint-disable-next-line max-statements
    async () => {
      const pokoyData = pokoySnapshot.data() as PokoySession

      const userId: string =
        typeof pokoyData.user === "string"
          ? (pokoyData.user as string).replace("users/", "")
          : pokoyData.user?.id || "user-id-not-found" // NOTE: check and replace hardcode

      const daysColRef = collection(firestore, "days")
      const dayDateString = new Date(pokoyData.timestamp).toDateString()
      const dayTimestamp = Timestamp.fromDate(new Date(dayDateString))
      const daysQuery = query(
        daysColRef,
        // NOTE: this filter is working
        where("userId", "==", userId),
        // NOTE: this filter is working
        where("timestamp", "==", dayTimestamp)
      )
      const daysQuerySnapshot = await getDocs(daysQuery)

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      if (daysQuerySnapshot.docs.length > 0) {
        console.info("write day to EXISTED document")
        const dayDocRef = daysQuerySnapshot.docs[0].ref
        const daySnapshot = await getDoc(dayDocRef)
        const dayData = daySnapshot.data()

        const newDayData: PseudoDayData = {
          timestamp: dayTimestamp,
          count: dayData?.count + 1,
          totalDuration: dayData?.totalDuration + pokoyData.duration,
          meditations: [...dayData?.meditations, pokoyData],
          userId,
        }

        await setDoc(dayDocRef, newDayData)
          .then((res) => {
            console.info("success ", index)
          })
          .catch((e) => console.error("⛔️", e))
        await deleteDoc(pokoySnapshot.ref)

        // NOTE: WRITE NEW DAY
      } else if (daysQuerySnapshot.docs.length === 0) {
        console.info("write day to NEW document")
        const newDayRef = doc(daysColRef)
        const dayData = INIT_DAY_DATA

        const newDayData: PseudoDayData = {
          timestamp: dayTimestamp,
          count: dayData.count + 1,
          totalDuration: dayData.totalDuration + pokoyData.duration,
          meditations: [...dayData.meditations, pokoyData],
          userId,
        }

        await setDoc(newDayRef, newDayData)
          .then(() => {
            console.info("success ", index)
          })
          .catch((e) => console.error("⛔️", e))
        await deleteDoc(pokoySnapshot.ref)
      }
    },
    timeout
  )

  // TODO: add deleteing of pokoys when test function;
  // await deleteDoc(pokoySnapshot.ref);
}

export const migratePokoysToDays = async () => {
  const pokoysColRef = collection(firestore, "pokoys")
  const q = query(pokoysColRef, orderBy("timestamp", "desc"))
  const querySnapshot = await getDocs(q)
  console.info("осталось Покоев", querySnapshot.size)

  const pokoysDocs = querySnapshot.docs.slice(0, 100)
  pokoysDocs.forEach((snapshot, i) => {
    migratePokoyToDay(snapshot, i)
  })
}
