import { Row } from "@nextui-org/react";
import AddModal from "./AddModal";
import CloseButton from "./buttons/CloseButton";
import EnterPasswordModal from "./EnterPasswordModal";
import LoadingIcon from "./LoadingIcon";

interface Props {
  isLoading: boolean;
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
  addPlayer: (name: string, avatar: File | null) => void;
}

const EditMenu = ({
  isLoading,
  isEditing,
  enableEditing,
  disableEditing,
  addPlayer,
}: Props) => {
  return (
    <Row justify="flex-end">
      {isLoading && <LoadingIcon />}
      {isEditing ? (
        <>
          <AddModal addPlayer={addPlayer} />
          <CloseButton onPress={disableEditing} />
        </>
      ) : (
        <>
          <EnterPasswordModal onSubmitAndCorrect={enableEditing} />
        </>
      )}
    </Row>
  );
};

export default EditMenu;
