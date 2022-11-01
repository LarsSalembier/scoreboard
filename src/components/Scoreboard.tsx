import { Card, Row, Text, User } from "@nextui-org/react";
import { IconButton } from "./buttons/IconButton";
import { MdDelete as DeleteIcon } from "react-icons/md";
import { Player } from "../interfaces/Player";
import { DEFAULT_AVATAR_IMAGE } from "../App";
import EditModal from "./EditModal";

const sortFunction = (a: Player, b: Player) => {
  if (a.data.score > b.data.score) {
    return -1;
  } else if (a.data.score < b.data.score) {
    return 1;
  } else {
    if (a.data.name < b.data.name) {
      return -1;
    } else {
      return 1;
    }
  }
};

interface Props {
  players: Array<Player>;
  inEditMode: boolean;
  setCurrentlyBeingEdited: (value: Player) => void;
  setScoreEditorShown: (value: boolean) => void;
  onDeletePlayer: (id: string) => void;
  onUpdateScore: (id: string, newScore: number) => void;
}

const Scoreboard = ({
  players,
  inEditMode,
  setCurrentlyBeingEdited,
  setScoreEditorShown,
  onDeletePlayer,
  onUpdateScore,
}: Props) => {
  players.sort(sortFunction);

  const scoreClickHandler = (player: Player) => () => {
    setCurrentlyBeingEdited(player);
    setScoreEditorShown(true);
  };

  const deletePlayerHandler = (id: string) => () => {
    onDeletePlayer(id);
  };

  const updateScoreHandler = (id: string) => (newScore: number) => {
    onUpdateScore(id, newScore);
  };

  return (
    <>
      <div
        style={{
          width: "400px",
        }}
      >
        <Text css={{ textAlign: "center", marginBottom: "20px" }} h1>
          Scoreboard
        </Text>

        {players.length == 0 ? (
          <Text css={{ textAlign: "center" }}>
            The scoreboard is currently empty. Add some players!
          </Text>
        ) : (
          players.map((player, index) => (
            <Row key={player.id} align="center" css={{ marginBottom: "10px" }}>
              <Row justify="flex-start" align="center">
                <Text
                  css={{ margin: 0, textAlign: "center", width: "48px" }}
                  h3
                >
                  {index + 1}
                </Text>
                <User
                  size="lg"
                  squared
                  src={
                    player.data.avatar
                      ? player.data.avatar
                      : DEFAULT_AVATAR_IMAGE
                  }
                  name={player.data.name}
                  css={{ p: 0 }}
                />
              </Row>

              <Row justify="flex-end" align="center">
                <EditModal
                  player={player}
                  updateScore={updateScoreHandler(player.id)}
                  inEditMode={inEditMode}
                />
                <div style={{ width: "48px" }}>
                  {inEditMode && (
                    <IconButton
                      onClick={deletePlayerHandler(player.id)}
                      css={{
                        width: "40px",
                      }}
                    >
                      <DeleteIcon size="20px" />
                    </IconButton>
                  )}
                </div>
              </Row>
            </Row>
          ))
        )}
      </div>
    </>
  );
};

export default Scoreboard;
