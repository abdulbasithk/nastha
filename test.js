import React, { useState } from 'react'
import { Image, Form } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setError, addEvents } from '../store/actions'

import moment from 'moment'
import workingImage from '../assets/working.jpg'

const addEvent = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    
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
    const loading = useSelector(state => state.reducers.loading)

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormContent({ ...formContent, [name]: value })
    }
    const handleImage = (event) => {
        event.preventDefault()
        const newForm = new FormData();
        newForm.append('image', event.target.files[0])
        Axios({
            method: "POST",
            url: "",
            data: newForm
        })
            .then(({data}) => {
                setPhoto(data.fileName.location)
            })
    }
    const handleSubmitForm = (event) => {
        dispatch(setError(null))
        event.preventDefault()
        
        if(!formContent.title) return dispatch(setError({name: 'title', error: 'Please Input Title'}))
        if(!formContent.location) return dispatch(setError({name: 'location', error: 'Please Input Location'}))
        if(!formContent.participant) return dispatch(setError({name: 'participant', error: 'Please Input Participant'}))
        if(!formContent.date) return dispatch(setError({name: 'date', error: 'Please Input Date'}))
        if(!formContent.note || formContent.note.length <= 50) return dispatch(setError({name: 'note', error: 'Please Input Note and Must 50 Character or more'}))

        dispatch(addEvents(formContent))
    }
    return (
            <div className="container">
                <div className="row justify-content-center" style={{padding: '15vh'}}>
                    <div className="col-sm-12 col-md-6 col-lg-6" style={{height: "50vh", backgroundColor: "#c4c4c4", paddingTop: '10px'}}>
                        <h3 style={{color: 'black', fontWeight: 'bold', textAlign:'center'}}>
                            Add Event
                        </h3>
                        <Form>
                            <Form.Group widths="equal">
                                <Form.Input
                                    placeholder='Title'
                                    name="title"
                                    value={formContent.title}
                                    onChange={handleChange}
                                />
                                <Form.Input
                                    placeholder='Location'
                                    name="location"
                                    value={formContent.location}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Input
                                    placeholder='Participant'
                                    name="participant"
                                    value={formContent.participant}
                                    onChange={handleChange}
                                />
                                <DateInput
                                    placeholder='Date'
                                    name="date"
                                    type="date"
                                    value={formContent.date}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Input 
                                type="file"
                                label="Photo"
                                onChange={(event) => handleImage(event)}
                            />
                        </Form>
                        <Button primary onClick={(event) => handleSubmitForm(event)} content="Submit" />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6" style={{height: "50vh"}}>
                        <Image src={workingImage} size='medium' />
                    </div>
                </div>
            </div>
    )
}

export default addEvent