import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, CardMedia } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Videos } from "../components";
import { fetchDataFromApi } from "../utils/fetchDataFromApi";

const VideoDetail = () => {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    fetchDataFromApi(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      
      setVideoDetail(data?.items[0])
    );

    fetchDataFromApi(
      `search?part=snippet&relatedToVideoId=${id}&type=video`
    ).then((data) => setVideos(data?.items));
  }, [id]);

  if (!videoDetail?.snippet) return "Loading...";

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;
  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography variant="h5" color="#fff" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Stack
                display="flex"
                flexDirection="row"
                gap={2}
                justifyContent="center"
                alignItems="center"
              >
                <Link to={`/channel/${channelId}`}>
                  <CardMedia
                    image={videoDetail?.snippet?.thumbnails?.high?.url}
                    alt={videoDetail?.snippet?.title}
                    sx={{
                      borderRadius: "50%",
                      height: "40px",
                      width: "40px",
                      mb: 2,
                      border: "1px solid #e3e3e3",
                    }}
                  />
                </Link>
                <Typography
                  variant={{ sm: "subtitle1", md: "h6" }}
                  color="#fff"
                >
                  {channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Stack>
              <Stack direction="row" gap="20px" alignItems="center">
              <button style={{borderRadius:'30%',border:'1px solid gray'}}><Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography></button>
                <button style={{borderRadius:'30%',border:'1px solid gray'}}><Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes</Typography></button>
                
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
