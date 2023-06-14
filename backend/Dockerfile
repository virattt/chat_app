# Use an official Python runtime as a parent image
FROM python:3.9

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set working directory in the container
WORKDIR /backend

# Copy the current directory contents into the container at /backend
ADD . /backend/

# Install any needed packages specified in requirements.txt
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Run migrations
RUN python manage.py migrate

# Run the command to start uWSGI
CMD daphne project.asgi:application