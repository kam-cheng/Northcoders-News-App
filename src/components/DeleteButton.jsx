import { useContext } from "react";
import { UserContext } from "../contexts/User";
import handleErrorMessage from "../utils/handle-error-message";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "@mui/material/IconButton";

export default function DeleteArticle({
  itemId,
  setDeletedItem,
  author,
  setError,
  deleteApiFunction,
  name,
  size,
}) {
  const {
    user: { username },
  } = useContext(UserContext);

  const removeItem = async () => {
    try {
      setDeletedItem(<p>Deleting {name}...</p>);
      await deleteApiFunction(itemId);
      setDeletedItem(<p>{name} Deleted!</p>);
    } catch (err) {
      setDeletedItem(false);
      const customMessage = `attempt to delete ${name} failed - please reload page and try again`;
      setError(handleErrorMessage(err, customMessage));
    }
  };

  if (author !== username) return <></>;
  return (
    <IconButton
      aria-label="delete-button"
      onClick={() => {
        removeItem();
      }}
    >
      <DeleteOutlineOutlinedIcon fontSize="large" />
    </IconButton>
  );
}
