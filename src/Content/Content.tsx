import React, { useState } from 'react';
import { PolyForm } from './PolyForm';
import { PolyStatistics } from './PolyStatistics';
import { Model } from './types';
import styles from './style.module.scss';

export function Content() {
    const [ model, setModel ] = useState<Model>();

    function createGraph() {
        if (model?.figure) {
            return (
                <>
                    <div> Results: </div>
                    <iframe srcDoc={model.figure}></iframe>
                    mse: {model.mse}
                    R-Squared: {model.rsquared}
                </>
            )
        } else {
            return <div> Build Model with input section </div>
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
                    <div> Inputs: </div>
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
