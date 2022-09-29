import { FC, useContext, useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Collapse,
  Typography,
  Stack,
  styled,
} from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

import PlayerContext from "./contexts/PlayModeContext";
import VolumeControl from "./VolumeControl";
import TimeControl from "./TimeControl";
import TrackControl from "./TrackControl";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CardPlayer: FC = () => {
  const {
    audioRef,
    music,
    isPlaying,
    playNext,
    updateDuration,
    updateElapsedTime,
  } = useContext(PlayerContext);
  const [volume, setVolume] = useState<number>(50);
  const [mute, setMute] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (audioRef.current.readyState < 1) {
      return;
    }
    if (audioRef.current != null) {
      audioRef.current.volume = volume / 100;
    }
    if (isPlaying) {
      const interval = setInterval(() => {
        const _duration = Math.floor(audioRef.current.duration);
        const _elapsed = Math.floor(audioRef.current.currentTime);

        updateDuration(_duration);
        updateElapsedTime(_elapsed);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying, volume, audioRef, updateDuration, updateElapsedTime]);

  const onAudioLoaded = () => {
    audioRef.current && updateDuration(Math.floor(audioRef.current.duration));
    audioRef.current && isPlaying && audioRef.current.play();
    updateElapsedTime(0);
  };

  return (
    <>
      <audio
        src={music.url}
        ref={audioRef}
        muted={mute}
        onLoadedMetadata={onAudioLoaded}
        onEnded={playNext}
      />
      <Container maxWidth="sm">
        <Card>
          <CardMedia
            component="img"
            // sx={{ width: 151 }}
            image={music.image}
            alt={music.title}
          />
          <CardContent sx={{ backgroundColor: "#4c4c4c" }}>
            <Stack
              sx={{
                alignItems: "center",
                color: "silver",
              }}
            >
              <Typography variant="h5">{music.title}</Typography>
              <Typography variant="subtitle1">{music.artist}</Typography>
            </Stack>
            <Stack sx={{ padding: 2 }} spacing={2}>
              <Stack
                direction="row"
                spacing={1}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <TimeControl />
              </Stack>
              <Stack
                direction="row"
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TrackControl />
              </Stack>
              <Stack
                direction="row"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <VolumeControl
                  mute={mute}
                  toggleMute={() => setMute(!mute)}
                  volume={volume}
                  setVolume={setVolume}
                />
              </Stack>
            </Stack>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
              <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron
                and set aside for 10 minutes.
              </Typography>
              <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep
                skillet over medium-high heat. Add chicken, shrimp and chorizo,
                and cook, stirring occasionally until lightly browned, 6 to 8
                minutes. Transfer shrimp to a large plate and set aside, leaving
                chicken and chorizo in the pan. Add pimentón, bay leaves,
                garlic, tomatoes, onion, salt and pepper, and cook, stirring
                often until thickened and fragrant, about 10 minutes. Add
                saffron broth and remaining 4 1/2 cups chicken broth; bring to a
                boil.
              </Typography>
              <Typography paragraph>
                Add rice and stir very gently to distribute. Top with artichokes
                and peppers, and cook without stirring, until most of the liquid
                is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
                reserved shrimp and mussels, tucking them down into the rice,
                and cook again without stirring, until mussels have opened and
                rice is just tender, 5 to 7 minutes more. (Discard any mussels
                that don&apos;t open.)
              </Typography>
              <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then
                serve.
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Container>
    </>
  );
};

export default CardPlayer;
