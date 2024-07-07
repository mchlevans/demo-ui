# Analytics Dashboard UI
This is the UI (and nginx setup) used in the [demo analytics dashboard](http://analyticsloadbalancer-1260159310.us-east-1.elb.amazonaws.com)!

Development can be performed locally with ```npm start``` and supporting services run with Docker Compose. The script ```scripts/buildDevImage.sh``` should be used for locally development to build the nginx image, which uses the local configuration found in ```dev.nginx.conf``` instead of the production configs in ```prod.nginx.conf```.
