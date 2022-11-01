import { MdModeEdit as EditIcon } from "react-icons/md";
import MenuButton from "./MenuButton";

interface Props {
  onPress: () => void;
}

const EditButton = ({ onPress }: Props) => (
  <MenuButton icon={<EditIcon />} onPress={onPress} />
);

export default EditButton;
