import LoadingButton from "@mui/lab/LoadingButton";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function IncrementButton({
  setLimit,
  name,
  isLoading,
  hideIncButton,
}) {
  const incrementLimit = async (increment) => {
    setLimit((currLimit) => {
      return currLimit + increment;
    });
  };

  // hides button when there are no more articles to load
  if (hideIncButton) return <></>;

  //change innerText of button based on loading state
  let buttonText = isLoading ? `Loading ${name}` : `Load more ${name}`;

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
      sx={{
        mt: 4,
        mb: 5,
        width: "auto",
        alignSelf: "center",
      }}
    >
      {buttonText}
    </LoadingButton>
  );
}
