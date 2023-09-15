import { useState } from 'react';
import FormModal from './FormModal';
import './App.css';
import axios from 'axios';
import useSWR from 'swr';
import TableComp from './Table';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import { useValue } from './DataProvider';
import emailjs from 'emailjs-com'
import Loader from './Loader';
const fetcher = async (...args) => {
  const result = await axios.get(...args)
  return result.data
}

function App() {
  const [state, dispatch] = useValue();
  const [load, setLoad] = useState(false)
  const handleSend = async () => {
    if (state.users.length > 0) {
      emailjs.init('x4c05tASU1JJkE4bO')
      try {
        setLoad(true)
        await emailjs.send("service_138d48d", "template_c54wym6", {
          to_name: "Udayan",
          from_name: "Ankit",
          message: JSON.stringify(state.users),
          reply_to: "ankitsharmagh093@gmail.com",
        });

        setLoad(false)
      } catch (error) {
        setLoad(false)
        alert(error.message)
      }

    }
  }

  const { data, error } = useSWR('/data', fetcher, { refreshInterval: 1000 });
  const [isopen, setisopen] = useState(false)
  return (
    <div className="App">
      <Loader load={load} />
      <div className='app__container'>
        {error && <h2>Error</h2>}
        {
          data?.length > 0 ? <TableComp row={data} /> : <h1>NO DATA</h1>
        }
        {state.users.length > 0 ? <p>{state.users.length} items selected to send</p> : <p>No items selected</p>}
        <div className='button__container'>
          <Button variant="contained" onClick={() => { setisopen(true) }} endIcon={<AddIcon />}>Add Data</Button>
          <Button variant="contained" endIcon={<MarkunreadIcon />} onClick={handleSend} >Send</Button>
          <h2>Thisis good</h2>
          <h3>This is better heading</h3>
          <h3>This is my version</h3>
          <h2>Feeling good</h2> 
        </div>
        <h4>This is my new commit</h4>
        <FormModal open={isopen} onclose={() => { setisopen(false) }} />
      </div>


    </div>
  );
}

export default App;
