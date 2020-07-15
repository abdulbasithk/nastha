import React, { useEffect, useState } from 'react'
import { Table, Pagination, Search } from 'semantic-ui-react'
import { useDispatch, useSelector} from 'react-redux'

import { fetchEvents } from '../store/actions'

import moment from 'moment'
import 'moment/locale/id'
import _ from 'lodash'
export default function Dashboard() {
    moment.locale('id')

    const dispatch = useDispatch()
    
    const events = useSelector(state => state.reducers.events)
    const [page, setPage] = useState(0)
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [loadingSearch, setLoadingSearch] = useState(false)

    useEffect(() => {
        if(events.length === 0) {
            dispatch(fetchEvents())
        }
        setData(_.chunk(events, 5))
    }, [events.length, dispatch, events])

    const handlePagination = (event, { activePage }) => {
        setPage(activePage - 1)
    }

    useEffect(() => {
        const results = events.filter(events => events.title.toLowerCase().includes(search.toLowerCase().trim()));
        setData(_.chunk(results, 5));
    }, [search])

    return (
        <div className="container mt-4">
            <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
            <Table striped celled padded>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>No.</Table.HeaderCell>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Location</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Participant</Table.HeaderCell>
                        <Table.HeaderCell>Note</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {data.length < 1 ? "Empty Data" : data[page].map(el => 
                        <Table.Row key={el.id}>
                            <Table.Cell>{el.id}</Table.Cell>
                            <Table.Cell>{el.title}</Table.Cell>
                            <Table.Cell>{el.location}</Table.Cell>
                            <Table.Cell singleLine>{moment(el.date).format('LL')}</Table.Cell>
                            <Table.Cell>{el.participant}</Table.Cell>
                            <Table.Cell>{el.note}</Table.Cell>
                        </Table.Row>)
                    }
                </Table.Body>
            </Table>
            { events.length > 5 ? 
                <div>
                    <Pagination
                        onPageChange={handlePagination}
                        activePage={page+1}
                        boundaryRange={0}
                        ellipsisItem={null}
                        firstItem={null}
                        lastItem={null}
                        siblingRange={1}
                        disabled={Math.ceil(events.length / 5) > 1 ? false : true}
                        totalPages={Math.ceil(events.length / 5)}
                    />
                </div>
                : '' }
        </div>
    )
}
