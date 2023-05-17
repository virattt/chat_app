# LLM-Powered Chat Application
This repository contains all of the starter code needed to run an LLM-powered chat app on your local machine:
1. Django backend
2. React TypeScript frontend
3. LangChain Agents and LLMs

## Getting Started 🚀
To run the chat app, you need to:

1. Clone this GitHub repo
2. Run the backend server
3. Run the frontend app

### 1. Clone this GitHub repo 📁
To clone this GitHub repo, open up your Terminal (MacOS) or Bash terminal (Windows) and navigate to wherever you want to save this repo on your local machine.  Then, run: 

```
git clone https://github.com/virattt/chat_app.git
```

Make sure that you have git installed ([instructions](https://github.com/git-guides/install-git)).

### 2. Run the backend server 🖥️
Once you have this `chat_app` project cloned locally, navigate to the `backend` directory:

```
cd ~/path_to/chat_app/backend
```

Create and activate a virtual environment:

```
python3 -m venv myenv
```

For MacOS/Linux:
```
source myenv/bin/activate
```

For Windows:
```
myenv\Scripts\activate
```

Install the necessary libraries:
```
pip install -r requirements.txt
```

Make sure that you have Redis installed. You can find instructions [here](https://redis.io/docs/getting-started/installation/).
Once installed, run redis:
```
redis-server
```

Run the backend server:
```
daphne project.asgi:application
```

If your backend server is running correctly, you should see something like this:
```
"WSCONNECTING /ws/chat/" - -
"WSCONNECT /ws/chat/" - -
```

**Important**: In order to run the LLM, set your Open AI API key [here](https://github.com/virattt/chat_app/blob/main/backend/.env#L1).

### 3. Run the frontend app 💻
In a new Terminal window (or tab), navigate to the `frontend` directory:
```
cd ~/path_to/chat_app/frontend
```

Make sure that you have Node and npm installed (MacOS [instructions](https://nodejs.org/en/download/package-manager#macos) and Windows [instructions](https://nodejs.org/en/download/package-manager#windows-1))

Install the necessary packages:
```
npm install
```

Run the frontend app:
```
npm start
```

If successful, your browser should open and navigate to http://localhost:3000/.  The chat app should load automatically.

## The Chat App UX 🤖
_As of May 17, 2023_
<img width="1680" alt="Screen Shot 2023-05-17 at 4 52 27 PM" src="https://github.com/virattt/chat_app/assets/901795/2a68d8dd-5d81-4b6f-b815-7e2c22114ec2">

## Troubleshooting ⚠️
If you encounter any issues, send me a message on [Twitter](https://twitter.com/virat)!
