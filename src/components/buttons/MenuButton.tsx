import { Button, NormalColors } from "@nextui-org/react";

interface Props {
  onPress: () => void;
  icon: React.ReactNode;
  color?: NormalColors;
}

const MenuButton = ({ onPress, icon, color }: Props) => {
  return (
    <Button
      auto
      color={color}
      icon={icon}
      style={{
        margin: "10px",
      }}
      onPress={onPress}
    />
  );
};

export default MenuButton;
