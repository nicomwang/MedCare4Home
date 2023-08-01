# MedCare4Home

Managing healthcare data is essential for everyone, but it can be challenging and time-consuming. Although several Web and mobile applications existed for personal medical record management, there were few home-based, family-oriented solutions. In this project, we proposed to design an easy-to-use solution for a family. 

We designed and implemented an innovative Home Medical Care System, MedCare4Home, by deploying a MERN stack Web application to a minicomputer, Raspberry Pi 4, and enabling a local network to connect different devices at home. The users can access the Web application using either a desktop, tablet, mobile phone, or simply a 7-inch LCD touchscreen. 

MedCare4Home not only allows the users to keep track of appointments and organize healthcare documents, but it can also help set up medication reminders and provide a self-report interface for symptom collection for family members easily and securely in one place. The final prototype system demonstrated that we achieved the original goal and beyond. We expect to extend our current hardware design and software development to support physiological data collection with external sensors in the future.


## File Structure
    .
    ├── config                 # Configuration files
    │   ├── db.js              # Connect to db
    │   ├── default.json       # Holds mongoURI and jwtSecret 
    ├── front-end              # Holds the client application
    │   ├── public             # This holds all of our static files
    │   ├── src                # Source
    |   │   ├── assets         # This folder holds assets such as images, docs, and fonts
    |   │   ├── components     # This folder holds all of the different components that will make up our views
    |   │   ├── views          # These represent a unique page on the website i.e. Home or About
    |   │   ├── HMC            # Main components for this app 
    |   │   ├── index.js       # This is what renders all of our browser routes and different views
    ├── middleware             # Middlewares used
    ├── models                 # This holds all of our data models
    ├── routes/api             # Backend APIs
    ├── package-lock.json      # An auto-generated list of each dependency listed in package.json
    ├── package.json           # A file contains various metadata related to the project 
    ├── .gitignore             # Tells git which files to ignore
    └── README.md              # This file!
 
## Setup the environment 

Follow these steps to set up your Raspberry Pi and the environment needed for this project
1. [Install 64bit Raspbian on your Raspberry Pi 3 or 4](https://jamesachambers.com/where-to-get-the-64-bit-raspberry-pi-os-image-for-pi-4-400/)
    - Go to https://downloads.raspberrypi.org/raspios_arm64/images/ for all the beta 64 bit Raspbian images released
    - Download and unzip the latest image file (for example: 2021-10-30-raspios-bullseye-arm64.zip)
    - Open Raspberry Pi Imager, choose `Use Custom` for Operating System and write image to your SD card
9. Allow ports
    - Install ufw
        - `sudo apt install ufw`
    - Enable ufw
        - `sudo ufw enable`
    - Open port 22, 3000, 5000, and 27017
        - `sudo ufw allow PORT_NUMBER`
2. [Install MongoDB](https://www.mongodb.com/developer/how-to/mongodb-on-raspberry-pi/)
    - DO NOT RUN `apt install mongodb` on your Raspberry Pi!!!
    - First run:
        - `sudo apt update`
        - `sudo apt upgrade`
    - Install MongoDB:
        - `wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -`
        - `echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list`
        - `sudo apt-get update`
        - `sudo apt-get install -y mongodb-org`
    - Run MongoDB:
        - `sudo systemctl daemon-reload`
        - `sudo systemctl enable mongod`
        - `sudo systemctl start mongod`
    - Check to see if the service is running correctly:
        - `sudo systemctl status mongod`
    - Mongodb configuration for remote access
        -  Open the configuration file: `sudo nano /etc/mongod.conf `
        -  change this line:  `bind_ip = 127.0.0.1` to `bind_ip = 0.0.0.0`
        -  Restart MongoDB: `sudo systemctl restart mongod`
        -  Verify connection: `mongo YOUR_RASPBERRY_PI_IP`  
5. [Install npm/nodejs](https://www.instructables.com/Install-Nodejs-and-Npm-on-Raspberry-Pi/)
    - Go to node.js download page and check right click on the version of ARM that you need and choose Copy Link address. This is an example for Raspberry Pi 4 (ARMv8)
        - `wget https://nodejs.org/dist/v16.13.2/node-v16.13.2-linux-arm64.tar.gz`
    - Extact the archive
        -  `tar -xzf node-v16.13.2-linux-arm64.tar.gz`
    - Copy Node to /usr/local
        - `cd node-v16.13.2-linux-arm64/`
        - `sudo cp -R * /usr/local/`  
    - Verify the installation
        - `node -v`
        - `npm -v`
7. [Install Git](https://linuxize.com/post/how-to-install-git-on-raspberry-pi/)
    - First run:
        - `sudo apt update`
        - `sudo apt install git`
    - Verify the installation:
        -  `git --version`
    - Configure git
        - `git config --global user.name "Your Name"`
        - `git config --global user.email "youremail@yourdomain.com"`
8. Set up resource files
    - Clone this repo
        - `git clone https://github.com/yennle/Home-Medical-Care.git`
10. Optional: [Connect to the 7 inch Raspberry Pi Display](https://community.element14.com/products/raspberry-pi/w/documents/888/raspberry-pi-7-touchscreen-display#installI)

## How to run the project

Since this project holds both the client application and the server application，node modules are in two different places. 
1. Install dependencies
   - run `npm install` from the project root.
   - run `cd front-end` then run `npm install` again

2. Change `localhost` to your Raspberry Pi IP address in the following files if you are running the server on Pi
   - Must change:
        - /config/default.json: mongoURI (line 2)
        - /front-end/src/utils/api.js: baseURL (line 6)
   - Future work:
        - /front-end/src/HMC/ReportSymptom/AddSymptom.js (line 107)
        - /front-end/src/HMC/ReportSymptom/AddFile.js (line 85)
4. In the project directory, you can
   - Run `npm run-script dev` or `npm run dev` for both the client app and the server app in development mode.<br>
        - Open [http://localhost:3000](http://localhost:5000) to view the client in the browser.
   - Run `npm run-script client` or `npm run client` for just the client app in development mode.<br>
        - Open [http://localhost:3000](http://localhost:5000) to view the client in the browser.
   - Run `npm run-script server` or `npm run server` for just the server in development mode.<br>

## Lisence
[The MIT License](https://opensource.org/license/mit/)
