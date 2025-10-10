@echo off
echo Deploying PGConnect Backend to Google Cloud Run...

set PROJECT_ID=your-project-id
set SERVICE_NAME=pgconnect-backend
set REGION=us-central1

echo Building and deploying...
gcloud run deploy %SERVICE_NAME% ^
  --source . ^
  --platform managed ^
  --region %REGION% ^
  --allow-unauthenticated ^
  --port 8080 ^
  --memory 512Mi ^
  --cpu 1 ^
  --max-instances 10

echo Deployment complete!
echo Your backend URL will be shown above.
pause