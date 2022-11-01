import {
  Button,
  FormElement,
  Input,
  Modal,
  Row,
  Text,
} from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import EditButton from "./buttons/EditButton";
import PasswordIcon from "./PasswordIcon";

interface Props {
  onSubmitAndCorrect: () => void;
}
const EnterPasswordModal = ({ onSubmitAndCorrect }: Props) => {
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("");
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  const handleChange = (e: ChangeEvent<FormElement>) => {
    setPassword(e.target.value);
  };

  const submitHandler = () => {
    if (password == import.meta.env.VITE_ADMIN_PASSWORD) {
      onSubmitAndCorrect();
    }
  };

  return (
    <div>
      <EditButton onPress={handler} />
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Enter password to start editing.
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            type="password"
            placeholder="Password"
            contentLeft={<PasswordIcon fill="currentColor" />}
            onChange={handleChange}
          />
          <Row justify="space-between">
            <Text size={14}>Forgot password? Contact the developer.</Text>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto onPress={submitHandler}>
            Start editing
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EnterPasswordModal;
