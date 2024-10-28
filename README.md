# PatientManager

**PatientManager** is a web application that allows users to create and list patient records seamlessly. Built on a Laravel backend and a React frontend, this app provides a clean, efficient solution for managing patient information.

## Features

- **Create Patient Records**: Easily add new patients to the system.
- **List Patients**: View a list of all patients.

## Tech Stack

- **Backend**: Laravel
- **Frontend**: React
- **Database**: MySQL
- **File Storage**: Minio
- **Containerization**: Docker Compose

## Getting Started

### Prerequisites

- **Docker**: Ensure Docker is installed on your system.
- **Docker Compose**: Required to spin up the multi-container application.

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/tommympg00/PatientManager.git
   cd PatientManager
   ```

2. **Set up the environment**:

   Copy the /backend/.env.example & /frontend/.env.example files on to their respective /backend/.env and /frontend/.env

3. **Start the Application**:

   Run the following command to start both the frontend and backend services:

   ```bash
   docker-compose up
   ```

   - `docker-compose` will pull the necessary images, build the containers, and start the app.

4. **Manually set up minio storage bucket (will be automatic on a future iteration)**:

   Go to the minio [console](http://localhost:9090) and log in with the ./backend/env credentials `MINIO_ROOT_USER`, `MINIO_ROOT_PASSWORD`. There create the bucket with the same name that we have on the backend/.env `MINIO_BUCKET`.

   This is not optimal but I did not have the time to create the entrypoint script.

5. **Seed the Database (Optional)**:

   Once the containers are running, seed the database to have dummy data

   ```bash
   docker-compose exec backend php artisan db:seed
   ```

6. **Access the Application**:

   - **Frontend**: Open `http://localhost:3000` in your browser.
   - **Backend API**: Access the API at `http://localhost:8000`.

## Usage

### Creating a Patient

- Use the form on the frontend to enter patient details and submit.

![alt text](/readme-assets/patient-form.png)

### Listing Patients

- View the patient list to see all registered patients.

![alt text](/readme-assets/patients.png)

## Docker Overview

- **frontend-1**: Runs the React frontend in a container.
- **backend-1**: Runs the Laravel backend in a container.
- **db**: Runs the `mysql` database.
- **minio-1**: Runs the minio file storage system.

## Additional Commands

- **Stop Containers**:

  ```bash
  docker-compose down
  ```

- **Run Artisan Commands**:

  You can execute any Laravel Artisan command in the backend container:

  ```bash
  docker-compose exec backend php artisan <command>
  ```

## Mailtrap

The application is set up to run mailtrap in a development environment. The emails sent can be checked on mailtrap [platform](https://mailtrap.io):

![alt text](/readme-assets/mailtrap.png)

## Future Improvements

- Better health check of the application. We use laravel's built in check but maybe add customized checks with `spatie/laravel-health`. Here is a [link](https://medium.com/@stdejan/health-check-in-laravel-11-6adb143b67c6) with more information on the subject.
- Enhanced validations in the controllers. Being raised by the Js ecosystem, I really dig performing validations with zod on controller level. For this project I used Laravel built in functions but with more time in my hands, I would've used a more robust approach.
- Redis Cache, at the moment we are using `mysql` database to store the jobs in the queue. It could be more performant to use a Cache instead.
- Phone number storage, I would introduce a migration to store the phone number separated by country code in one column and the phone number on the other. This could be more effective if on a given day, we want to fetch all the patients that come from the country code Y or X.
- Github actions and pre commit hooks to ensure code which is sent to the remote repository is reliable and reduce human error.
- More linters backend side.
- Use of a backend logger to be able to closely monitor the application.
