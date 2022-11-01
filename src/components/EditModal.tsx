import {
  Button,
  Card,
  FormElement,
  Input,
  Modal,
  Text,
  useModal,
  User,
} from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import { Player } from "../interfaces/Player";

const DEFAULT_AVATAR_URL = "./default-user-avatar.png";

interface Props {
  player: Player;
  updateScore: (newScore: number) => void;
  inEditMode: boolean;
}

const EditModal = ({ player, updateScore, inEditMode }: Props) => {
  const { setVisible, bindings } = useModal();
  const openModal = () => {
    if (inEditMode) {
      setVisible(true);
    }
  };

  const closeModal = () => {
    setVisible(false);
  };

  const [score, setScore] = useState(player.data.score);
  const onChangeScore = (e: ChangeEvent<FormElement>) => {
    setScore(+e.target.value);
  };

  const updateScoreHandler = () => {
    if (inEditMode) {
      updateScore(score);
      setVisible(false);
      setScore(score);
    }
  };

  return (
    <>
      <div onClick={openModal}>
        <Card
          variant="flat"
          css={{
            cursor: inEditMode ? "pointer" : "default",
            h: "48px",
            w: "48px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text h5 css={{ m: 0 }}>
            {player.data.score}
          </Text>
        </Card>
      </div>

      <Modal
        closeButton
        aria-labelledby="Edit Player"
        aria-describedby="This modal allows you to edit a player's score, name and avatar."
        {...bindings}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Edit player score
          </Text>
        </Modal.Header>
        <Modal.Body>
          <User
            src={player.data.avatar ?? DEFAULT_AVATAR_URL}
            name={<Text>{player.data.name}</Text>}
            bordered
            squared
            size="xl"
          />
          <Input
            type="number"
            value={score}
            label="New score"
            onChange={onChangeScore}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button flat auto color="error" onPress={closeModal}>
            Close
          </Button>
          <Button auto onPress={updateScoreHandler}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditModal;
