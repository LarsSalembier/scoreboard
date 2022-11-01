import {
  Button,
  FormElement,
  Input,
  Modal,
  Text,
  useModal,
  User,
} from "@nextui-org/react";
import { ChangeEvent, useEffect, useState } from "react";
import { DEFAULT_AVATAR_IMAGE } from "../App";
import AvatarInput from "./AvatarInput";
import AddButton from "./buttons/AddButton";

interface Props {
  addPlayer: (name: string, avatar: File | null) => void;
}

const AddModal = ({ addPlayer }: Props) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null as File | null);
  const [avatarPreview, setAvatarPreview] = useState(null as string | null);
  const { setVisible, bindings } = useModal();

  const changeAvatarHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    event.preventDefault();
    if (event.target.files != null && event.target.files[0]) {
      setAvatar(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (avatar) {
      // create the preview
      const objectUrl = URL.createObjectURL(avatar);
      setAvatarPreview(objectUrl);

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [avatar]);

  const closeModalHandler = () => {
    setVisible(false);
  };

  const openModalHandler = () => {
    setVisible(true);
  };

  const onChangeName = (e: ChangeEvent<FormElement>) => {
    setName(e.target.value);
  };

  const addPlayerHandler = () => {
    if (name != "") {
      addPlayer(name, avatar);
      setName("");
      setAvatar(null);
      setVisible(false);
    }
  };

  return (
    <>
      <AddButton onPress={openModalHandler} />
      <Modal
        closeButton
        aria-labelledby="Add new player"
        aria-describedby="This menu allows to add a new player."
        {...bindings}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Add new player
          </Text>
        </Modal.Header>
        <Modal.Body>
          <User
            src={avatarPreview ?? DEFAULT_AVATAR_IMAGE}
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

          <AvatarInput
            avatarHasBeenChosen={avatarPreview != null}
            onAvatarInputChange={changeAvatarHandler}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button flat auto color="error" onPress={closeModalHandler}>
            Close
          </Button>
          <Button auto onPress={addPlayerHandler}>
            Add player
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddModal;
