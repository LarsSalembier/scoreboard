import { Button } from "@nextui-org/react";
import { MdClose as CloseIcon, MdModeEdit as EditIcon } from "react-icons/md";

interface Props {
  isEditing: boolean;
  onPress: () => void;
}

const EditButton = ({ isEditing, onPress }: Props) => (
  <Button
    auto
    color={isEditing ? "error" : "primary"}
    icon={isEditing ? <CloseIcon /> : <EditIcon />}
    style={{
      margin: "10px",
    }}
    onPress={onPress}
  ></Button>
);

export default EditButton;
