import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Modal,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import { TRANSLATION_HISTORY } from "../../../graphql/translationHistory";
import { useEffect } from "react";
import { styles } from "./createFlashCardStyles";

interface CreateFlashCardsProps {
  onClose: () => void;
  isModalOpen: boolean;
}

export function CreateFlashCards({
  isModalOpen,
  onClose,
}: CreateFlashCardsProps) {
  const { loading, error, data, client } = useQuery(TRANSLATION_HISTORY);

  useEffect(() => {
    client.refetchQueries({ include: [TRANSLATION_HISTORY] });
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>`Error loading history: ${error.message}`</p>;
  return (
    <Modal open={isModalOpen} onClose={onClose}>
      <Box sx={styles.modalStyle}>
        <input />
        <FormGroup>
          {!!data &&
            data?.translationHistory?.map((t: any) => (
              <div style={styles.formWrapperStyle}>
                <FormControlLabel
                  key={t.englishText}
                  control={<Checkbox />}
                  label={t.englishText}
                />
                <FormHelperText>{t.spanishText}</FormHelperText>
              </div>
            ))}
        </FormGroup>
      </Box>
    </Modal>
  );
}
