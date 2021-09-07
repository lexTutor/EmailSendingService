# EmailSendingService
This is an application that can help send emails via sendgrid. The use case of this api is for basic testing purposes where security is not the ultimate concern. 
# Getting Started with Create React App

This project was executed with the node-express framework.

## Available Scripts

In the project directory, you can run:

### `npm start` or `npm run dev`

Runs the app in the development mode.\
Using the specified [port](http://localhost:3002) you can access the api endpoints.

The server will reload if you make and save edits.

## API Documentation

You can find the API documentation [here](https://docs.google.com/document/d/10lf98-9EScZv5rGQJZF_kQPXYim1Os3k2tpzrMAKkr4/edit?usp=sharing).

### Policy

PS: This app is configured to send mails for you instead of having to integrate sendgrid into your application. This app by no means stores your SendGrid API Key and the owner and/or contributors cannot be held accountable for any loss of information or breach of security.


### How to contribute
You can contribute to this project by
* Making a fork of this repository.
* From the fork, click Clone or download to create a copy on your computer.
* Optional: Add the base repository as a remote "upstream," which is helpful if you want to pull down new changes from the base repository into your fork.
* Create a pull request from the branch on your fork into the master branch of the base repository.

# Valid contributions include the following
1) Code optimization pertaining to speed and functionality
2) Tests
3) Email templates that conform to the following standards:
    * Must be a single file of .html extension
    * All styles must be written in the `<style></style>` tag.
    * Templates should not contain javascript
    * Must have two sections for replaceable content dentoted by `[header]` & `[body]` in that order.
  
NB: All contributions must complete the requirements of the pull request template in order to be considered.

Merged updates will be automatically updated to the cloud.

