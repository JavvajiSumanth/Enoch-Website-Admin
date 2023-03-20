import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Button, IconButton, Rating, TextField } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Box } from "@mui/system";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import uniqid from "uniqid";

export default function Reviews() {
  const [name, setName] = React.useState("");
  const [review, setReview] = React.useState("");
  const [rating, setRating] = React.useState(3);
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [reviews, setReviews] = React.useState([]);

  const handelOpen = () => {
    setOpen(true);
    reset();
  };
  const handelClose = () => {
    setOpen(false);
  };
  const reset = () => {
    console.log("resetting");
    setName("");
    setReview("");
    setEdit(false);
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    if (edit) {
      updateReview({
        review,
        name,
        rating,
        id: edit,
      });
    } else {
      createReview({
        review,
        name,
        rating,
      });
    }
  };

  React.useEffect(() => {
    const fetchedData = [];

    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "reviews"));
      querySnapshot.forEach((doc) => {
        fetchedData.push(doc.data());
      });
      setReviews(fetchedData);
    }
    fetchData();
  }, []);
  const handleEdit = ({ review, name, id, rating }) => {
    setOpen(true);
    setReview(review);
    setName(name);
    setRating(rating);
    setEdit(id);
  };

  const createReview = async (reviewObj) => {
    const genratedID = uniqid();
    reviewObj.id = genratedID;

    const courseRef = doc(db, "reviews", genratedID);
    await setDoc(courseRef, reviewObj);

    setReviews((reviews) => [...reviews, reviewObj]);
    handelClose();
  };

  const updateReview = async (reviewObj) => {
    const courseRef = doc(db, "reviews", reviewObj.id);

    await setDoc(courseRef, reviewObj, { merge: true });

    const updatedProperties = reviews.map((property) => {
      if (property.id === reviewObj.id) {
        return reviewObj;
      } else return property;
    });
    setReviews(updatedProperties);
    handelClose();
  };

  const handelDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this Review?") === true
    ) {
      const data = await deleteReview(id);
      if (data) {
        setReviews((reviews) => reviews.filter((crs) => crs.id !== id));
      }
    }
  };
  const deleteReview = async (reviewID) => {
    try {
      await deleteDoc(doc(db, "reviews", reviewID));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <>
      {open ? (
        <Box component={"form"} onSubmit={handelSubmit}>
          <TextField
            id="outlined-multiline-flexible"
            label="Name"
            fullWidth
            value={name}
            onChange={({ target }) => setName(target.value)}
            required
            sx={{
              my: 2,
            }}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Review"
            fullWidth
            multiline
            rows={3}
            value={review}
            required
            sx={{
              mb: 2,
            }}
            onChange={({ target }) => setReview(target.value)}
          />
          <Rating
            value={rating}
            onChange={({ target }) => setRating(+target.value)}
          />
          <br />
          <Button
            variant="contained"
            type="submit"
            sx={{
              my: 2,
            }}
          >
            Submit
          </Button>
          <Button
            onClick={handelClose}
            variant="outlined"
            color="error"
            type="button"
            sx={{
              m: 2,
            }}
          >
            Cancel
          </Button>
        </Box>
      ) : (
        <Button
          onClick={handelOpen}
          variant="contained"
          sx={{
            m: 2,
          }}
        >
          Add Review
        </Button>
      )}
      <br />
      <Typography variant="h3">Recently Added Reviews</Typography>
      <List
        sx={{ width: "100%", maxWidth: "100%", bgcolor: "background.paper" }}
      >
        {reviews.map((re) => (
          <ListItem
            sx={{
              boxShadow: `rgba(0, 0, 0, 0.08) 0px 4px 12px`,

              mb: 2,
            }}
            key={re.id}
            alignItems="flex-start"
            secondaryAction={
              <>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  color="primary"
                  sx={{
                    mr: 1,
                  }}
                  onClick={() => handleEdit(re)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => handelDelete(re.id)}
                  edge="end"
                  aria-label="delete"
                  color="error"
                >
                  <Delete />
                </IconButton>
              </>
            }
          >
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                src={`https://avatars.dicebear.com/api/adventurer/${re.id}.svg`}
              />{" "}
            </ListItemAvatar>
            <ListItemText
              sx={{
                marginRight: "40px",
              }}
              primary={re.name}
              secondary={<p className="text-truncate-3">{re.review}</p>}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}
