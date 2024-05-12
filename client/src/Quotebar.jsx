import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#85c1e9',
    ...theme.typography.body2,
    padding:12,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height:'60px'
  }));
  
function Quotebar() {
  return (
    <Box>
          <Item><h1 style={{fontWeight:'bold',fontFamily:'fantasy'}}>IT'S BOOKISHHH</h1></Item>
    </Box>
   
  );
}

export default Quotebar;
