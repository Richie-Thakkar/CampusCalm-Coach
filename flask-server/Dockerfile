# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG PYTHON_VERSION=3.9.7
FROM python:${PYTHON_VERSION}-slim as base

# Prevents Python from writing pyc files.
ENV PYTHONDONTWRITEBYTECODE=1

# Keeps Python from buffering stdout and stderr to avoid situations where
# the application crashes without emitting any logs due to buffering.
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Create a non-privileged user that the app will run under.
# See https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#user
ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser
RUN apt-get update
RUN apt-get install python3-dev default-libmysqlclient-dev build-essential -y
#RUN apt-get install ffmpeg libsm6 libxext6 --fix-missing -y
# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.cache/pip to speed up subsequent builds.
# Leverage a bind mount to requirements.txt to avoid having to copy them into
# into this layer.
# RUN --mount=type=cache,target=/root/.cache/pip \
  #  --mount=type=bind,source=requirements.txt,target=requirements.txt \
#    python -m pip install -r requirements.txt
RUN python -m pip install Flask==2.3.3
RUN python -m pip install Flask-Bcrypt
RUN python -m pip install Flask-JWT
RUN python -m pip install Flask-JWT-Extended
RUN python -m pip install Flask-Login
RUN python -m pip install Flask-Migrate
RUN python -m pip install Flask-MySQLdb
RUN python -m pip install Flask-Session
RUN python -m pip install gunicorn
RUN python -m pip install keras
RUN python -m pip install numpy
RUN python -m pip install passlib
RUN python -m pip install Pillow
RUN python -m pip install PyJWT
RUN python -m pip install PyYAML
RUN python -m pip install tensorflow
RUN python -m pip install tensorflow-intel
RUN python -m pip install pybase64
RUN python -m pip install pickle5
RUN python -m pip install flask-cors
RUN python -m pip install openai
RUN python -m pip install scikit-learn==1.2.2
RUN python -m pip install opencv-python-headless

# Switch to the non-privileged user to run the application.
# USER appuser

# Copy the source code into the container.
COPY . .

# Expose the port that the application listens on.
EXPOSE 5000

# Run the application.
CMD python3 server.py
