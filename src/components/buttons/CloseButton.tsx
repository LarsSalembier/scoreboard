import { MdClose as CloseIcon } from "react-icons/md";
import MenuButton from "./MenuButton";

interface Props {
  onPress: () => void;
}

const CloseButton = ({ onPress }: Props) => (
  <MenuButton color="error" icon={<CloseIcon />} onPress={onPress} />
);

export default CloseButton;
