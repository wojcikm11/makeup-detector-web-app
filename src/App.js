import { Button, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { Box, Stack } from "@mui/system";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import { PREDICTION_KEY, PREDICTION_API_URL, PREDICTION_MAKEUP, PREDICTION_NAGATIVE, PREDICTION_NO_MAKEUP } from "./constants";


function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [predictionResultMessage, setPredictionResultMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePredictionsResult = (predictionsArray) => {

    console.log(predictionsArray)

    const maxPropabilityPredictionObj = predictionsArray.reduce((prevPrediction, currentPrediction) => {
      return (prevPrediction.probability > currentPrediction.probability) ? prevPrediction : currentPrediction
    });

    const percentageProbability = (maxPropabilityPredictionObj.probability * 100).toFixed(2);
    let predictionMessage;

    if (maxPropabilityPredictionObj.tagName === PREDICTION_MAKEUP) {
      predictionMessage = "It is likely that you're wearing makeup with " + percentageProbability + "% probability";
    } else if (maxPropabilityPredictionObj.tagName === PREDICTION_NO_MAKEUP) {
      predictionMessage = "It is likely that you're not wearing makeup with " + percentageProbability + "% probability";
    } else if (maxPropabilityPredictionObj.tagName === PREDICTION_NAGATIVE) {
      predictionMessage = "The photo you uploaded is most likely not human face with " + percentageProbability + "% probability";
    }

    setPredictionResultMessage(predictionMessage);
  }

  const handleFileUpload = async (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {

      setErrorMessage("");
      setPredictionResultMessage("");
      setUploadedImage(imageFile);

      try {
        const response = await fetch(PREDICTION_API_URL, {
          method: "POST",
          headers: {
            "Prediction-Key": PREDICTION_KEY,
            "Content-Type": "application/octet-stream",
          },
          body: new Blob([imageFile]),
        });

        if (!response.ok) {
          const errorBody = await response.json();
          const errorMessage = await errorBody.message;
          throw new Error(errorMessage);
        }

        const responseJson = await response.json();
        handlePredictionsResult(responseJson.predictions);

      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingTop: "24px",
        rowGap: "30px",
        alignItems: "center",
      }}
    >
      <Stack textAlign="center" rowGap="15px">
        <Typography variant="h2">Makeup detector</Typography>
        <Typography fontSize="18px">
          Upload a photo of your face and verify if you're wearing a makeup
        </Typography>
      </Stack>
      <Button
        variant="contained"
        component="label"
        sx={{
          width: "300px",
        }}
      >
        Upload Photo
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleFileUpload}
        />
      </Button>

      {!uploadedImage && (
        <Container
          sx={{
            width: "650px",
            height: "550px",
            backgroundColor: grey[300],
            borderRadius: 1,
          }}
        />
      )}

      {uploadedImage && (
        <Box height={550} sx={{ borderRadius: 1, overflow: "hidden" }}>
          <img src={URL.createObjectURL(uploadedImage)} height={550} />
        </Box>
      )}

      {predictionResultMessage && <Typography fontSize="18px">{predictionResultMessage}</Typography>}
      <Typography fontSize="18px" color='error.main'>{errorMessage}</Typography>
    </Container>
  );
}

export default App;
