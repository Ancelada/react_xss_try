FROM node:20.9.0

ENV DEBIAN_FRONTEND noninteractive
ENV LANG ru_RU.UTF-8
ENV LANGUAGE ru_RU
ENV LC_ALL ru_RU.UTF-8

RUN apt-get update && apt install -y \
    bash \
    git \
    xdg-utils

# make sure that locales package is available
RUN apt-get install --reinstall -y locales
# uncomment chosen locale to enable it's generation
RUN sed -i 's/# ru_RU.UTF-8 UTF-8/ru_RU.UTF-8 UTF-8/' /etc/locale.gen
# generate chosen locale
RUN locale-gen ru_RU.UTF-8
# set system-wide locale settings

ENV LANG ru_RU.UTF-8
ENV LANGUAGE ru_RU
ENV LC_ALL ru_RU.UTF-8
# verify modified configuration
RUN dpkg-reconfigure --frontend noninteractive locales
