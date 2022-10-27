import { Card, Container, Loading, Row, Text } from "@nextui-org/react";
import Scoreboard from "./components/Scoreboard";
import { useEffect, useState } from "react";
import NewPlayerModal from "./components/NewPlayerModal";
import EditButton from "./components/buttons/EditButton";
import AddButton from "./components/buttons/AddButton";
import db from "./api/firebase-config";
import {
  collection,
  getDocs,
  CollectionReference,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "@firebase/firestore";
import EditScoreModal from "./components/EditScoreModal";

const COLLECTION_NAME = "players";

export interface Player {
  id?: string;
  name: string;
  avatar: string;
  score: number;
}

const dummyPlayer: Player = {
  id: "1",
  name: "DUMMY",
  avatar: "",
  score: 10,
};

function App() {
  const playersInit: Array<Player> = [];
  const [players, setPlayers] = useState(playersInit);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scoreEditorShown, setScoreEditorShown] = useState(false);
  const [currentlyBeingEdited, setCurrentlyBeingEdited] = useState(dummyPlayer);

  const playersCollectionRef = collection(
    db,
    "players"
  ) as CollectionReference<Player>;

  const getUsersWithLoading = async () => {
    setIsLoading(true);
    await getUsers();
    setIsLoading(false);
  };

  const getUsers = async () => {
    const data = await getDocs(playersCollectionRef);

    setPlayers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getUsersWithLoading();
  }, []);

  const switchEditMode = () => {
    setIsEditing(!isEditing);
  };

  const openAddModal = () => {
    setIsAddingUser(true);
  };

  const addPlayer = async (name: string, avatar: string) => {
    setIsLoading(true);
    await addDoc(playersCollectionRef, {
      name: name,
      avatar: avatar,
      score: 0,
    });
    getUsers();
    setIsLoading(false);
  };

  const changeScoreOfPlayer = async (id: string, newScore: number) => {
    const playerDoc = doc(db, "players", id);
    await updateDoc(playerDoc, { score: newScore });
    getUsers();
  };

  const deletePlayer = async (id?: string) => {
    if (id) {
      setIsLoading(true);
      const playerDoc = doc(db, "players", id);
      await deleteDoc(playerDoc);
      getUsers();
      setIsLoading(false);
    }
  };

  return (
    <Container
      css={{ maxWidth: "400px" }}
      className="App"
      justify="center"
      alignItems="center"
    >
      <Card>
        <Scoreboard
          // isLoading={isLoading}
          players={players}
          inEditMode={isEditing}
          setCurrentlyBeingEdited={setCurrentlyBeingEdited}
          setScoreEditorShown={setScoreEditorShown}
          onDeletePlayer={deletePlayer}
        />
        <Row justify="flex-end">
          {isEditing ? (
            <>
              <Text css={{ alignSelf: "center" }}>Edit mode enabled.</Text>
              <AddButton isVisible={isEditing} onPress={openAddModal} />
            </>
          ) : (
            <></>
          )}
          <EditButton isEditing={isEditing} onPress={switchEditMode} />
        </Row>

        <NewPlayerModal
          isVisible={isAddingUser}
          onClose={() => setIsAddingUser(false)}
          onAddPlayer={addPlayer}
          currentPlayers={players}
        />
        <EditScoreModal
          isVisible={scoreEditorShown}
          onClose={() => setScoreEditorShown(false)}
          onSave={changeScoreOfPlayer}
          player={currentlyBeingEdited}
        />
      </Card>
      {isLoading ? <Loading size="lg" css={{ margin: "20px" }} /> : <></>}
    </Container>
  );
}

export default App;
