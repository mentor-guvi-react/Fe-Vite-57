import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, TextField } from "@mui/material";
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";

const defaultformState = {
  username: "",
  password: "",
  phonenumber: "",
  email: "",
  address: "",
};

const RegistrationModal = ({ handleClose, open, modalType }) => {
  const [formState, setFormState] = React.useState(defaultformState);

  const [snackBarState, setSnackBarState] = React.useState({
    message: "",
    type: "",
  });

  const handleValidation = () => {
    const { address, password, email, username, phonenumber } = formState;

    if (
      address.length &&
      password.length &&
      email.length &&
      username.length &&
      phonenumber.length
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (modalType === "login") {
      if (formState.username.length && formState.password.length) {
        const response = await axios.get(
          `https://fe-node-57.onrender.com/login?username=${formState.username}&password=${formState.password}`
        );

        if (response.data !== "error") {
          localStorage.setItem("username", response.data);
          setSnackBarState({
            message: "Login Success",
            type: "success",
          });
          handleClose();
        } else {
          setSnackBarState({
            message: "Login Failed",
            type: "error",
          });
        }
      }
    } else {
      if (handleValidation()) {
        const response = await axios.post(
          "https://fe-node-57.onrender.com/registration",
          {
            ...formState,
          }
        );

        if (response.data !== "error") {
          localStorage.setItem("username", response.data.username);
          handleClose();
        }
      }
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid grey",
    boxShadow: 12,
    p: 4,
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container justifyContent="center">
            <Grid item>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {modalType === "register"
                  ? ` Register Here to Continue`
                  : "Login Here to Continue"}
              </Typography>
            </Grid>

            <Grid container justifyContent="center" marginTop={2}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Username"
                variant="outlined"
                style={{ marginBottom: 10 }}
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    username: e.target.value,
                  });
                }}
              />
              <TextField
                fullWidth
                id="outlined-basic"
                label="Password"
                variant="outlined"
                style={{ marginBottom: 10 }}
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    password: e.target.value,
                  });
                }}
              />
              {modalType === "register" && (
                <>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="phonenumber"
                    variant="outlined"
                    style={{ marginBottom: 10 }}
                    onChange={(e) => {
                      setFormState({
                        ...formState,
                        phonenumber: e.target.value,
                      });
                    }}
                  />
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="email"
                    variant="outlined"
                    style={{ marginBottom: 10 }}
                    onChange={(e) => {
                      setFormState({
                        ...formState,
                        email: e.target.value,
                      });
                    }}
                  />
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="address"
                    variant="outlined"
                    style={{ marginBottom: 10 }}
                    onChange={(e) => {
                      setFormState({
                        ...formState,
                        address: e.target.value,
                      });
                    }}
                  />
                </>
              )}
            </Grid>

            <Grid container justifyContent="space-evenly" marginTop={2}>
              <Button variant="contained" color="primary" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                {modalType === "register" ? ` Register` : "Login"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Snackbar open={snackBarState.type} autoHideDuration={600}>
        <Alert
          onClose={() => {}}
          severity={snackBarState.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackBarState.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default RegistrationModal;
