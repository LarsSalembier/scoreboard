import { MdAdd as AddIcon } from "react-icons/md";
import MenuButton from "./MenuButton";

interface Props {
  onPress: () => void;
}

const AddButton = ({ onPress }: Props) => (
  <MenuButton icon={<AddIcon />} onPress={onPress} />
);

export default AddButton;
