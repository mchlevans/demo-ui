import React, { useState } from 'react';
import { PolyForm } from './PolyForm';
import { PolyStatistics } from './PolyStatistics';
import { ContentTitlePage } from '../ContentTitlePage';
import { Model, LoadStatus } from './types';
import styles from './style.module.scss';

export function VehicleAnalysis() {
    const [modelStatus, setModelStatus] = useState<LoadStatus>();
    const [model, setModel] = useState<Model>();

    function createGraph() {
        if (modelStatus === LoadStatus.Loading) {
            return (
                <div className={styles.chartPlaceholder}>
                    {' '}
                    ... Loading Model ...{' '}
                </div>
            );
        } else if (modelStatus === LoadStatus.Error) {
            return (
                <div className={styles.chartPlaceholder}>
                    {' '}
                    Unable To Load Model{' '}
                </div>
            );
        } else if (modelStatus === LoadStatus.Loaded) {
            return (
                <>
                    <iframe
                        className={styles.chartIframe}
                        srcDoc={model.figure}
                    ></iframe>
                </>
            );
        }
        return (
            <div className={styles.chartPlaceholder}>
                {' '}
                Build Model With Vehicle Attributes{' '}
            </div>
        );
    }

    return (
        <ContentTitlePage
            title="Polynomial Model: Vehicle Dataset"
            content={
                <div className={styles.wrapper}>
                    {/* Chart */}
                    <div className={styles.chart}>{createGraph()}</div>

                    {/* Chart Inputs */}
                    <div className={styles.chartInputs}>
                        <PolyForm
                            setModel={setModel}
                            setModelStatus={setModelStatus}
                        />
                    </div>

                    {/* Output Statistics */}
                    <div className={styles.outputStatistics}>
                        <PolyStatistics />
                    </div>
                </div>
            }
        />
    );
}
