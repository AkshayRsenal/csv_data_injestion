import { makeStyles } from '@material-ui/core/styles';
import logo from './logo.svg';
import './App.css';
import Table from '@material-ui/core/Table';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import axios from 'axios';
import { useState } from 'react';

function App() {

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      }
    },

  }));

  const classes = useStyles();

  const [allMediaResources, setAllMediaResources] = useState({
    result:[],
    tableCaption: 'No data found'
  })

  var getAllMedia = async () => {
    var resources = await axios.get(`http://localhost:5005/sales-data/clothes`);
    console.log(resources);
    console.log(resources.data[0].length);
    if(resources.data.length > 0){
      setAllMediaResources({
        result: resources.data,
        tableCaption: resources.data.length-1 + " records in the csv file"
      });
    }
  }

  useState(()=>{
    getAllMedia();
  }, []);

  
  
  if (allMediaResources.result) {
    return (
      <div center="align">

        <div>
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table">
              <caption>{allMediaResources.tableCaption}</caption>
              {/* <TableHead>
                <TableRow>
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="left">Director</TableCell>
                </TableRow>
              </TableHead> */}
              <TableBody>
                {allMediaResources.result.map((row) => (
                  <TableRow>
                    {row.map((subelem)=>(<TableCell align="left">{subelem}</TableCell>))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }

}

export default App;
