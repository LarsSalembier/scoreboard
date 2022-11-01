import { getFirestore } from "@firebase/firestore";
import app from "./firebase-config";
const firestoreDB = getFirestore(app);

import {
  collection,
  getDocs,
  CollectionReference,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  DocumentReference,
  getDoc,
} from "@firebase/firestore";
import { PlayerData } from "../interfaces/Player";

export const COLLECTION_NAME = "players";

const playersCollectionRef = collection(
  firestoreDB,
  COLLECTION_NAME
) as CollectionReference<PlayerData>;

export const getPlayers = async () => {
  const data = await getDocs(playersCollectionRef);

  return data.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
};

export const addPlayer = async (data: PlayerData) => {
  const ref = await addDoc(playersCollectionRef, {
    name: data.name,
    avatar: data.avatar,
    score: data.score,
  });
  return ref.id;
};

const getPlayerDocRef = (id: string) => {
  return doc(firestoreDB, COLLECTION_NAME, id) as DocumentReference<PlayerData>;
};

export const updateAvatarUrl = async (
  id: string,
  newAvatarUrl: string | null
) => {
  await updateDoc(getPlayerDocRef(id), { avatar: newAvatarUrl });
};

export const updateScore = async (id: string, newScore: number) => {
  await updateDoc(getPlayerDocRef(id), { score: newScore });
};

export const deletePlayer = async (id: string) => {
  await deleteDoc(getPlayerDocRef(id));
};

export const getPlayer = async (id: string) => {
  return (await getDoc(getPlayerDocRef(id))).data();
};
