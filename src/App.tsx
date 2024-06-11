import React, { useState } from 'react';
import { PolyForm } from './PolyForm';
import { PolyStatistics } from './PolyStatistics';
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
                <div className={styles.chartInputs}>
                    <PolyForm setModel = {setModel}/>
                </div>
                
                {/* Output Statistics */}
                <div className={styles.outputStatistics}>
                    <PolyStatistics/>
                </div>
            </div>
        </div>
    );
};

export default App;
