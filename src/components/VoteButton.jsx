import { useState } from "react";
import { patchVotes } from "../utils/api";

export default function VoteButton({ articleId, votes, size }) {
  const [voteTotal, setVotes] = useState(votes);
  const [error, setError] = useState(null);

  //functiont to incremement vote when button clicked
  const incrementVote = (increment) => {
    setError(null);
    setVotes((currVotes) => currVotes + increment);
    patchVotes(articleId, increment).catch((err) => {
      setVotes((currVotes) => currVotes - increment);
      setError("Something went wrong, please try again.");
    });
  };

  //disable relevant buttons when vote changed
  const maxUpVotes = votes + 1;
  const maxDownVotes = votes - 1;
  let disableUpButton = voteTotal >= maxUpVotes ? true : false;
  let disableDownButton = voteTotal <= maxDownVotes ? true : false;

  if (error) return <p>{error}</p>;
  return (
    <div className={`icon ${size}`}>
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
