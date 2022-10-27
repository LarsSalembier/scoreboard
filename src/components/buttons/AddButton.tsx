import { Button } from "@nextui-org/react";
import { MdAdd as AddIcon } from "react-icons/md";

interface Props {
  isVisible: boolean;
  onPress: () => void;
}

const AddButton = ({ isVisible, onPress }: Props) => (
  <Button
    auto
    icon={<AddIcon />}
    style={{
      margin: "10px",
    }}
    css={isVisible ? {} : { display: "none" }}
    onPress={onPress}
  ></Button>
);

export default AddButton;
