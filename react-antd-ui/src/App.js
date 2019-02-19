import React from 'react';
import Routes from './routes/Routes';

class App extends React.Component{

    render() {
        const store  = this.props.store;
        return (
            <Routes store={store}/>
        )
    }

}

export default App;