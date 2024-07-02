import React, { useState } from 'react';
import { PolyForm } from './PolyForm';
import { PolyStatistics } from './PolyStatistics';
import { ContentTitlePage } from '../ContentTitlePage';
import { Model } from './types';
import styles from './style.module.scss';

export function VehicleAnalysis() {
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
        <ContentTitlePage 
            title='Vehicle Modeler'
            content = {
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
            }
        />
    );
};
