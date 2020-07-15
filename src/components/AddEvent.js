import React, { useState } from 'react'
import { Image, Form, Button } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { setError, addEvents } from '../store/actions'

import Axios from 'axios'
import moment from 'moment'
import workingImage from '../assets/working.jpg'

const AddEvent = () => {
    const dispatch = useDispatch()
    
    const [photo, setPhoto] = useState('')
    const [formContent, setFormContent] = useState({
        title: '',
        location: '',
        participant: '',
        date: moment().format('YYYY-MM-DD'),
        note: '',
        picture: ''
    })

    // Store statement

    const error = useSelector(state => state.reducers.error)

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormContent({ ...formContent, [name]: value })
    }

    const resetForm = () => {
        setFormContent({
            title: '',
            location: '',
            participant: '',
            date: moment().format('YYYY-MM-DD'),
            note: '',
            picture: ''
        })
    }

    const handleImage = (event) => {
        event.preventDefault()
        const newForm = new FormData();
        newForm.append('image', event.target.files[0])
        Axios({
            method: "POST",
            url: "http://localhost:4000/upload",
            data: newForm
        })
            .then(({data}) => {
                setPhoto(data.fileName.location)
            })
    }
    const handleSubmitForm = (event) => {
        dispatch(setError(null))
        event.preventDefault()
        
        if(!formContent.title) return dispatch(setError('Please Input Title'))
        if(!formContent.location) return dispatch(setError('Please Input Location'))
        if(!formContent.participant) return dispatch(setError('Please Input Participant'))
        if(!formContent.date) return dispatch(setError('Please Input Date'))
        if(!formContent.note || formContent.note.length <= 50) return dispatch(setError('Please Input Note and Must 50 Character or more'))

        dispatch(addEvents({...formContent, picture: photo}))
        resetForm()
    }
    return (
            <div className="container">
                <div className="row justify-content-center" style={{padding: '15vh', alignItems: 'center'}}>
                    <div className="col-sm-12 col-md-6 col-lg-6" style={{backgroundColor: "#c4c4c4", paddingTop: '10px', paddingBottom: '10px'}}>
                        <h3 style={{color: 'black', fontWeight: 'bold', textAlign:'center'}}>
                            Add Event
                        </h3>
                        <Form style={{paddingBottom: '20px'}}>
                            <Form.Group widths="equal">
                                <Form.Input
                                    placeholder='Title'
                                    name="title"
                                    value={formContent.title}
                                    onChange={handleChange}
                                    required
                                />
                                <Form.Input
                                    placeholder='Location'
                                    name="location"
                                    value={formContent.location}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Input
                                    placeholder='Participant'
                                    name="participant"
                                    value={formContent.participant}
                                    onChange={handleChange}
                                    required
                                />
                                <Form.Input
                                    placeholder='Date'
                                    name="date"
                                    type="date"
                                    value={formContent.date}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.TextArea
                                    placeholder='Note'
                                    name="note"
                                    value={formContent.note}
                                    onChange={handleChange}
                                    required
                                    
                                />
                            <Form.Input 
                                type="file"
                                onChange={(event) => handleImage(event)}
                            />
                        </Form>
                        {error && <h6 style={{color: 'red'}}>{error}</h6>}
                        <Button primary onClick={(event) => handleSubmitForm(event)} content="Submit"/>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6" style={{backgroundColor: '#f6f6f6' }}>
                        <Image src={workingImage} size='big' fluid/>
                    </div>
                </div>
            </div>
    )
}

export default AddEvent