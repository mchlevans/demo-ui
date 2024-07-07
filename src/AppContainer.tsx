import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import styles from './style.module.scss';

export function AppContainer() {
    const contentWrapperId = 'contentWrapperId';

    // Sets scroll back to top of page when navigating to a new page
    function resetScroll() {
        document.getElementById(contentWrapperId)?.scrollTo(0, 0);
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.side}>
                <nav>
                    <ul>
                        <li>
                            <Link onClick={resetScroll} to="polynomial-model">
                                Polynomial Model
                            </Link>
                        </li>
                        <li>
                            <Link onClick={resetScroll} to="about">
                                About
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className={styles.wrapper}>
                <div id={contentWrapperId} className={styles.content}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
