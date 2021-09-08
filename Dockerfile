FROM node:14-bullseye

RUN apt-get update && \
    apt-get -y upgrade && \
    apt-get -y install busybox-static
ENV TZ Asia/Tokyo

RUN echo "${TZ}" > /etc/timezone && dpkg-reconfigure -f noninteractive tzdata

RUN mkdir -p /srv
COPY . /srv/
WORKDIR /srv
RUN npm install

RUN mkdir -p /var/spool/cron/crontabs && \
    echo '*/10 1-23 * * * cd /srv && ./cron-task.sh' >> /var/spool/cron/crontabs/root

CMD ["./docker-task.sh"]
