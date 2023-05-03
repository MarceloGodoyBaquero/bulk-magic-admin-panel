import {Text, Spacer, Input, Modal, Button, Loading} from "@nextui-org/react";
import {createAdmin} from "@/utils/accessServices";
import {useState} from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/high-res.css";
import {toast} from "react-hot-toast";
export default function CreateAdminModal() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleFormSubmit = () => {
    setLoading(true);
    createAdmin(form)
      .then((res) => {
        setVisible(false);
        toast.success("Admin Created Successfully");
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
        return toast.error(e.response.data.message)
      });
  };

  const handleFormChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const closeHandler = () => {
    setVisible(false);
  };

  const handler = () => setVisible(true);
  const handlePhoneNumberChange = (value: string, country: any) => {
    const index = country.dialCode.length;
    setForm({
      ...form,
      phone: `+${value.slice(0, index)}-${value.slice(index)}`
    });
  };

  return (
    <>
      <Button auto onPress={handler} color="success">
        Create Admin
      </Button>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}>
        <Modal.Header>
          <Text h2>Lets Create an Admin</Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            bordered
            name={"username"}
            onChange={(e) => handleFormChange(e)}
            fullWidth
            clearable
            label={"Name"}/>
          <Text>
            Phone Number
          </Text>
          <PhoneInput
            inputStyle={{
              border: "2px solid #d9d9d9",
              borderRadius: "15px",
              width: "100%",
              background: "white",
              fontWeight: "400",
              height: "45px",
              fontSize: "14px",
            }}
            buttonStyle={{
              border: "2px solid #d9d9d9",
              borderRadius: "15px 0 0 15px",
            }}
            country="us"
            inputProps={{
              name: "phone",
              required: true,
              autoFocus: true
            }}
            autoFormat={false}
            value={form.phone}
            onChange={handlePhoneNumberChange}
          />
          <Input
            bordered
            name={"email"}
            onChange={(e) => handleFormChange(e)}
            fullWidth
            clearable
            label={"Email"}/>
          <Input.Password
            bordered
            name={"password"}
            onChange={(e) => handleFormChange(e)}
            fullWidth
            clearable
            label={"Password"}/>
          <Spacer y={2}/>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button disabled={!!loading} auto onPress={handleFormSubmit}>
            {!loading ? "Create" : <Loading type="points" color="currentColor" size="sm"/>}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
