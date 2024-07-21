FROM node:latest


RUN cd cryptpad \
   && npm install \
   && npm install -g bower \
   && bower install --allow-root

RUN groupadd cryptpad -g 4001
RUN useradd cryptpad -u 4001 -g 4001 -d /cryptpad

# Install curl for healthcheck
# Install git, rdfind and unzip for install-onlyoffice.sh
RUN apt-get update && apt-get install --no-install-recommends -y \
    curl ca-certificates git rdfind unzip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy cryptpad with installed modules
COPY --from=build --chown=cryptpad /cryptpad /cryptpad
USER cryptpad

# Copy docker-entrypoint.sh script
COPY --chown=cryptpad docker-entrypoint.sh /cryptpad/docker-entrypoint.sh

# Set workdir to cryptpad
WORKDIR /cryptpad
# Create directories
RUN mkdir blob block customize data datastore

# Volumes for data persistence
VOLUME /cryptpad/blob
VOLUME /cryptpad/block
VOLUME /cryptpad/customize
VOLUME /cryptpad/data
VOLUME /cryptpad/datastore

EXPOSE 3000 3003

ENTRYPOINT ["node"]
CMD ["npm", "start"]
