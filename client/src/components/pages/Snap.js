import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';
import { Link, Navigate } from 'react-router-dom';

const Input = styled("input")({
  display: "none"
});

const Snap = (props) => {

  return (
    <Container maxWidth="sm" align="center">
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
				{props.children}
			</Typography>
      <Box
        sx={{
          width: 390,
          height: 390,
          mt: 5,
          mb: 3,
          borderRadius: 1,
          backgroundColor: "primary.dark"
        }}
      />
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
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
            />
            <Button variant="contained" component="span">
              Upload
            </Button>
          </label>
          <label htmlFor="icon-button-file">
            <Input />
            <IconButton
              color="secondary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </Stack>
      </Container>
    </Container>
  );
}

export default Snap;