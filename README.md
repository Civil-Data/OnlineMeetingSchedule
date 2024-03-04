# OnlineMeetingSchedule

[![Deploy meeting microservice](https://github.com/JoelScarinius/MeetingScheduler/actions/workflows/meeting.yaml/badge.svg)](https://github.com/JoelScarinius/MeetingScheduler/actions/workflows/meeting.yaml)
[![Deploy user microservice](https://github.com/JoelScarinius/MeetingScheduler/actions/workflows/user.yaml/badge.svg)](https://github.com/JoelScarinius/MeetingScheduler/actions/workflows/user.yaml)
[![Deploy reactui microservice](https://github.com/JoelScarinius/MeetingScheduler/actions/workflows/reactui.yaml/badge.svg)](https://github.com/JoelScarinius/MeetingScheduler/actions/workflows/reactui.yaml)
[![Deploy nginx microservice](https://github.com/JoelScarinius/MeetingScheduler/actions/workflows/nginx.yaml/badge.svg)](https://github.com/JoelScarinius/MeetingScheduler/actions/workflows/nginx.yaml)

This is an OnlineMeetingSchedule tool inspired by Calendly.
It is an easy way to book meetings, invite people and create event.
Participants can vote for a meeting and allowing for collaborative scheduling that takes everyone's availability into account.

## Frameworks

- Nodejs
- React
- Express

## Database

- MongoDB/Mongoose

## How to run

Follow these steps to set up and run the OnlineMeetingSchedule project on your local machine.

**1. Clone the project:**

`git clone https://github.com/Civil-Data/OnlineMeetingSchedule.git`

**2. Configure the backend:**

- Go to the `backend` directory.
- Create a new file called `.env`.
- Add the following content to your `.env` file:

```javascript
TOKEN_KEY ="thisisasecret"
DB_USER = "matildaronder"
DB_PASSWORD = "adlitamrendor123"
PORT = "5000"
CLIENT_PORT="3000"
```

**3. Start database:**

- Go to the `backend` directory.
- Run:

`npm install`

`npm run dev`

**4. Set up the Frontend:**

- Go to the `frontend` directory.

**5. Install Dependencies:**

- Run the following command to install all necessary modules and packages:

`npm install`

**6. Start the Application:**

- Run the following command to start the app in development mode:

`npm start`

This will launch the application in your default web browser at [http://localhost:3000](http://localhost:3000).

**7. Sign Up and Use the Online Meeting App:**

Register an account to use our Online Meeting App.

Now, you're ready to explore the OnlineMeetingSchedule project locally!

## Deployment

**Terraform:**

```Terraform
terraform init
terraform apply -auto-approve
terraform destroy -auto-approve
```

- Go to the `root` directory and run the following commands:

```markdown  
  Note: The following script is a powershell script that will get the output of the backend configuration and store it in APP_NAME. Then, it will use Azure CLI to get the login server of the Azure Container Registry (ACR) associated with APP_NAME. It will get the username and password for the ACR. It will use Azure CLI to get the name of the first storage account in the list and get the access key for the storage account associated with APP_NAME. It will copy the .kube\config file to a backup and delete the .kube\config file. It will get AKS credentials and the current context. It will read the .kube\config file, convert it to base64, and store the output in KUBE_CONFIG. Finally, it will set GitHub secrets. It will get the public IP address of the load balancer and the image of the user deployment. It will copy the .kube\config file from the backup and set the current context to minikube.
```

```powershell
# Use Terraform to get the output of the backend configuration and store it in APP_NAME
$APP_NAME = terraform -chdir=backend/terraform output
# Split the output to get the actual APP_NAME
$APP_NAME = $APP_NAME.Split('"')[1]

# Print the APP_NAME
Write-Host "APP_NAME: $APP_NAME"

# Use Azure CLI to get the login server of the Azure Container Registry (ACR) associated with APP_NAME
$CONTAINER_REGISTRY_LOGIN_SERVER = az acr show -n $APP_NAME --query loginServer -o tsv
# Get the username for the ACR
$CONTAINER_REGISTRY_USERNAME = az acr credential show -n $APP_NAME --query username -o tsv
# Get the password for the ACR
$CONTAINER_REGISTRY_PASSWORD = az acr credential show -n $APP_NAME --query passwords[0].value -o tsv

# Print the ACR login server, username, and password
Write-Host "CONTAINER_REGISTRY_LOGIN_SERVER: $CONTAINER_REGISTRY_LOGIN_SERVER"
Write-Host "CONTAINER_REGISTRY_USERNAME: $CONTAINER_REGISTRY_USERNAME"
Write-Host "CONTAINER_REGISTRY_PASSWORD: $CONTAINER_REGISTRY_PASSWORD"

# Use Azure CLI to get the name of the first storage account in the list
# $STORAGE_ACCOUNT_NAME = az storage account list --query [0].name -o tsv
# Get the access key for the storage account associated with APP_NAME
# $STORAGE_ACCESS_KEY = az storage account keys list --account-name $APP_NAME --resource-group $APP_NAME --query [0].value -o tsv

# Print the storage account name and access key
# Write-Host "STORAGE_ACCOUNT_NAME: $STORAGE_ACCOUNT_NAME"
# Write-Host "STORAGE_ACCESS_KEY: $STORAGE_ACCESS_KEY"

# Copy the .kube\config file to a backup
Copy-Item "$env:USERPROFILE\.kube\config" "$env:USERPROFILE\.kube\config.bak"

# Delete the .kube\config file
Remove-Item "$env:USERPROFILE\.kube\config"

# Get AKS credentials
az aks get-credentials --name $APP_NAME --resource-group $APP_NAME

# Get the current context
kubectl config current-context

# Read the .kube\config file, convert it to base64, and store the output in KUBE_CONFIG
$KUBE_CONFIG = [Convert]::ToBase64String([IO.File]::ReadAllBytes("$env:USERPROFILE\.kube\config"))

# Print the value of KUBE_CONFIG
Write-Host "KUBE_CONFIG:"
Write-Host $KUBE_CONFIG

# Set GitHub secrets
gh secret set CONTAINER_REGISTRY_LOGIN_SERVER --body $CONTAINER_REGISTRY_LOGIN_SERVER
gh secret set CONTAINER_REGISTRY_USERNAME --body $CONTAINER_REGISTRY_USERNAME
gh secret set CONTAINER_REGISTRY_PASSWORD --body $CONTAINER_REGISTRY_PASSWORD
# gh secret set STORAGE_ACCOUNT_NAME --body $STORAGE_ACCOUNT_NAME
# gh secret set STORAGE_ACCESS_KEY --body $STORAGE_ACCESS_KEY
gh secret set KUBE_CONFIG --body $KUBE_CONFIG

# Print the GitHub secrets
gh secret list
gh workflow run "Deploy meeting microservice"
gh workflow run "Deploy user microservice"
gh workflow run "Deploy reactui microservice"
gh workflow run "Deploy nginx microservice"
gh workflow run "Deploy gateway microservice"
```


# Get the public IP address of the load balancer
$LOAD_BALANCER_PUBLIC_IP = kubectl get service frontend -o jsonpath='{.status.loadBalancer.ingress[0].ip}'
# Print the value of LOAD_BALANCER_PUBLIC_IP
Write-Host "LOAD_BALANCER_PUBLIC_IP: $LOAD_BALANCER_PUBLIC_IP"

# Get the public IP address of the load balancer
$LOAD_BALANCER_PUBLIC_IP = kubectl get service gateway -o jsonpath='{.status.loadBalancer.ingress[0].ip}'
# Print the value of LOAD_BALANCER_PUBLIC_IP
Write-Host "LOAD_BALANCER_PUBLIC_IP: $LOAD_BALANCER_PUBLIC_IP"

# get the image of the user deployment
kubectl get deployment user -o=jsonpath='{.spec.template.spec.containers[0].image}'

# copy the .kube\config file from the backup
Copy-Item -Path $env:USERPROFILE\.kube\config.bak -Destination $env:USERPROFILE\.kube\config

# Set the current context to minikube
kubectl config use-context minikube
kubectl config current-context
```

**Github Actions:**

- Go to the `root` directory and run the following commands:

```github
gh workflow run "Deploy meeting microservice"
gh workflow run "Deploy user microservice"
gh workflow run "Deploy reactui microservice"
gh workflow run "Deploy nginx microservice"
gh workflow run "Deploy gateway microservice"
```

```kubectl
kubectl describe pod 
kubectl logs 
```
