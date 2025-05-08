import React from 'react';
import { Calculator } from 'lucide-react';
import {Box} from '@mui/material';

import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardActions, 
  Typography, 
  TextField, 
  MenuItem, 
  Button 
} from '@mui/material';
import Layout from './Layout/Layout';

const FareCalculator = () => {
  return (
    <Layout>
    <Card className="w-25 mt-5 mb-5 max-w-md mx-auto">
      <CardHeader 
        title={
          <Typography variant="h5" component="div" className="flex items-center gap-2 text-blue-800">
            Get Your Fare
          </Typography>
        }
        style={{ background: 'linear-gradient(to right, #e3f2fd, #bbdefb)' }} // MUI gradient style
      />
      
      <CardContent>
        {/* Distance Input */}
        <div className="space-y-2">
          <TextField 
            select
            label="Select From"
            variant="outlined"
            fullWidth
            margin="normal"
          >
            <MenuItem value="Mini">Mini</MenuItem>
            <MenuItem value="Sedan">Sedan</MenuItem>
            <MenuItem value="SUV">SUV</MenuItem>
          </TextField>
        </div>
        
        {/* Vehicle Type */}
        <div className="space-y-2 mb-2">
          <TextField 
            select
            label="Select To"
            variant="outlined"
            fullWidth
            margin="normal"
          >
            <MenuItem value="Mini">Mini</MenuItem>
            <MenuItem value="Sedan">Sedan</MenuItem>
            <MenuItem value="SUV">SUV</MenuItem>
          </TextField>

          <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: '', sm: 'row' },
                    gap: 2,
                    margintoP: '80px',
                    marginBottom: "0px"
                  }}>
                    <TextField
                      type="number"
                      label="Adult"
                      variant="outlined"
                    //   value={senior}
                    //   onChange={handleSeniorChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        inputProps: { min: 0 },
                      }}
                    //   error={isError}
                    //   helperText={"isError" ? "limit of 6 exceed" : ""}
                    />
                    <TextField
                      label="Child"
                      type="number"
                    //   value={Child}
                    //   onChange={handleChildChange}
                    //   disabled={isChildDisabled()}
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        inputProps: { min: 0 },
                      }}
                    //   error={isError}
                    //   helperText={"isError" ? "limit of 6 exceed" : ""}
                    />
                    <TextField
                      type="number"
                      label="Senior Citizen"
                      variant="outlined"
                    //   value={SeniorCitizen}
                    //   onChange={handleSeniorCitizenChange}
                      // disabled={isDisabled}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        inputProps: { min: 0 },
                      }}
                    //   error={isError}
                    //   helperText={"isError" ? "limit of 6 exceed" : ""}
                    />
                  </Box>
        </div>

        {/* Price Display Box */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg" style={{background:"#CBDCEB"}}>
          <div className="flex justify-between items-center">
            <Typography color="textSecondary">Base Fare:</Typography>
            <Typography fontWeight="bold">₹50</Typography>
          </div>
          <div className="flex justify-between items-center mt-2">
            <Typography color="textSecondary">Distance Fare:</Typography>
            <Typography fontWeight="bold">₹100</Typography>
          </div>
          <div className="h-px bg-blue-200 my-3"></div>
          <div className="flex justify-between items-center text-lg font-bold text-blue-800">
            <Typography>Total Fare:</Typography>
            <Typography>₹150</Typography>
          </div>
        </div>
      </CardContent>

      <CardActions>
        <Button variant="contained" color="primary" fullWidth>
          Calculate Price
        </Button>
      </CardActions>
    </Card>
    </Layout>
  );
};

export default FareCalculator;
