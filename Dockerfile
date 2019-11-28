FROM node
RUN apt-get -y update

RUN git clone https://github.com/Dirkadin/SEM-Project3-fake-user-ordering-service.git

WORKDIR SEM-Project3-fake-user-ordering-service

RUN npm install

CMD ["npm", "start"]
