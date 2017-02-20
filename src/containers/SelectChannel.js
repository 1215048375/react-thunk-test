import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {selectChannelAction, fetchRemoteData} from '../actions'


class SelectChannel extends Component{
    constructor (props) {
        super(props)
        this.onSelectChange = this.onSelectChange.bind(this)
    }


    onSelectChange(nextChannel) {
        if (nextChannel !== this.props.currentChannel) {
            this.props.dispatch(selectChannelAction(nextChannel))
        }
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, currentChannel} = nextProps
        if (currentChannel !== this.props.currentChannel) {
            dispatch(fetchRemoteData(currentChannel))
        }
    }

    render() {
        const { currentChannel, lists } = this.props
        let listData = [];
        if (typeof lists !== 'undefined' && typeof lists.items !== 'undefined') {
            listData = lists.items.data.children
        }

        return (
            <div>
                <h1>{currentChannel}</h1>
                <select onChange={
                    (e) => {
                        let selectedChannelName = e.target.value
                        this.onSelectChange(selectedChannelName)
                    }
                }>
                    <option value="reactjs">reactjs</option>
                    <option value="PHP">PHP</option>
                </select>
                <ul>
                    {
                        listData.map( (list) => {
                            return (
                                <li key={list.data['id']}><a target="_blank" href={"https://reddit.com/" + list.data['permalink']}>{list.data['title']}</a></li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

SelectChannel.PropTypes = {
    onSelectChange: PropTypes.func.isRequired,
    currentChannel: PropTypes.string.isRequired,
    lists: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
}

const mapStatsToProps = (state, ownProps) => {
    return {
        currentChannel: state.selectedChannel,
        lists: state.posts[state.selectedChannel]
    }
}

export default connect(mapStatsToProps, undefined)(SelectChannel)