import React from 'react'
import { Accordion, Form, Segment } from 'semantic-ui-react'

const content = () => {
      return <Accordion.Content as={Form.Input} label='Prompt' placeholder='How are you?'/>
    
      }

//<Accordion.Content as={Form.Input} label='Prompt' placeholder='How are you?'/>

export const AccordionForm = ({onPrompt}) => {
  const panels = [
    {
      key: 'prompt',
      title: 'Ask a question!',
      content: {
        as: Form.Input,
        label: 'Prompt',
        placeholder: 'How are you?',
        onInput: e => onPrompt(e.target.value),
      },
    },
  ]

  return (
  <Segment>
  <Form>
    <Accordion as={Form.Field} panels={panels} />

  </Form>
  </Segment>
  
  
  )
}


/*  <Segment>
    <Form>
      <Accordion as={Form.Field}>
        <Accordion.Panel key='prefix' title='Ask a question!' content={content}/> 
      </Accordion>
    </Form>
  </Segment> */