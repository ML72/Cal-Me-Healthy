import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';
import { Link, Navigate } from 'react-router-dom';
import React, { Fragment, useRef, Component, useState, useEffect } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';

const Input = styled("input")({
  display: "none"
});

const Snap = (props) => {
  //For showing # of calories
  const [foodVals, setFoodVals] = React.useState(0);

  //File Uploading
  const inputFile = useRef(null);

  //File Sending
  const onChangeFile = (event) => {
      const data = new FormData();
      const file = event.target.files[0];
      data.append('image', file)
      callAPI(data);
  }

  //Image Taking
  const [image, setImage] = React.useState(null);
  const webcamRef = React.useRef(null);

  const dimensions = {width: 512, height: 512};

  const capture = React.useCallback((event) => {
          event.preventDefault();
          const imageSrc = webcamRef.current.getScreenshot({width: 512, height: 512});
          setImage(imageSrc);
      },
      [webcamRef, setImage]
  )

  //Img sending
  const submit = () => {
      const data = new FormData();
      data.append('image', dataURLtoFile(image, 'food.jpg'));
      callAPI(data);
  }

  //convert b64 to jpg
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

  //Calls logmeal.es api and backend api
  const callAPI = (fileData) => {
      //Headers for first request, where sending form data w/ image
      const headers = {
              'Authorization': 'Bearer 361e38ff582a835e138f424a164096025c463bbb',
              'Content-Type': 'multipart/form-data',
            }

      const headersForCalories = {
        'Authorization': 'Bearer 361e38ff582a835e138f424a164096025c463bbb'
      }
      //initial request
          var request = axios.post(
            "https://api.logmeal.es/v2/image/recognition/dish", 
            fileData, 
            {headers : headers}
          )
          request.then(response => {
            try {
              //stores data for second request
              var data = {
                "imageId": response.data.imageId,
                "class_id": response.data.recognition_results[0].id
              }

              //second request to get nutritional info
              var request2 = axios.post(
                "https://api.logmeal.es/v2/nutrition/recipe/nutritionalInfo",
                data,
                {headers : headersForCalories}
              )
              request2.then(response2 => {
                try {
                  //creates object to send to backend
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
                  setFoodVals(response2.data.nutritional_info.calories);
                  //sendRes(details);
                  setDetailsInput(details);
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

  //CURRENT AREA BEING EDITED


  const [detailsInput, setDetailsInput] = useState({
    "foodName": "",
    "foodGroup": "",
    "servingSize": 0,
    "nutritionalInfo": {},
    "dailyIntakeReference": {},
    "totalNutrients": {}
  })

  // // const sendRes = (details) => {
  // //   await axios.post("/api/food/snap", {details})
  // // }

  useEffect(async (details) => {
    if (detailsInput.foodName != "") {
      console.log(detailsInput);
      await axios.post("/api/food/snap", {details})
    }

  });
  

  const uploadFile = () => {
    inputFile.current.click();
  };


  return (
    <Container maxWidth="sm" align="center">
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
				{props.children}
			</Typography>
      <div className = "parent">
      <div className="overlap">
        <div className="overlap-1"> 
          <Box
            sx={{
              width: 550,
              height: 550,
              mt: 5,
              mb: 3,
              borderRadius: 1,
              backgroundColor: "primary.dark"
            }}
          />
        </div>
        <div className="overlap-2"> 
        {image === null ? 
          <Webcam 
            audio={false}
            ref={webcamRef}
            videoConstraints={dimensions}
            screenshotFormat = "image/jpeg"
          />
          :
            <img 
              src={image}
            />
          }
        </div>
          
      </div>
      </div>

      <Container
        sx={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{
            mt: 1,
            mb: 4
          }}
        >          
          <label htmlFor="contained-button-file">
            <Input
              accept="image/jpg"
              id="contained-button-file"
              id="file"
              type="file"
              ref={inputFile}
              style={{display: 'none'}}
              onChange={onChangeFile}
            />
            <Button onClick={uploadFile} variant="contained" component="span">
              Upload File
            </Button>
          </label>

          <label htmlFor="icon-button-file">
            <IconButton onClick={(event) => {capture(event)}}
              color="secondary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>


          {image != null ? 
                <label htmlFor="contained-button-file">
                <Button onClick={submit} variant="contained" component="span">
                  Send Snap
                </Button>
              </label>
                :
                <p> Take a pic first to submit! </p>     
          }

        </Stack>
      </Container>
    </Container>
  );
}

export default Snap;
