// MODE (development/production) provided by webpack plugin
const endpoints: { [key: string]: string } = {
    development: 'http://localhost:80/api',
    production:
        'http://AnalyticsLoadBalancer-1260159310.us-east-1.elb.amazonaws.com/api',
};

export { endpoints };
