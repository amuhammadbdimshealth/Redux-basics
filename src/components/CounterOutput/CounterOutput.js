import React from 'react';

import './CounterOutput.css';

const counterOutput = (props) => (
    <div className="CounterOutput">
        Current Counter {props.from}: {props.value}
    </div>
);

export default counterOutput;