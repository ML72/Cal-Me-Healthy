import React, { Fragment, useRef, Component, useState } from 'react';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Webcam from 'react-webcam';

const Upload = () => {

    //For showing # of calories
    const [foodVals, setFoodVals] = React.useState(0);

    //File Uploading
    const inputFile = useRef(null);

    const uploadFile = () => {
        inputFile.current.click();
    };

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
        [webcamRef]
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
                'Authorization': 'Bearer 6476c732c3f6838b3b356b57e8994f5ce0050290',
                'Content-Type': 'multipart/form-data',
              }

        const headersForCalories = {
          'Authorization': 'Bearer 6476c732c3f6838b3b356b57e8994f5ce0050290'
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
                    sendRes(details);
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

    
    const sendRes = async (details) => {
        await axios.post("/api/food/snap", {details})
    }
  
    return (
        <Fragment>
            <input type='file' id='file' ref={inputFile} style={{display: 'none'}} onChange={onChangeFile}/>
            <button onClick={uploadFile}>Upload a File! </button>
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
            
            {foodVals !== '' ?
                <p id = "results"> The calories in this food item are {foodVals} </p>
                :
                <p> </p>
            }
        </Fragment>
    )
    
    
}
