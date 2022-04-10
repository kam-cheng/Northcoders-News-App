import { useState } from "react";
import { patchVotes } from "../utils/api";
import ErrorComponent from "./ErrorComponent";
import handleErrorMessage from "../utils/handle-error-message";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import IconButton from "@mui/material/IconButton";

export default function VoteButton({ articleId, commentId, votes, size }) {
  const [voteTotal, setVotes] = useState(votes);
  const [error, setError] = useState(null);

  //function to incremement vote when button clicked
  const incrementVote = (increment) => {
    setVotes((currVotes) => currVotes + increment);
    patchVotes({ articleId, commentId, increment }).catch((err) => {
      setVotes((currVotes) => currVotes - increment);
      //custom message for client-side errors
      const customMessage =
        "vote increment failed - please reload page and try again";
      setError(handleErrorMessage(err, customMessage));
    });
  };

  //disable relevant buttons when vote changed
  const maxUpVotes = votes + 1;
  const maxDownVotes = votes - 1;
  let textColour = "inherit";
  // let disableUpButton = voteTotal >= maxUpVotes ? true : false;
  let disableUpButton;
  let disableDownButton;
  if (voteTotal >= maxUpVotes) {
    disableUpButton = true;
    textColour = "green";
  }
  if (voteTotal <= maxDownVotes) {
    disableDownButton = true;
    textColour = "red";
  }

  if (error)
    return (
      <h3 className="error-message">
        <ErrorComponent error={error} />
      </h3>
    );
  return (
    <div className={`icon ${size}`} style={{ color: `${textColour}` }}>
      <IconButton
        aria-label="thumb-up"
        onClick={() => {
          incrementVote(1);
        }}
        disabled={disableUpButton}
      >
        <ThumbUpOutlinedIcon />
      </IconButton>
      {voteTotal}
      <IconButton
        aria-label="thumb-down"
        className="vote-button"
        onClick={() => {
          incrementVote(-1);
        }}
        disabled={disableDownButton}
      >
        <ThumbDownOutlinedIcon />
      </IconButton>
    </div>
  );
}
