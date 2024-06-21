import React from 'react';
import { Outlet, Link } from "react-router-dom";
import styles from './style.module.scss'

export function AppContainer() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.side}>
                <nav>
                    <ul>
                        <li> 
                            <Link to={`polynomial-model`}>Polynomial Model</Link>
                        </li>
                        <li>  
                            <Link to={`about`}>About</Link>
                        </li>
                    </ul>     
                </nav>
            </div>
            <div className={styles.content}> 
                <Outlet/>
            </div>
        </div>
    )
}
