FROM node:16
# Take auth token for the private npm registry
# we pass it when we build the image
# "docker build -f Dockerfile.e2e --build-arg NPM_TOKEN=${NPM_TOKEN} -t image-name ."
ARG NPM_TOKEN
# Separately copy npmrc-docker file as npmrc.
# There we will use passed token NPM_TOKEN.
# We ignore initial npmrc file, so we create new one here.
WORKDIR /app
COPY . /app

# Install dependencies
RUN apt-get update && \
  apt-get install --no-install-recommends -y \
  libgtk2.0-0 \
  libgtk-3-0 \
  libnotify-dev \
  libgconf-2-4 \
  libgbm-dev \
  libnss3 \
  libxss1 \
  libasound2 \
  libxtst6 \
  xauth \
  xvfb \
  fonts-arphic-bkai00mp \
  fonts-arphic-bsmi00lp \
  fonts-arphic-gbsn00lp \
  fonts-arphic-gkai00mp \
  fonts-arphic-ukai \
  fonts-arphic-uming \
  ttf-wqy-zenhei \
  ttf-wqy-microhei \
  xfonts-wqy \
  && rm -rf /var/lib/apt/lists/*

RUN apt-get update
RUN apt-get -y install python3-pip

# Install app related tools
RUN npm install -g \
  @angular/cli \
  javascript
# Install the chrome driver
RUN apt-get update
RUN apt-get install -y fonts-liberation libappindicator3-1 xdg-utils
RUN wget -O /usr/src/google-chrome-stable_current_amd64.deb "https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb"

RUN apt-get install -y /usr/src/google-chrome-stable_current_amd64.deb
RUN rm /usr/src/google-chrome-stable_current_amd64.deb
RUN google-chrome --version
# We copy everything except the node_modules folder and whatever is in .dockerignore file.
ADD . /app
# Install dependencies right inside the docker. Private package will be installed as well.
# Appropriate chromedriver (for linux) is installed automatically, basead on packege version in package.json.
RUN npm install
RUN npm install chromedriver --chromedriver_version=LATEST
RUN npm list --depth=0


RUN chmod +x /app/regressionTest.sh
RUN sed -i -e 's/\r$//' /app/regressionTest.sh

ENTRYPOINT ["/bin/bash", "-c", "/app/regressionTest.sh"]