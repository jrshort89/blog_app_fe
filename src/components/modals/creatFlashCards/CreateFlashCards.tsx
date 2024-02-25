import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Modal,
  OutlinedInput,
} from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import { TRANSLATION_HISTORY } from "../../../graphql/translationHistory";
import { useEffect, useState } from "react";
import { styles } from "./createFlashCardStyles";
import { useForm } from "react-hook-form";
import { translationHistory } from "../../../types/translationHistory";
import {
  SPANISH_TRANSLATION_GROUP_CREATE,
  spanishTranslationGroupVariables,
} from "../../../graphql/spanishTranslationGroupCreate";
import {
  GROUP_CREATE,
  groupCreateVariables,
} from "../../../graphql/groupCreate";

interface CreateFlashCardsProps {
  onClose: () => void;
  isModalOpen: boolean;
}

export function CreateFlashCards({
  isModalOpen,
  onClose,
}: CreateFlashCardsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const translationHistory = useQuery(TRANSLATION_HISTORY);
  const [spanishTranslationGroupCreate, {}] = useMutation(
    SPANISH_TRANSLATION_GROUP_CREATE
  );
  const [groupCreate] = useMutation(GROUP_CREATE);

  const { handleSubmit, register, reset } = useForm<any>();

  const getSelectedKeys = (selectedTranslationHistoryIds: {
    [key: string]: boolean;
  }) => {
    return Object.keys(selectedTranslationHistoryIds)
      .filter((key) => {
        if (key === "groupName") return;
        return selectedTranslationHistoryIds[key];
      })
      .map((key: string) => +key);
  };

  const submitHandler = async (selectedTranslationHistoryIds: {
    [key: string]: boolean;
  }) => {
    setIsLoading(true);
    const groupId = await groupCreate(
      groupCreateVariables(
        selectedTranslationHistoryIds.groupName as unknown as string
      )
    ).then((res) => +res.data.groupCreate.group.id);

    await spanishTranslationGroupCreate(
      spanishTranslationGroupVariables(
        groupId,
        getSelectedKeys(selectedTranslationHistoryIds)
      )
    );
    setIsLoading(false);
    handleClose();
  };

  const handleClose = () => {
    onClose();
    reset({});
  };

  useEffect(() => {
    translationHistory.client.refetchQueries({
      include: [TRANSLATION_HISTORY],
    });
  }, []);

  if (translationHistory.loading) return <p>Loading...</p>;
  if (translationHistory.error)
    return <p>`Error loading history: ${translationHistory.error.message}`</p>;
  return (
    <Modal open={isModalOpen} onClose={handleClose}>
      <Box sx={styles.modalStyle}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <OutlinedInput
            placeholder="Group name"
            required={true}
            {...register("groupName")}
          />
          <div style={styles.translateHistory} className={"no-scrollbar"}>
            {!!translationHistory.data &&
              translationHistory.data?.translationHistory?.map(
                (t: translationHistory) => (
                  <div style={styles.formWrapperStyle}>
                    <FormControlLabel
                      control={<Checkbox {...register(t.id)} />}
                      label={t.englishText}
                    />
                    <FormHelperText>{t.spanishText}</FormHelperText>
                  </div>
                )
              )}
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
