import React from 'react'
import { Card, Image, Icon } from 'semantic-ui-react'
import dummyImage from '../assets/working.jpg'

import moment from 'moment'
import 'moment/locale/id'
export default function EventCard(props) {
    moment.locale('id')
    const { data } = props
    return (
        <div style={{margin: "10px"}}>
            <Card>
                <Image
                    src={data.picture || dummyImage}
                    wrapped
                    size="medium"
                    ui={false}
                    fluid
                />
                <Card.Content>
                    <div className="row" style={{marginLeft: '3px'}}>
                        <Icon color="red" name="point"/>
                        <h6 style={{fontWeight:"bold"}}>{data.location}</h6>
                    </div>
                        <h4 style={{marginLeft: '3px'}}>{data.title}</h4>
                    <h6 style={{marginLeft: '3px', color: 'grey'}}>{moment(data.date).format('LL')}</h6>
                </Card.Content>
                <Card.Content extra>
                    <div className="row justify-content-around m-auto">
                        <div className="row">
                            <Icon color="blue" name="user"/>
                            <h6>{data.participant}</h6>
                        </div>
                    </div>
                </Card.Content>
                <Card.Content extra>
                    <h5 style={{fontWeight: 'bold'}}>Note :</h5>
                    <h6>
                        {data.note}
                    </h6>
                </Card.Content>
            </Card>
        </div>
    )
}
