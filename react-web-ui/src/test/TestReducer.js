const initialState = {
    text: 'Hello'
}
function testReducer(state = initialState, action){
    debugger;
    switch (action.type) {
        case 'CHANGE_TEXT':
            return {
                text:state.text=='Hello'?'Stark':'Hello'
            }
        case 'BUTTON_CLICK':
            return {
                text: 'You just click button'
            }
        default:
            return {
                text:'Hello'
            };
    }
}

export default testReducer;