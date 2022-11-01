import { Card, Modal, useModal } from "@nextui-org/react";
import Scoreboard from "./components/Scoreboard";
import { useEffect, useState } from "react";
import {
  getPlayers as getPlayersFromDB,
  addPlayer as addPlayerToDB,
  updateAvatarUrl as updateAvatarUrlOnDB,
  deletePlayer as removePlayerFromDB,
  updateScore as updateScoreInDB,
} from "./api/firestore";
import { Player } from "./interfaces/Player";
import EditMenu from "./components/EditMenu";
import { removeAvatar, uploadAvatarAndGetUrl } from "./api/storage";

export const DEFAULT_AVATAR_IMAGE = "default-user-avatar.webp";

function App() {
  const playersInit: Array<Player> = [];
  const [players, setPlayers] = useState(playersInit);
  const [isEditing, setIsEditing] = useState(false);
  const [loadingIconIsVisible, setLoadingIconIsVisible] = useState(false);
  const [currentlyBeingEdited, setCurrentlyBeingEdited] = useState(
    null as Player | null
  );

  const editModalHook = useModal();

  useEffect(() => {
    reloadPlayerList();
  }, []);

  const reloadPlayerList = async () => {
    setLoadingIconIsVisible(true);
    setPlayers(await getPlayersFromDB());
    setLoadingIconIsVisible(false);
  };

  const addPlayer = async (name: string, avatar: File | null) => {
    setLoadingIconIsVisible(true);
    const id = await addPlayerToDB({ name: name, avatar: null, score: 0 });
    if (avatar != null) {
      const avatarUrl = (await uploadAvatarAndGetUrl(avatar, id)) ?? null;
      await updateAvatarUrlOnDB(id, avatarUrl);
    }
    setPlayers(await getPlayersFromDB());
    setLoadingIconIsVisible(false);
  };

  const deletePlayer = async (id: string) => {
    setLoadingIconIsVisible(true);
    removeAvatar(id);
    await removePlayerFromDB(id);
    setPlayers(await getPlayersFromDB());

    setLoadingIconIsVisible(false);
  };

  const updateScore = async (id: string, newScore: number) => {
    if (isEditing) {
      setLoadingIconIsVisible(true);
      await updateScoreInDB(id, newScore);
      setPlayers(await getPlayersFromDB());
      setLoadingIconIsVisible(false);
    }
  };

  const enableEditing = () => {
    setIsEditing(true);
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  return (
    <Card css={{ padding: "10px" }}>
      <Scoreboard
        players={players}
        inEditMode={isEditing}
        setCurrentlyBeingEdited={setCurrentlyBeingEdited}
        setScoreEditorShown={() => editModalHook.setVisible(true)}
        onDeletePlayer={deletePlayer}
        onUpdateScore={updateScore}
      />
      <div style={{ marginTop: "10px" }}>
        <EditMenu
          isLoading={loadingIconIsVisible}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
          addPlayer={addPlayer}
        />
      </div>
    </Card>
  );
}

export default App;
