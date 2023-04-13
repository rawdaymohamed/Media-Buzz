import React, { useState, useEffect } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  CardContent,
} from "@mui/material";

import socialMedia from "../assets/images/background.webp";
import { read } from "../user/api-user";
import { isAuthenticated } from "../auth/auth-helper";
import NewsFeed from "../post/NewsFeed";
const DefaultPage = () => (
  <Card sx={{ mx: "auto", my: 1, maxWidth: 400 }}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="300"
        image={socialMedia}
        alt="green leaves"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          MediaBuzz
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Welcome to the MediaBuzz Project.
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);
const Home = () => {
  const jwt = isAuthenticated();
  const [showDefaultPage, setShowDefaultPage] = useState(true);
  const [user, setUser] = useState({});
  useEffect(() => {
    if (!jwt) setShowDefaultPage(true);
    else {
      setShowDefaultPage(false);

      read(jwt.user._id, jwt, null).then((data) => {
        if (data && data.error) {
          console.log(data.error);
        } else if (data) {
          setUser(data);
        }
      });
    }
  }, []);

  if (showDefaultPage) return <DefaultPage />;
  if (user)
    return (
      <div style={{ marginTop: "12px" }}>
        <NewsFeed user={user} />
      </div>
    );
};
export default Home;
