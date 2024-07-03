import React from 'react';
import diagram from '../static/diagram.png'
import { ContentTitlePage } from '../ContentTitlePage';

export function About() {
    return (
        <ContentTitlePage
            title='About'
            content={
                <div>
                    <img src={diagram} className={styles.diagram}/>
                    <h2> Purpose </h2>
                    <p> 
                        This dashboard is an exercise/demonstration of how microservices can be used to build an analytics platform.
                        Feel free to checkout the source code linked below an read on for short summaries about what each service does.
                    </p>
                    <p> some sort of table of contents w/ source code links</p>
                    <h2> Python Analytics Service </h2>
                    <p> 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
                        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                        deserunt mollit anim id est laborum. 
                    </p>
                    <h2> Java Interface Service </h2>
                    <p> 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
                        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                        deserunt mollit anim id est laborum. 
                    </p>
                    <h2> NGINX Reverse Proxy </h2>
                    <p> 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
                        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                        deserunt mollit anim id est laborum. 
                    </p>
                </div> 
            }
        />
    )
}

import styles from './style.module.scss';
