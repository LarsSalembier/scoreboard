import {
  Button,
  FormElement,
  Input,
  Modal,
  Text,
  User,
} from "@nextui-org/react";
import { ChangeEvent, useRef, useState } from "react";
import { Player } from "../App";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onAddPlayer: (name: string, image: string) => void;
  currentPlayers: Array<Player>;
}

const DEFAULT_USER_AVATAR = "/default-user-avatar.png";

const NewPlayerModal = ({
  isVisible,
  onClose,
  onAddPlayer,
  currentPlayers,
}: Props) => {
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState(DEFAULT_USER_AVATAR);

  const closeHandler = () => {
    setName("");
    setProfilePic(DEFAULT_USER_AVATAR);
    onClose();
  };

  const inputFile = useRef<HTMLInputElement | null>(null);

  const onButtonClick = () => {
    inputFile.current && inputFile.current.click();
  };

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    event.preventDefault();
    if (event.target.files != null) {
      const url = URL.createObjectURL(event.target.files[0]);
      setProfilePic(url);
    }
  };

  const onChangeName = (e: ChangeEvent<FormElement>) => {
    setName(e.target.value);
  };

  const checkNameAvailability = (name: string) => {
    if (name == "") {
      return false;
    }
    for (const currentPlayer of currentPlayers) {
      if (currentPlayer.name == name) {
        return false;
      }
    }
    return true;
  };

  const addPlayerHandler = () => {
    if (checkNameAvailability(name)) {
      onAddPlayer(name, profilePic);
      closeHandler();
    }
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
          Add new player
        </Text>
      </Modal.Header>
      <Modal.Body>
        <User
          src={profilePic}
          name={
            <Input
              aria-label="Name"
              clearable
              fullWidth
              size="lg"
              placeholder="Name"
              onChange={onChangeName}
            />
          }
          bordered
          squared
          size="xl"
        />

        <Button color="primary" onPress={onButtonClick}>
          {profilePic == DEFAULT_USER_AVATAR
            ? "Add a picture (optional)"
            : "Change picture"}
        </Button>
        <input
          type="file"
          id="file"
          ref={inputFile}
          style={{ display: "none" }}
          onChange={onChangeFile}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={closeHandler}>
          Close
        </Button>
        <Button auto onPress={addPlayerHandler}>
          Add player
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewPlayerModal;
