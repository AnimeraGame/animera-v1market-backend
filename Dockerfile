FROM node:14.18.2-buster-slim
RUN apt update && apt install git python3 build-essential libudev-dev libusb-1.0-0-dev libc6 libc6-dev libc-bin -y
WORKDIR /usr/src/app/
COPY . .
RUN npm install
EXPOSE 4444
CMD ["npm","run","start"]
