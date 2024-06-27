import React from 'react';
import diagram from '../static/diagram.png'


export function About() {
    return (
        <div>
            <img src={diagram} className={styles.diagram}/>
        </div>    
    )
}


import styles from './style.module.scss';
