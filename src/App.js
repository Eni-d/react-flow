import React, { useState } from 'react';
import ReactFlow, { addEdge, removeElements, MiniMap, Controls } from 'react-flow-renderer';
import './App.css'


function App() {
  //Elements for React Flow
  const [elements, setElements] = useState([])

  //Position for React Flow Elements
  const [pos, setPos] = useState(50)

  const onConnect = (params) => {
    setElements((els) => addEdge(params, els))
  }

  const onElementsRemove = (elementsToRemove) => {
    setElements((els) => removeElements(elementsToRemove, els))
  }

  const onElementClick = (event, element) => {
    document.getElementById('actionCard').classList.remove('none')
    // console.log(element)
    // console.log(element.data.label.props.children)
    // console.log(element.data.label.props.children[1].props.children[2])//From
    // console.log(element.data.label.props.children[2].props.children[2])//To
    // console.log(element.data.label.props.children[4].props.children[2])//Location
    // console.log(element.data.label.props.children[6].props.children[2])//Reminder
    // console.log(element.data.label.props.children[8].props.children[2])//Subject
    // console.log(element.data.label.props.children[8].props.children[2])//Body
    // console.log(element.data.label.props.children[9].props.children[2])//Meeting ID
    // console.log(element.data.label.props.children[10].props.children[2])//Reminder ID

    document.getElementById('to').value = element.data.label.props.children[2].props.children[2]
    document.getElementById('from').value = element.data.label.props.children[1].props.children[2]
    document.getElementById('location').value = element.data.label.props.children[4].props.children[2]
    document.getElementById('reminder').value = element.data.label.props.children[6].props.children[2]
    document.getElementById('subject').value = element.data.label.props.children[8].props.children[2]
    document.getElementById('body').value = element.data.label.props.children[9].props.children[2]
    document.getElementById('meetingID').value = element.data.label.props.children[10].props.children[2]
    document.getElementById('reminderID').value = element.data.label.props.children[11].props.children[2]
  }

  let createAction = (e) => {
    e.preventDefault()

    //Form for creating new node
    let actionForm = document.getElementById('actionForm')
    let formData = new FormData(actionForm)

    //Object for storing data from the form
    let body = {}

    //Data for new React Flow Element
    let node = {}

    for (let key of formData.keys()) {
      body[key] = formData.get(key)
    }
    node.id = `${Math.random() + 1}`

    let node_info_style = { margin: 0 }
    
    node.data = {
      label:
        <div>
          <p className='text-info' style={node_info_style}><b>Email</b></p>
          <p style={node_info_style}><b>From:</b> { body.emailID }</p>
          <p style={node_info_style}><b>To:</b> {body.to}</p>

          <p className='text-info' style={node_info_style}><b>Meeting</b></p>
          <p style={node_info_style}><b>Location:</b> {body.location}</p>

          <p className='text-info' style={node_info_style}><b>Reminder</b></p>
          <p style={node_info_style}><b>Reminder:</b> {body.reminder}</p>

          <div className='form-group'>
            <p className='text-info' style={node_info_style}><b>Date</b></p>
            <input type="date" className='form-control' placeholder='Execution time' id='execution'/>
          </div>

          {/* Fields will be needed for editing */}
          <p style={{ display:'none'}}><b>Subject:</b> {body.subject}</p>
          <p style={{ display:'none'}}><b>Body:</b> {body.body}</p>
          <p style={{ display:'none'}}><b>Meeting ID:</b> {body.meetingID}</p>
          <p style={{ display:'none'}}><b>Reminder ID:</b> {body.reminderID}</p>
        </div>
    }

    //Set new position
    setPos(pos + 50)
    node.position = { x: 250, y: 25 + pos }

    //Update elements
    setElements([...elements, node])

    //Clear form fileds
    actionForm.reset()

  }
  
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'row', alignItems: 'start' }}>
      <p id='top'></p>

      <button type="button" class="btn btn-primary mt-3" style={{ borderRadius: 20 }} onClick={() => {
        document.getElementById('actionCard').classList.toggle('none')
      }}>
        +Action
      </button>
     
      <ReactFlow
        elements={elements}
        onConnect={onConnect}
        onElementsRemove={onElementsRemove}
        onElementClick={onElementClick}
      >
        <MiniMap
          nodeColor={(node) => {
            switch (node.type) {
              case 'input':
                return 'blue';
            case 'default':
              return 'teal';
            case 'output':
              return 'red';
            default:
              return '#eee';
            }
          }}
        />
        <Controls />
      </ReactFlow>

      <div className='card mt-2 show none' id='actionCard'>
        <div className='card-body p-2'>
          <form id='actionForm'>
            <p>Email</p>
            <div className='form-group'>
              <input type="text" placeholder='To' className='form-control' name='to' id='to'/>
            </div>
            <div className='form-group'>
              <input type="text" placeholder='Fom' className='form-control' name='emailID' id='from'/>
            </div>
            <div className='form-group'>
              <input type="text" placeholder='Subject' className='form-control' name='subject' id='subject'/>
            </div>
            <div className='form-group'>
              <textarea name="body" id="body" cols="30" rows="5" placeholder='Body' className='form-control'></textarea>
            </div>

            <p>Meeting</p>
            <div className='form-group'>
              <input type="text" placeholder='Email IDs for meeting' className='form-control' name='meetingID' id='meetingID'/>
            </div>
            <div className='form-group'>
              <input type="text" placeholder='Location' className='form-control' name='location' id='location'/>
            </div>

            <p>Reminder</p>
            <div className='form-group'>
              <input type="text" placeholder='Email IDs for reminder' className='form-control' name='reminderID' id='reminderID'/>
            </div>
            <div className='form-group'>
              <input type="text" placeholder='Reminder' className='form-control' name='reminder' id='reminder'/>
            </div>

            {/* Modal footer */}
            <div class="form-group">
              <button type="button" class="btn btn-primary mr-2" onClick={createAction}>Add</button>
              <button type="button" class="btn btn-danger" onClick={() => {
                document.getElementById('actionCard').classList.toggle('none')
                window.location.href = '#top'
                let actionForm = document.getElementById('actionForm')
                actionForm.reset()
              }}>Close</button>
            </div>

            <p className='text-info'>*Remove selected nodes with the backspace key.</p>
          </form>
        </div>
      </div>



















    </div>
  )
  
};

export default App