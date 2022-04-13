import { useState } from "react";
import { deleteComment } from "../utils/api";
import dayjs from "dayjs";
import VoteButton from "./VoteButton";
import DeleteButton from "./DeleteButton";
import ErrorComponent from "./ErrorComponent";
import {
  Divider,
  ListItem,
  Stack,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

export default function CommentItem({
  comment: { comment_id, votes, created_at, author, body },
}) {
  const [deletedComment, setDeletedComment] = useState(false);
  const [error, setError] = useState(false);

  if (deletedComment) return [deletedComment];
  return (
    <ListItem>
      <Card
        sx={{ minWidth: 340, margin: "20px", maxWidth: 450 }}
        align="center"
      >
        <CardContent>
          <Typography
            variant="body1"
            color="error"
            style={{ display: error ? "block" : "none" }}
            gutterBottom
          >
            <ErrorComponent error={error} />
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            {author}
          </Typography>
          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{ fontWeight: "medium" }}
          >
            {dayjs(created_at).toString()}
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <Typography variant="body1" gutterBottom>
            {body}
          </Typography>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <VoteButton commentId={comment_id} votes={votes} size={"large"} />
            <DeleteButton
              itemId={comment_id}
              setDeletedItem={setDeletedComment}
              setError={setError}
              author={author}
              deleteApiFunction={deleteComment}
              name={"Comment"}
              size={"large"}
            />
          </Stack>
        </CardContent>
      </Card>
    </ListItem>
  );
}
