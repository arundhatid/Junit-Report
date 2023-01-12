FROM docker/whalesay:latest
RUN mkdir node
COPY . ./node
WORKDIR C:\ProgramData\Microsoft\Windows\Start Menu
RUN npm install
EXPOSE 8081
CMD node server_init.js