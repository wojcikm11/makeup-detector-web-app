import { Button, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { Box, Stack } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { useState } from 'react';
import { PREDICTION_KEY, PREDICTION_API_URL } from './constants'

function App() {

  const [uploadedImage, setUploadedImage] = useState(null);
  const [predictionResultMessage, setPredictionResultMessage] = useState("");

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const handleFileUpload = async (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      setUploadedImage(imageFile);
      const response = await fetch(PREDICTION_API_URL, {
        method: "POST",
        headers: {
          "Prediction-Key": PREDICTION_KEY,
          "Content-Type": 'application/octet-stream'
        },
        body: toBase64(imageFile)
      }).catch((error) => {
        console.log(error);
      });
      console.log(response);
      setPredictionResultMessage(response);
    }
  }

  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column',
      paddingTop: '24px',
      rowGap: '30px',
      alignItems: 'center'
    }}>
      <Stack textAlign="center" rowGap="15px">
        <Typography variant="h2">Makeup detector</Typography>
        <Typography fontSize="18px">Upload a photo of your face and verify if you're wearing a makeup</Typography>
      </Stack>
      <Button variant="contained" component="label" sx={{
        width: '300px'
      }}>
        Upload Photo
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleFileUpload}
        />
      </Button>

      {!uploadedImage &&<Container sx={{
        width: '650px',
        height: '550px',
        backgroundColor: grey[300],
        borderRadius: 1
      }} />}
      
      {uploadedImage && 
      <Box height={550} sx={{ borderRadius: 1, overflow: 'hidden'}}>
        <img src={URL.createObjectURL(uploadedImage)} height={550} />
      </Box>}

      <Typography fontSize="18px">{predictionResultMessage}</Typography>
    </Container>
  );
}

export default App;
