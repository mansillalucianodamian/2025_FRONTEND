import React from 'react'
import { Link, useParams } from 'react-router'
import './ChannelList.css'

const ChannelList = ({ channel_list, onChannelSelect }) => {
    const { workspace_id } = useParams()
    return (
        <div className='channel-list'>
            {
                channel_list.length === 0
                    ? <span className='text_secondary_light'>Aun no has creado ningun canal</span>
                    : channel_list.map(
                        (channel) => {
                            return (
                                <Link className='list_channel' key={channel._id} to={`/workspace/${workspace_id}/${channel._id}`} onClick={() => onChannelSelect(channel)}>
                                    <span className="channel-hash">#  </span>
                                    <span className="channel-name">{channel.name}</span>
                                </Link>
                            )
                        }
                    )
            }
        </div>
    )
}

export default ChannelList