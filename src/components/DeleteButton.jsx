import { useContext } from "react";
import { UserContext } from "../contexts/User";
import handleErrorMessage from "../utils/handle-error-message";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

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
      setDeletedItem(
        <Typography variant="h5" textAlign="center">
          Deleting {name}...
        </Typography>
      );
      await deleteApiFunction(itemId);
      setDeletedItem(
        <Typography variant="h5" textAlign="center">
          {name} Deleted!
        </Typography>
      );
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
