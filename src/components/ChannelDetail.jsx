import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Videos, ChannelCard } from "../components";
import { fetchDataFromApi } from "../utils/fetchDataFromApi";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  const { id } = useParams();

  console.log(channelDetail, videos);
  
  useEffect(() => {
    const fetchResults = async () => {
      const data = await fetchDataFromApi(`channels?part=snippet&id=${id}`);

      console.log(data);
    
      setChannelDetail(data?.items[0]);

      const videosData = await fetchDataFromApi(
        `search?channelId=${id}&part=snippet%2Cid&order=date`
      );

      setVideos(videosData?.items);
    };
    fetchResults();
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(106,120,237,0.4963235294117647) 0%, rgba(0,212,255,1) 100%)",
            height: "300px",
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-110px"/>
      </Box>
      <Box display="flex" p={2}>
        <Box sx={{mr:{sm:'100px'}}}/>
        <Videos videos={videos}/>
      </Box>
    </Box>
  );
};

export default ChannelDetail;
