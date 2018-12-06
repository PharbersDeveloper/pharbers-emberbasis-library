FROM alexqian/ember_cli

MAINTAINER Alex Qian

WORKDIR /app

RUN git clone https://github.com/PharbersDeveloper/pharbers-emberbasis-library.git

RUN ls

WORKDIR pharbers-emberbasis-library

RUN yarn && \
    ember b

EXPOSE 4200

ENTRYPOINT ["ember", "s"]
