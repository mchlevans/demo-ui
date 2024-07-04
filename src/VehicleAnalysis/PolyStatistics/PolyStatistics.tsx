import React from 'react';
import { manufacturerSummary } from './data';
import { ManufacturerMetrics } from './types';
import styles from './style.module.scss';

/**
 * Overview of Vehicle Dataset
 */
export function PolyStatistics() {
    function getManufacturerRows(manufacturerSummary: ManufacturerMetrics[]) {
        const results = [];

        for (let i = 0; i < manufacturerSummary.length; i++) {
            const item = manufacturerSummary[i];
            const { manufacturer, count } = item;
            results.push(
                <tr key = {`manufacturerSummaryTr${i}`}>
                    <td> {manufacturer} </td>
                    <td> {count} </td>
                </tr>
            );
        }

        return results;
    }
    
    return (
        <div className={styles.summaryStatsContainer}>
            <h2>
                About This Data Set
            </h2>
            
            <p>
                201 vehicles across 22 manufacturers. Unfortunately the dataset does not include vehicle year.
            </p>


            <table>
                <thead>
                    <tr>
                        <th> Manufacturer </th>
                        <th> Vehicle Count </th>
                    </tr>
                </thead>
                <tbody>
                    {getManufacturerRows(manufacturerSummary)}
                </tbody>
            </table>
        </div>
    )
}
