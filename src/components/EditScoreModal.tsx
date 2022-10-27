import {
  Button,
  FormElement,
  Input,
  Modal,
  Text,
  User,
} from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import { Player } from "../App";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  player: Player;
  onSave: (id: string, newScore: number) => void;
}

const EditScoreModal = ({ isVisible, onClose, player, onSave }: Props) => {
  const [score, setScore] = useState(player.score);

  const closeHandler = () => {
    setScore(player.score);
    onClose();
  };

  const onChangeScore = (e: ChangeEvent<FormElement>) => {
    setScore(+e.target.value);
  };

  const updateScore = () => {
    if (player.id) {
      onSave(player.id, score);
    }
    onClose();
  };

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={isVisible}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Edit player score.
        </Text>
      </Modal.Header>
      <Modal.Body>
        <User
          src={player.avatar}
          name={<Text>{player.name}</Text>}
          bordered
          squared
          size="xl"
        />
        <Input
          type="number"
          defaultValue={player.score}
          label="New score"
          onChange={onChangeScore}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={closeHandler}>
          Close
        </Button>
        <Button auto onPress={updateScore}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditScoreModal;
