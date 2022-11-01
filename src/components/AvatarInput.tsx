import { Button } from "@nextui-org/react";
import { useRef } from "react";

interface Props {
  avatarHasBeenChosen: boolean;
  onAvatarInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const AvatarInput = ({ avatarHasBeenChosen, onAvatarInputChange }: Props) => {
  const fileInput = useRef<HTMLInputElement | null>(null);
  const openFileDialog = () => {
    fileInput.current && fileInput.current.click();
  };

  return (
    <>
      <Button onPress={openFileDialog}>
        {avatarHasBeenChosen ? "Change picture" : "Add a picture (optional)"}
      </Button>
      <input
        type="file"
        id="file"
        ref={fileInput}
        style={{ display: "none" }}
        onChange={onAvatarInputChange}
      />
    </>
  );
};

export default AvatarInput;
