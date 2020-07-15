import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchEvents } from '../store/actions'
import EventCard from '../components/EventCard'

export default function Home() {

    const events = useSelector(state => state.reducers.events)
    const loading = useSelector(state => state.reducers.loading)
    const dispatch = useDispatch()
    
    useEffect(() => {
        if(events.length === 0) dispatch(fetchEvents())
    }, [events.length, dispatch])

    return (
        <div className="container">
            <div className="row justify-content-around">
                {events && events.map(el => <EventCard key={el.id} data={el} />)}
            </div>
        </div>
    )
}
