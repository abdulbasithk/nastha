const { Event } = require('../models')

class EventControllers {
    
    //Read All Events
    static findAll (req, res, next) {
        Event.findAll()
            .then(response => {
                res.status(200).json(response)
            })
            .catch(err => res.status(500).json(err))
    }

    //Create Event
    static create (req, res, next) {
        const {title, location, participant, date, note, picture} = req.body

        Event.create({title, location, participant, date, note, picture})
            .then(response => {
                res.status(201).json({
                    message: 'Event Created',
                    data: response
                })
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }
    // Update Event
    static update(req, res, next) {
        const {title, location, participant, date, note, picture} = req.body
        Event.update({
            title, location, participant, date, note, picture
        }, {
            where: {
                id: +req.params.id
            }
        })
            .then(response => {
                res.status(200).json({
                    message: "Event Updated"
                })
            })
            .catch(err => {
                res.status(404).json({
                    message: 'Event Not Found'
                })
            })
    }

    static delete(req, res, next) {
        Event.destroy({
            where: {
                id: +req.params.id
            }
        })
            .then(response => {
                res.status(200).json({
                    message: "Event Deleted"
                })
            })
            .catch(err => {
                res.status(404).json({
                    message: "Event not found"
                })
            })
    }
}

module.exports = EventControllers