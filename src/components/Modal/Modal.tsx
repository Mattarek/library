import axios from "axios";
import { Dispatch, SetStateAction, useCallback } from "react";
import { Box, Typography, Modal as ModalMUI } from "@mui/material";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
interface Props {
  state: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: ".125rem solid #000",
  boxShadow: 24,
  padding: "1rem 2rem 2rem 1.5rem",

  borderRadius: "3rem",
};

export const Modal = ({ state, setOpen }: Props) => {
  const { id } = useParams();

  const handleClickDelete = useCallback(async () => {
    try {
      await axios.delete(`https://demo.api-platform.com/admin/books/${id}`);
    } catch (error) {
      console.error("Error while deleting:", error);
    }
  }, [id]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <ModalMUI
      open={state}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Delete
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Are you sure you want to delete this item?
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button onClick={handleClickDelete}>Confirm</Button>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Box>
    </ModalMUI>
  );
};
