import React, { Fragment, useRef, Component, useState } from 'react';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Webcam from 'react-webcam';
// import styled from 'styled-components';

const Dashboard = () => {

  //UPLOADING FILE
  const sendRes = (details) => {
    const requestBE = axios.post("http://localhost:5000/api/food/snap", {details})
    return requestBE.then(response => response.data)
  }

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

  // TAKING IMAGE
  
  const [image, setImage] = React.useState(null);
  const webcamRef = React.useRef(null);

  const dimensions = {width: 512, height: 512};

  const capture = React.useCallback((event) => {
          event.preventDefault();
          const imageSrc = webcamRef.current.getScreenshot({width: 512, height: 512});
          setImage(imageSrc);
      },
      [webcamRef]
  )

  const submit = () => {
    //console.log(image);
    const data = new FormData();
    data.append('image', dataURLtoFile(image, 'food.jpg'));
    callAPI(data);
  }

  function dataURLtoFile(dataurl, filename) {
 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
}


  //calling the API

  const callAPI = (fileData) => {
      const headers = {
              'Authorization': 'Bearer 020c0a16973684590ce180f20386bddd937f3dba',
              'Content-Type': 'multipart/form-data',
            }
      const headersForCalories = {
        'Authorization': 'Bearer 020c0a16973684590ce180f20386bddd937f3dba'
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
                    "foodGroup": response.data.foodFamily[0].name,
                    "nutritionalInfo": {
                      "calories": response2.data.nutritional_info.calories
                    },
                    "dailyIntakeReference": {
                      ...response2.data.nutritional_info.dailyIntakeReference
                    },
                    "totalNutrients": {
                      ...response2.data.nutritional_info.totalNutrients
                    },
                    "servingSize": response2.data.serving_size
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
  
  return (
    <Fragment>
      <Typography variant="h1" component="div" align="center" sx={{ my: "1rem" }}>
        Dashboard
      </Typography>
      <input type='file' id='file' ref={inputFile} style={{display: 'none'}} onChange={onChangeFile}/>
      <button onClick={onButtonClick}>Upload a File! </button>
      <Webcam 
        audio={false}
        ref={webcamRef}
        videoConstraints={dimensions}
        screenshotFormat = "image/jpeg"
      />
      <button onClick={(event) => {capture(event)}}> Take a Pic! </button>
      
      {image && (
          <img 
            src={image}
          />
        )
      }

      {image != null ? 
        <button onClick={submit()}> Submit pic </button> 
        :
        <p> Take a pic first to submit! </p>     
      }
      

    </Fragment>
  );
}

export default Dashboard;
