import { Button } from "@mui/material";
import { useState } from "react";
import { CreateFlashCards } from "../modals/creatFlashCards/CreateFlashCards";
import { useQuery } from "@apollo/client";
import { ALL_GROUPS } from "../../graphql/allGroups";
import { styles } from "./flashCardStyles";
import { GROUP_TRANSLATIONS } from "../../graphql/groupTranslations";

export default function FlashCards() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClose = () => setIsModalOpen(false);
  const handleOpen = () => setIsModalOpen(true);
  const allGroupsQuery = useQuery(ALL_GROUPS);
  const groupTranslationsQuery = useQuery(GROUP_TRANSLATIONS);

  if (allGroupsQuery.loading || groupTranslationsQuery.loading)
    return <span>"loading..."</span>;
  return (
    <div style={styles.body}>
      <Button onClick={handleOpen}>Create flashcards</Button>
      <CreateFlashCards isModalOpen={isModalOpen} onClose={handleClose} />
      <div style={styles.list} className={"no-scrollbar"}>
        {/*  todo: make type for group*/}
        {allGroupsQuery?.data?.allGroups?.map((group: any) => (
          <div
            onClick={() =>
              groupTranslationsQuery.refetch({ groupId: +group.id })
            }
          >
            {group.name}
          </div>
        ))}
        <div>
          {groupTranslationsQuery?.data?.groupTranslations?.map(
            (translation: any) => {
              return (
                <span>
                  {translation.englishText}: {translation.spanishText}
                </span>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
