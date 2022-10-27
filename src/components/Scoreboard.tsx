import {
  Card,
  Container,
  Grid,
  Loading,
  Row,
  Text,
  User,
} from "@nextui-org/react";
import { Player } from "../App";
import { IconButton } from "./IconButton";
import { MdDelete as DeleteIcon } from "react-icons/md";

interface Props {
  // isLoading: boolean;
  players: Array<Player>;
  inEditMode: boolean;
  setCurrentlyBeingEdited: (value: Player) => void;
  setScoreEditorShown: (value: boolean) => void;
  onDeletePlayer: (id: string) => void;
}

const Scoreboard = ({
  // isLoading,
  players,
  inEditMode,
  setCurrentlyBeingEdited,
  setScoreEditorShown,
  onDeletePlayer,
}: Props) => {
  players.sort(function (a, b) {
    if (a.score > b.score) {
      return -1;
    } else if (a.score < b.score) {
      return 1;
    } else {
      if (a.name < b.name) {
        return -1;
      } else {
        return 1;
      }
    }
  });

  const scoreClickHandler = (player: Player) => () => {
    setCurrentlyBeingEdited(player);
    setScoreEditorShown(true);
    console.log("test");
  };

  const deletePlayerHandler = (player: Player) => () => {
    if (player.id) {
      onDeletePlayer(player.id);
    }
  };

  return (
    <>
      <Container
        css={{
          margin: "10px",
          alignItems: "space-between",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Row
          key="header"
          justify="center"
          align="center"
          css={{ marginBottom: "10px" }}
        >
          <Text h1>Scoreboard</Text>
        </Row>
        {/* {isLoading ? (
          <Loading size="xl" />
        ) : ( */}
        {players.map((player) => (
          <Row
            key={player.name}
            justify="space-between"
            align="center"
            css={{ marginBottom: "10px", marginRight: "25px" }}
          >
            <Grid.Container justify="space-between">
              <Grid>
                <User
                  squared
                  src={
                    player.avatar ? player.avatar : "/default-user-avatar.png"
                  }
                  name={player.name}
                  css={{ p: 0 }}
                />
              </Grid>
              <Grid
                css={{
                  width: "50px",
                  height: "50px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Row
                  justify="space-between"
                  align="center"
                  css={{ w: "75px", marginRight: "30px" }}
                >
                  <div
                    onClick={inEditMode ? scoreClickHandler(player) : void 0}
                  >
                    <Card
                      variant="flat"
                      css={{
                        cursor: inEditMode ? "pointer" : "default",
                        h: "50px",
                        w: "50px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text h5 css={{ m: 0 }}>
                        {player.score}
                      </Text>
                    </Card>
                  </div>
                  {inEditMode ? (
                    <IconButton onClick={deletePlayerHandler(player)}>
                      <DeleteIcon />
                    </IconButton>
                  ) : (
                    <></>
                  )}
                </Row>
              </Grid>
            </Grid.Container>
          </Row>
        ))}
      </Container>
    </>
  );
};

export default Scoreboard;
