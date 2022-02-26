import React, { Fragment, useRef } from 'react';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const Dashboard = () => {

  const inputFile = useRef(null);

  const onChangeFile = (event) => {
    const data = new FormData();
    data.append('image', event.target.files[0])
    callAPI(data);
  }

  const onButtonClick = () => {
    inputFile.current.click();
  };

  function callAPI(fileData) {
      const headers = {
              'Authorization': 'Bearer 09742fa69f23bafc255965a1d317a85029923d1d',
              'Content-Type': 'multipart/form-data',
            }

          var request = axios.post(
            "https://api.logmeal.es/v2/image/recognition/dish", 
            fileData, 
            {headers : headers}
          )
          request.then(response => {
            try {
              console.log(response.data.recognition_results[0].name);
            }
            catch {
              console.error(response.error)
            }
          })
  }
  
  return (
    <Fragment>
      <Typography variant="h1" component="div" align="center" sx={{ my: "1rem" }}>
        Dashboard
      </Typography>
      <input type='file' id='file' ref={inputFile} style={{display: 'none'}} onChange={onChangeFile}/>
      <button onClick={onButtonClick}>Open file upload window</button>
    </Fragment>
  );
}

export default Dashboard;