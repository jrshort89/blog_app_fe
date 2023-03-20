import { FlashCard } from "./FlashCard";
import { Button } from "@mui/material";
import { useState } from "react";
import { CreateFlashCards } from "../modals/creatFlashCards/CreateFlashCards";

class Properties<T, U> {}

const style: Properties<string | number, string & {}> = {
  height: "100vh",
  width: "100vh",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  flexDirection: "column",
};

export default function FlashCards() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClose = () => setIsModalOpen(false);
  const handleOpen = () => setIsModalOpen(true);

  return (
    <div style={style}>
      <Button onClick={handleOpen}>Create flashcards</Button>
      <FlashCard answer="hola" question="hello" />
      <CreateFlashCards isModalOpen={isModalOpen} onClose={handleClose} />
      {/*    todo: add flash card groups here    */}
    </div>
  );
}
