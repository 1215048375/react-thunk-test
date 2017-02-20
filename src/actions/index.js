import fetch from 'isomorphic-fetch'

export const TYPE_FETCHING_REMOTE_DATA = 'FETCHING_REMOTE_DATA'
export const TYPE_HANDLE_RECEIVED_DATA = 'HANDLE_RECEIVED_DATA'
export const TYPE_HANDLE_ERROR_REMOTE_MSG = 'HANDLE_ERROR_REMOTE_MSG'
export const TYPE_SELECT_CHANNEL = 'SELECT_CHANNEL'


/**
 * @param url
 * @returns {{type: string, url: *}}
 */
export function fetchRemoteData(channel) {
    // return {
    //     type: TYPE_FETCHING_REMOTE_DATA,
    //     url: 'https://reddit.com/r/' + channel + '.json'
    // }

    return function(dispatch) {
        var url = `https://www.reddit.com/r/` + channel + `.json`;
        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(handleReceivedData(channel, json)))
    }
}

/**
 * 处理返回成功的数据
 * @param receivedData
 * @returns {{type: string, receivedData: *}}
 */
export function handleReceivedData(channel, receivedData) {
    return {
        type: TYPE_HANDLE_RECEIVED_DATA,
        channel: channel,
        receivedData: receivedData
    }
}

/**
 * 处理返回失败的数据
 * @param errorMsg
 * @returns {{type: string, errorMsg: *}}
 */
export function handleErrorRemoteMsg(errorMsg) {
    return {
        type: TYPE_HANDLE_ERROR_REMOTE_MSG,
        errorMsg: errorMsg
    }
}

/**
 * 选择频道
 * @param channelName
 * @returns {{type: string, channelName: *}}
 */
export function selectChannelAction(selectedChannel) {
    return {
        type: TYPE_SELECT_CHANNEL,
        selectedChannel:selectedChannel
    }
}

/**
 *
 {
    posts: {
        reactjs: {
            posts: [
                {
                    id,
                    title
                }
            ],
            updatedAt: 1354829180,
            isFetching: false,
        },
        frontend: {
            ...
        }
    },
    selectedChannel: reactjs
 }
 */

