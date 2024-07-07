import React from 'react';
import diagram from '../static/diagram.png';
import { ContentTitlePage } from '../ContentTitlePage';
import styles from './style.module.scss';

export function About() {
    return (
        <ContentTitlePage
            title="About"
            content={
                <div>
                    <img src={diagram} className={styles.diagram} />
                    <h2> Purpose </h2>
                    <p>
                        This site is built for demonstration purposes as an
                        exercise in using microservices to construct an
                        analytics dashboard. I just might reuse this platform in
                        the future for any interesting analysis that comes up!
                    </p>
                    <p>
                        Python has rich selection of open source libraries for
                        data analysis, but you may not wish to use Python for
                        all your APIs. The architecture here leverages Python
                        for data analysis, and Java for all other backend
                        operations.
                    </p>
                    <p>
                        Feel free to read about each of the services below, and
                        check out the linked source code. As of writing this,
                        there are still plenty of enhancements and to-do items
                        I've pushed out:
                    </p>

                    <table className={styles.aboutTable}>
                        <tbody>
                            <tr>
                                <td>
                                    {' '}
                                    <a href="#aws-cloud-setup">
                                        {' '}
                                        AWS Cloud Setup{' '}
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {' '}
                                    <a href="#python-analytics-service">
                                        {' '}
                                        Python Analytics Service{' '}
                                    </a>
                                </td>
                                <td>
                                    {' '}
                                    <a href="https://github.com/mchlevans/autos-analytics-api">
                                        {' '}
                                        Code{' '}
                                    </a>{' '}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {' '}
                                    <a href="#java-api"> Java API </a>
                                </td>
                                <td>
                                    {' '}
                                    <a href="https://github.com/mchlevans/autos-interface-api">
                                        {' '}
                                        Code{' '}
                                    </a>{' '}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {' '}
                                    <a href="#NGINX-server-and-frontend">
                                        {' '}
                                        NGINX Server and Frontend{' '}
                                    </a>
                                </td>
                                <td>
                                    {' '}
                                    <a href="https://github.com/mchlevans/demo-analytics-ui">
                                        {' '}
                                        Code{' '}
                                    </a>{' '}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {' '}
                                    <a href="#postgres-db"> Postgres DB </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <h2 id="aws-cloud-setup"> AWS Cloud Setup </h2>
                    <p>
                        The goal of the cloud setup here, shown in the diagram
                        above, is to be as simple and cheap as possible while
                        still meeting all my basic needs. It is not the simplest
                        or cheapest possible AWS setup. I could achieve the same
                        results with less using Lamba functions, but felt the
                        unique setup of serverless functions distracted from the
                        purpose of this exercise.
                    </p>
                    <p>
                        All microservices, including the Postgres DB, are run
                        from docker containers, continuing the theme of
                        simplifying the AWS setup for my needs. I would prefer
                        the NGINX microservice be the only service held in the
                        public subnet, with the other microservices isolated in
                        a private subnet, but doing so would require additional
                        setup and configuration.
                    </p>
                    <p>
                        The Application Load Balancer (ABL) is overkill for this
                        exercise, and I do not need the redundancy of two
                        availability zones. The ABL was required as the IP
                        address of the NGINX server changes with each
                        deployment, and an Elastic IP Address cannot be
                        configured with AWS Fargate. I considered using EC2 with
                        and Elastic IP Address, but estimated the cost and
                        overhead tradeoffs to not be worth it (although it’s
                        possible I revisit that option). Overall, the cost of
                        this setup is reasonable, but it is unfortunate that the
                        ABL is more expensive than the entire Fargate setup.
                    </p>

                    <h2 id="python-analytics-service">
                        {' '}
                        Python Analytics Service{' '}
                    </h2>
                    <p>
                        The Python Analytics Service is built with Flask and
                        runs on a Gunicorn server. Data analysis is performed
                        with packages including Pandas, Numpy, Scikit-learn,
                        Scipy, Matplotlib, etc.
                    </p>
                    <p>
                        The analytics service uses in-memory caching. As of
                        writing this, I am caching the Vehicle dataset in
                        memory, using a cache-aside design. This optimizes for
                        situations where the required data can be retrieved
                        successfully from the cache. The vehicle data here never
                        changes, so the analytics service rarely needs to make a
                        request to the Java service for data. Between the
                        cache-aside design and the server-side rendering of the
                        figures, the underlying vehicle data almost never passes
                        between the different microservices.
                    </p>

                    <p>
                        The server-side rendering of figures is potentially the
                        most controversial part of the analytics services. A
                        good argument can be made building all figures on the
                        frontend instead. Building all the figures in the
                        frontend would allow for styles to more easily be
                        standardized (as is, figure labels are not in the same
                        font as the rest of the UI). Constructing all UI
                        components in one place could also help avoid confusion
                        - it should be clear what each microservices job is, and
                        it is the job of the frontend to display the underlying
                        data model.
                    </p>

                    <p>
                        That said, there are some interesting use cases to
                        consider when deciding how to handle data visualization.
                        If I were building a product with standardized figures
                        that change infrequently, I would lean towards building
                        the figures in the frontend for the previously mentioned
                        benefits. But, if the goal of the platform is to quickly
                        disseminate analysis performed by a data analyst, I
                        would rather the analyst have the ability to publish and
                        share figures they create in Matplotlib, which is more
                        similar to what I do here. This relationship between
                        data analysis and visualization is unique, and I found
                        it one of the more interesting design decisions in this
                        exercise.
                    </p>

                    <p>
                        Generating figures server side also offers some nice
                        technical benefits. Rather than passing a potentially
                        large amount of data back in the API response, you can
                        pass a relatively constant amount of data back in the
                        stringified HTML figure. A word of caution however -
                        Pyplot is not thread safe. I had to avoid using Pyplot
                        when creating figures here, which is unfortunate.
                    </p>

                    <h2 id="java-api"> Java API </h2>
                    <p>
                        The Java API handles all requests from the frontend and
                        acts as the controller for the Postgres database. In
                        this example, the Java API could easily be removed,
                        replaced by the Python service. At scale however, the
                        Python service would become quite large if it has to
                        handle all functionality for a production system.
                    </p>
                    <p>
                        At the moment, the Java API is built to handle the
                        relatively small Vehicle dataset, consisting of just 200
                        rows. If the dataset were millions of rows, pagination
                        or streams would be required. I would like to add such a
                        dataset in the future to make this API a bit more
                        realistic and interesting.
                    </p>
                    <h2 id="NGINX-server-and-frontend">
                        {' '}
                        NGINX Server and Frontend{' '}
                    </h2>
                    <p>
                        The NGINX server acts as a reverse proxy, forwarding
                        request from the frontend to the Java API and back. The
                        NGINX server is the only microservice that needs to be
                        publicly exposed.
                    </p>
                    <p>
                        The NGINX server contains the frontend files in memory.
                        More realistically, the frontend files could live in an
                        S3 bucket and be retrieved by a CDN or NGINX server. For
                        this example however, keeping the frontend files in
                        memory helped simplify my setup. I use a multistage
                        Dockerfile to first build the frontend, copying the
                        built files over to the final NGINX image that gets
                        deployed.
                    </p>
                    <h2 id="postgres-db"> Postgres DB </h2>
                    <p>
                        The Postgres setup here is greatly simplified to meet my
                        needs. Rather than provisioning an Amazon RDS instance,
                        I'm running a Postgres container just like the other
                        microservices. The Postgres setup only requires read
                        operations, and data is injected from a CSV file during
                        the build process. This setup meets all my needs for
                        this exercise and helps avoid unnecessary complexity and
                        cost.
                    </p>
                </div>
            }
        />
    );
}
