import LoadingButton from "@mui/lab/LoadingButton";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import "./IncrementButton.css";

export default function IncrementButton({
  limit,
  list,
  setLimit,
  name,
  isLoading,
}) {
  const incrementLimit = async (increment) => {
    setLimit((currLimit) => {
      return currLimit + increment;
    });
  };

  let disableButton = false;
  if (limit > list.length) disableButton = true;

  return (
    <LoadingButton
      size="large"
      endIcon={<ExpandCircleDownOutlinedIcon />}
      loading={isLoading}
      loadingPosition="end"
      variant="outlined"
      onClick={() => {
        incrementLimit(5);
      }}
      disabled={disableButton}
    >
      Load more {name}
    </LoadingButton>
  );
}
