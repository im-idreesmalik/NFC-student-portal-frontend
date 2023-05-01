import { Stack, TextField, Typography, Grid, Button} from '@mui/material'
import Box from '@mui/material/Box';
import NFCLogo from '../../Assets/Images/NFC Iet Logo.png';
import {useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const [loader, setLoader] = useState(false);

const downloadPDF = () =>{
  const capture = document.querySelector('.actual-receipt');
  setLoader(true);
  html2canvas(capture).then((canvas)=>{
    const imgData = canvas.toDataURL('img/png');
    const doc = new jsPDF('p', 'mm', 'a4');
    const componentWidth = doc.internal.pageSize.getWidth();
    const componentHeight = doc.internal.pageSize.getHeight();
    doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
    setLoader(false);
    doc.save('receipt.pdf');
  })
}

const StudentCertificate = () => {
const navigate = useNavigate();


  return (
    <Grid >
      <Stack  sx={{ border: '5px solid' }}>

      <Stack direction="row"
  justifyContent="space-evenly"
  alignItems="center"
  spacing={0}>

      <Typography>Serial No.</Typography>
          <TextField variant='standard'/>
      <img src={NFCLogo} style={{ width: 200, height: 160 }} alt='Logo'/>
      <Typography >Reg No.</Typography>
          <TextField variant='standard'/>

</Stack>
       
<Stack alignContent='center' justify="center">
  <Stack>
  <img src={NFCLogo} style={{ width: 250, height: 200, opacity: "0.8"  }} alt='Logo'/>

        <Stack >
          <Typography variant='h6' align='center'style={{color:"#ffffff" , fontFamily: '"Montserrat", Open Sans, bold' ,  backgroundColor: "#70231d" }} >
            NFC Institute of Engineering and Technology
            </Typography>


        </Stack>
        <Stack > 
          <Typography variant='h6' align='center' style={{color:"#ffffff" , fontFamily: '"Montserrat", Open Sans, bold' ,  backgroundColor: "#70231d" }}>
          Degree Awarding Certificate
          </Typography>
          </Stack>


       

          <Stack spacing={2}>
            <Stack direction='row' spacing={2} justifyContent='center'
              alignItems='center'>

              <Typography >This Certificate is awarded to </Typography>


              <TextField variant='standard' />
              <Typography> S/D/o </Typography>
              <TextField variant='standard' />

            </Stack>

            <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'>
              <Typography >at</Typography>
              <TextField variant='standard' />
              <Typography > on this </Typography>
              <TextField variant='standard' />
              <Typography > day of</Typography>
              <TextField variant='standard' />
            </Stack>
            <Stack direction='row' spacing={2} justifyContent='center'alignItems='center'>
              on successful completion of the certificate course of
            </Stack>
            <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'>
              <TextField variant='standard' />
              <Typography >in</Typography>
              <TextField variant='standard' />
              <Typography >grade</Typography>

            </Stack>
            <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'>
              <TextField variant='standard' />
              <Typography >from</Typography>
              <TextField variant='standard' />
              <Typography >to</Typography>
              <TextField variant='standard' />


            </Stack>

            <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'>
              <Typography align='center'>from</Typography>
              <TextField variant='standard' />

            </Stack>

          </Stack>

  
        
      </Stack>
      <Box component="span" sx={{ p: 2 }} display="flex"
  justifyContent="flex-end"
  alignItem="flex-end">
      <Button variant="contained"
       onClick={downloadPDF}
       disabled={!(loader===false)}
     >
       {loader?(
         <span>Downloading</span>
       ):(
         <span>Download</span>
       )}

        Download PDF
        </Button>
      
            <Button
                variant='contained'
                onClick={() => navigate('student/certificate')}
                disableElevation
              >
              Nex
              </Button>
              
    </Box>    
    </Stack>
    </Stack>

    </Grid>

  )

}

export default StudentCertificate;
