import { useState,useEffect } from "react";
import { Box,Stack,Typography } from "@mui/material";
import {SideBar,Videos} from '../components';
import { fetchDataFromApi } from "../utils/fetchDataFromApi";

const Feed = () => {

  const [selectedCategory ,setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);
  useEffect(()=>{
    fetchDataFromApi(`search?part=snippet&q=${selectedCategory}`).then((data)=>setVideos(data.items));
  },[selectedCategory])

  return (
    <Stack sx={{flexDirection:{sx:'column',md:'row'}}}>
      <Box sx={{height:{sx:'auto',md:"92vh",borderRight:'1px solid #3d3d3d',px:{sx:0,md:2}}}}>
      <SideBar selectedCategory={selectedCategory} setSelectedCategory = {setSelectedCategory}/>
      <Typography className="copyright" variant="body2" sx={{mt:1.5,color:'#fff'}}>
        WatchMate - By Anubhav <br/>Pant
      </Typography>
      </Box>
      <Box p={2} sx={{overflowY:'auto',
        height:'90vh' ,flex:2}}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{color:'white'}}>
          {selectedCategory} <span style={{color:'rgb(134, 215, 241)'}}>videos</span>
        </Typography>
        <Videos videos={videos}/>
      </Box>
    </Stack>
  )
}

export default Feed
