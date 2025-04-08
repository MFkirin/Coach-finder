export default{
    requests(states){
        return states.requests;
    },
    hasRequests(state){
        return state.requests && state.requests.length > 0;
    }
}