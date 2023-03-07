import { Stack, TextField, Typography, Grid, Button } from '@mui/material'
import NFCLogo from '../../Assets/Images/NFC Iet Logo.png';


const StudentCertificate = () => {

  return (
    <Grid >
      <Stack  sx={{ border: '5px solid' }}>
        <Stack>
          <Typography>Serial No.</Typography>
          <TextField variant='standard' align="left"/>
        </Stack>

        <Stack >
        <img src={NFCLogo} style={{ width: 200, height: 160 }} alt='Logo' align="center"  />
        </Stack>

        <Stack alignContent="right" justify="right">
          <Typography>Registration No.</Typography>
          <TextField variant='standard' align="right"/>
        </Stack>
<Stack alignContent='center' justify="center">

        <Stack >
          <Typography variant='h6' align='center' color="#70231d" fontFamily= '"Montserrat", Open Sans'>
            NFC Institute of Engineering and Technology
            </Typography>


        </Stack>
        <Stack > 
          <Typography variant='h6' align='center' style={{color:"#70231d" , fontFamily: '"Montserrat", Open Sans'}}>
          Degree Awarding Certificate
          </Typography>
          </Stack>


        <Grid container justify="center" align="center" item xs={12}>

          <Stack spacing={4}>
            <Stack direction='row' spacing={2} justifyContent='center'
              alignItems='center'>

              <Typography align='center' >This Certificate is awarded to </Typography>


              <TextField variant='standard' />
              <Typography align='center'> S/D/o </Typography>
              <TextField variant='standard' />

            </Stack>

            <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'>
              <Typography align='center'>at</Typography>
              <TextField variant='standard' />
              <Typography align='center'> on this </Typography>
              <TextField variant='standard' />
              <Typography align='center'> day of</Typography>
              <TextField variant='standard' />
            </Stack>
            <Stack direction='row' spacing={2} justifyContent='center'alignItems='center'>
              on successful completion of the certificate course of
            </Stack>
            <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'>
              <TextField variant='standard' />
              <Typography align='center'>in</Typography>
              <TextField variant='standard' />
              <Typography align='center'>grade</Typography>

            </Stack>
            <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'>
              <TextField variant='standard' />
              <Typography align='center'>from</Typography>
              <TextField variant='standard' />
              <Typography align='center'>to</Typography>
              <TextField variant='standard' />


            </Stack>

            <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'>
              <Typography align='center'>from</Typography>
              <TextField variant='standard' />

            </Stack>

          </Stack>

        </Grid >
        <Button variant="contained" style={{maxWidth: '100px', maxHeight: '70px', minWidth: '100px', minHeight: '70px' ,  display: 'flex', justifyContent: 'flex-end'}}>
          
        </Button>

      </Stack>
      </Stack>
    </Grid>

  )
}


export default StudentCertificate;
