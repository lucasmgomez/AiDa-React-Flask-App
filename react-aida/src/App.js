import React, {useState} from 'react';
import {Dropdown, Container, Header, Button, Loader, Input, Form, Segment} from "semantic-ui-react"; //{ , Dropdown, Progress, Input } from "semantic-ui-react";
import {AccordionForm} from "./components/AccordionForm";
import './App.css';

const versionOptions = [ 
  {
    key: 'Untrained',
    text: 'Untrained',
    value: '355M'
  },
  {
  key: 'Emily Dickinson',
  text: 'Emily Dickinson',
  value: 'dickinson',
  }, 
  {key: 'Emily Dickinson + Virginia Woolf',
  text: 'Emily Dickinson + Virginia Woolf',
  value: 'woolf',
  },
  {key: 'Emily Dickinson + Virginia Woolf + Frank Howard',
  text: 'Emily Dickinson + Virginia Woolf + Frank Howard',
  value: 'howard',
  }
]


function App() {
  const [sample, setSample] = useState([]);
  const [version, setVersion] = useState('');
  const [length, setLength] = useState(35);
  const [prompt, setPrompt] = useState('');
  const [nsamples, setNSamples] = useState(1);
  const [loading, setLoading] = useState(false);


  function getSample() {
    setLoading(true)
    console.log("HELLLLO")
    console.log("THIS IS PROMPT:" + prompt)
    let res = fetch('/sample?version=' + version + '&length=' + length + '&prompt=' + prompt + '&nsamples=' + nsamples).then(response => {
      response.json().then(data => {setSample(data.sample) 
        setLoading(false)}
    )})
    setLoading(true)
    console.log(res)
    return res
  }

  return (



    <Container style={{ marginTop: 35 }}>
      <Header as='h1'>Sample AiDa</Header>
      <Form>
        <Form.Field>
          <Dropdown fluid placeholder="Select Version" selection options={versionOptions} onChange={(_, data) => {setVersion(data.value)}}/>
        </Form.Field>
      </Form>
      <AccordionForm onPrompt={text => setPrompt(text)}/>
      <Form>
        <Form.Field>
          <Segment>
            <Header as='h5'> Length </Header>
            <Input value={length} onChange={e => setLength(e.target.value)}></Input> 
          </Segment>
        </Form.Field>
        <Form.Field>
          <Segment>
            <Header as='h5'> Number of Samples </Header>
            <Input value={nsamples} onChange={e => setNSamples(e.target.value)}></Input> 
          </Segment>
        </Form.Field>
        <Form.Field>
          <Button onClick={getSample}>Generate</Button>
        </Form.Field>
      </Form>
    
    <Segment>
      <Container>
        <Header as='h2'> Samples </Header>
        <Loader  size='large' active={loading} inline content='Generating' />
        <p  hidden={loading} style={{whiteSpace: 'pre-line'}} >{sample}</p>
      </Container>
    </Segment>

  </Container>
  );
}

export default App;
