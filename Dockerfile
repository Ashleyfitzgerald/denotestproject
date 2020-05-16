FROM hayd/debian-deno:1.0.0

EXPOSE 1993
# The port that your application listens to.

WORKDIR /app

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in main.ts.
COPY deps.ts .

# These steps will be re-run upon each file change in your working directory:
ADD . .

RUN deno cache --unstable main.ts

# Compile the main app so that it doesn't need to be compiled each startup/entry.
CMD ["run", "--allow-all", "--unstable", "main.ts"]

