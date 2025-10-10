FROM node:24-alpine

ARG ASSET_PREFIX
ARG APP_COMMIT
ARG APP_VERSION

ENV APP_COMMIT $APP_COMMIT
ENV APP_VERSION $APP_VERSION
ENV ASSET_PREFIX $ASSET_PREFIX

ENV APP_UID=9999
ENV APP_GID=9999

RUN apk update && apk upgrade --no-cache && apk --no-cache add shadow
RUN groupmod -g $APP_GID node
RUN usermod -u $APP_UID -g $APP_GID node

RUN mkdir -p /usr/src
RUN chown -R node:node /usr/src
USER node
WORKDIR /usr/src

COPY --chown=node:node . /usr/src

VOLUME [ "/usr/src/public/static/dms_user_assets" ]

RUN npm i
RUN NEXT_TELEMETRY_DISABLED=1 npm run build

EXPOSE 3000
CMD npm start