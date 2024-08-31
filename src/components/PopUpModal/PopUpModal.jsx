import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

export default function PopUpModal({ open, handleClose, borderRadius, element =  "Duis mollis, est non commodo luctus, nisi erat porttitor ligula."}) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              borderRadius: borderRadius,
              boxShadow: 24,
              outline: "none",
              padding: "15px",
              height: "33rem",
              '@media (max-width: 780px)': {
                width: 300
              },
              '@media (max-width: 300px)': {
                width: 250
              }
            }}
          >
              {element}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
