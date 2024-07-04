import React from 'react';
import styles from './style.module.scss';

export function ContentTitlePage({ title, content }: Props) {
    
    return (
        <div>
            <div className={styles.title}>
                <h1>
                    { title }
                </h1>
            </div>
            <div className={styles.content} >
                { content }
            </div>
        </div>
    )
}
