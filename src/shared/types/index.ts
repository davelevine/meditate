import { DocumentData, DocumentReference, Timestamp } from "firebase/firestore"
export * from "./chart.types"

export interface Coords {
  x: number
  y: number
}

export interface StatsData {
  [date: string]: number[]
}

export interface PokoySession {
  duration: number
  timestamp: DateString
  user?: string | DocumentReference<DocumentData>
  userId: string
}

export type FirestoreRefPath = Flavor<string, "FirestoreRefPath">

export interface DayData {
  timestamp: Milliseconds
  totalDuration: number
  count: number
  meditations: PokoySession[]
  userId: string
  statsRef?: FirestoreRefPath
}

export interface ServerDayData {
  timestamp: Timestamp
  totalDuration: number
  count: number
  meditations: PokoySession[]
  userId: string
  statsRef: DocumentReference<DocumentData>
}

export interface MockDayData {
  timestamp: Milliseconds
  totalDuration: number
}

interface Flavoring<FlavorT> {
  _type?: FlavorT
}
export type Flavor<T, FlavorT> = T & Flavoring<FlavorT>

export type Milliseconds = Flavor<number, "Miliseconds">

export type DateString = Flavor<string, "DateString">

export interface UserStatsData {
  firstMeditationDate: Milliseconds | null
  totalDuration: number
  count: number
  userId: string
}

export interface ServerUserStatsData {
  firstMeditationDate: Timestamp | null
  totalDuration: number
  count: number
  userId: string
}

export enum RequestStatus {
  NONE,
  REQUEST,
  SUCCESS,
  FAILURE,
}

export interface PseudoDayData {
  timestamp: Timestamp
  totalDuration: number
  count: number
  meditations: PokoySession[]
  userId: string
}
