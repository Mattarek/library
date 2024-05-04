import axios from "axios";
import { Dispatch, SetStateAction, useCallback } from "react";
import { Box, Typography, Modal as ModalMUI } from "@mui/material";
import { Button } from "../../../../Doctors/src/components/Button/Button";
import { useParams } from "react-router-dom";

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
  border: "1px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: "3rem",
};

export const Modal = ({ state, setOpen }: Props) => {
  const { id } = useParams();

  const handleClickDelete = useCallback(async () => {
    try {
      const response = await axios.delete(
        `https://demo.api-platform.com/admin/books/${id}`
      );

      console.log("Delete successful:", response.data);
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
          Do you really want to delete this book?
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
