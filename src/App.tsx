import React, { useState } from 'react';
import { ModelBuilder } from './ModelBuilder';
import styles from './style.module.scss';

const App = () => {
    const [ model, setModel ] = useState();

    function createGraph() {
        if (model?.figure) {
            return <iframe srcDoc={model.figure}></iframe>
        } else {
            return <iframe></iframe>
        }
    }

    return (
        <div>
            <div className={styles.wrapper}>
                
                {/* Chart */}
                <div className={styles.chart}>
                    {createGraph()}
                </div>
                
                {/* Chart Inputs */}
                {/* < div> */}
                    <ModelBuilder setModel = {setModel}/>
                {/* </div> */}
                
                
                {/* Output Statistics */}
                {/* <div> */}
                    <div className={styles['output-statistics']}>
                        content right
                    </div>
                {/* </div> */}
            </div>
        </div>
    );
};

export default App;
