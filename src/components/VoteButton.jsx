import { useState } from "react";
import { patchVotes } from "../utils/api";

export default function VoteButton({ articleId, votes }) {
  const [voteTotal, setVotes] = useState(votes);

  const incrementVote = (increment) => {
    patchVotes(articleId, increment);
    setVotes((currentVotes) => {
      return currentVotes + increment;
    });
  };

  return (
    <div className="icon">
      <button
        className="vote-button"
        onClick={() => {
          incrementVote(1);
        }}
      >
        <img src="/images/thumb-up.png" className="icon" alt="up vote icon" />
      </button>
      {voteTotal}
      <button
        className="vote-button"
        onClick={() => {
          incrementVote(-1);
        }}
      >
        <img
          src="/images/thumb-down.png"
          className="icon"
          alt="down vote icon"
        />
      </button>
    </div>
  );
}
