import { useState } from "react";
import { patchVotes } from "../utils/api";
import ErrorComponent from "./ErrorComponent";
import handleErrorMessage from "../utils/handle-error-message";

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

  if (error) return <ErrorComponent error={error} />;
  return (
    <div className={`icon ${size}`} style={{ color: `${textColour}` }}>
      <button
        className="vote-button"
        onClick={() => {
          incrementVote(1);
        }}
        disabled={disableUpButton}
      >
        <img
          src="/images/thumb-up.png"
          className={`icon ${size}`}
          alt="up vote icon"
        />
      </button>
      {voteTotal}
      <button
        className="vote-button"
        onClick={() => {
          incrementVote(-1);
        }}
        disabled={disableDownButton}
      >
        <img
          src="/images/thumb-down.png"
          className={`icon ${size}`}
          alt="down vote icon"
        />
      </button>
    </div>
  );
}
