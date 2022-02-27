import React, { Fragment, useRef } from 'react';
import Typography from '@mui/material/Typography';
import axios from 'axios';
// import styled from 'styled-components';

const Dashboard = () => {

  const inputFile = useRef(null);

  const onChangeFile = (event) => {
    const data = new FormData();
    const file = event.target.files[0];
    data.append('image', file)
    callAPI(data);
  }

  const onButtonClick = () => {
    inputFile.current.click();
  };

  // const takePic = () => {
  //   <video autoplay id="webcam" width="227" height="227"></video>
  // }

  const callAPI = (fileData) => {
      const headers = {
              'Authorization': 'Bearer af1c3893553aadd68d66a2e001df362d63dba335',
              'Content-Type': 'multipart/form-data',
            }
      const headersForCalories = {
        'Authorization': 'Bearer af1c3893553aadd68d66a2e001df362d63dba335'
      }
      //initial request
          var request = axios.post(
            "https://api.logmeal.es/v2/image/recognition/dish", 
            fileData, 
            {headers : headers}
          )
          request.then(response => {
            try {
              //should print out resulting food
              //console.log(JSON.stringify(response.data));
              //console.log(response.data.recognition_results[0].name);
              //response.json(response.data.recognition_results[0].name);
              //should use this to print out calorie count
              //new form data for adding it
              var data = {
                "imageId": response.data.imageId,
                "class_id": response.data.recognition_results[0].id
              }

              //new request
              var request2 = axios.post(
                "https://api.logmeal.es/v2/nutrition/recipe/nutritionalInfo",
                data,
                {headers : headersForCalories}
                //response.data.recognition_results[0].id}
              )
              //using request to get calories
              request2.then(response2 => {
                try {
                  //console.log(response2.data)
                  //console.log(response2.data.dail);

                  var details = {
                    "foodName": response.data.recognition_results[0].name,
                    "nutritionalInfo": {
                      "calories": response2.data.nutritional_info.calories
                    },
                    "dailyIntakeReference": {
                      ...response2.data.nutritional_info.dailyIntakeReference
                    },
                    "totalNutrients": {
                      ...response2.data.nutritional_info.totalNutrients
                    },
                    "servingSize": response2.data.nutritional_info.serving_size
                  }

                    console.log(details);
                    sendRes(details);
                  //response.json(details);
                  //response.json(response2.data.nutritional_info.calories)
                }
                catch {
                  console.error(response2.error)
                }
              })

            }
            catch {
              console.error(response.error)
            }
          })
}

  const sendRes = (details) => {
    const requestBE = axios.post("http://localhost:5000/api/food/snap", details)
    return requestBE.then(response => response.data)
  }
  
  return (
    <Fragment>
      <Typography variant="h1" component="div" align="center" sx={{ my: "1rem" }}>
        Dashboard
      </Typography>
      <input type='file' id='file' ref={inputFile} style={{display: 'none'}} onChange={onChangeFile}/>
      <button onClick={onButtonClick}>Upload a File! </button>
    </Fragment>
  );
}

export default Dashboard;
