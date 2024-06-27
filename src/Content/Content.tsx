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
                    <iframe className={styles.chartIframe} srcDoc={model.figure}></iframe>
                    {/* mse: {model.mse} */}
                    {/* R-Squared: {model.rsquared} */}
                </>
            )
        } else {
            return <div className={styles.chartPlaceholder}> Build Model With Vehicle Attributes </div>
        }
    }

    return (
        <div>
            <div className={styles.pageTitle}>
                <h1>
                    Vehicle Modeler
                </h1>
            </div>
            
            {/* this is the content section */}
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
