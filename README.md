# SDLC-Password-Manager
A password manager application

To run: Install node.js, npm, meteor, mongo, react, semantic ui, bcrypt
meteor npm run start
	
Sign in: create new user or sign in as admin. user data found in config/setting.development.json


Assignment 3 3/21/21 - 4/4/21

What is complete so far:
- user interface design and implementation
- password manager functionality
- outline of implementation
- listing of tools

What is pending:
- porting password manager functionality
- fixing security vulnerability in the StuffsCollection 

Worked on so far:
- Joe: user interface design an implementation
- Simplicio: password manager functionality

Progress:
- design webapp interface
- implemented user/admin profile features
- implemented collections of user data with mongoDB
- encrypt backend passwords with bcrypt
- implemented add and list features for mongo collections

Link: https://github.com/sjavella/SDLC-Password-Manager

What is left to do?
- Port main.py to AddStuff.jsx
- Succesfully pass data from encryptedInsert() to main.py and back

Roles & Responsibilities:
- New completions: Working webapp interface
- Current: porting password manager code to interface
- Next: securing data displayed to the front end and testing

Assignment 2

What is complete so far:
- outline of implementation
- listing of tools

What is pending:
- test enviroment

Worked on so far:
Joe: security, privacy and design requirements, depreciated functions research

 (02/21/2021 - 03/28/2021)

Progress:
 - Implemented functionality of password manager
     - Ability to create an entry with a username and a randomly generated password along with it
     - Ability to locate existing entries by their username and website

Link: https://github.com/sjavella/SDLC-Password-Manager

Pending:
 - What is left to do?
     - Possibly try to transition this program into a functioning webapp with a nicer layout and user-interface.

Roles and Responsibilities:
 - New completions: New functionalities
 - Current: Porting to a webapp
 - Next: User-interface / layout



Assignment 1

Project: Secure Development Life Cycle
Assignment 1: Requirements and Design

Team Name: Aloha Security
Members: Joe Palma, Simplicio Javellana-Samonte, Andrew Yagin
Languages and Tools used: React, Javascript, Python

Web Based Password Manager
A non-commercial experiment in authentication, authorization and cryptography. The set of users is to be strictly defined by an Administrator.

Requirements
All Security, Design and Privacy requirements will be composed, evaluated and edited via Github pages. The pages will consist of three categories: incomplete, completed, and tested requirements. Tasks will be worked on consecutively and ordered by priority.

Security Requirements
Were designed with a focus on Confidentiality and Integrity.

Critical
Strong Authentication Process: The system must use a verifiably secure open source authentication tool, to authenticate users trying to login
Authorization: The system must have permissions such that the only user able to view a users sensitive data is the user him/herself. The system must have two levels of permissions; user and administrator. Where users can only view their sensitive data, admins can view all users insensitive data
Encryption: All sensitive data must be encrypted by a verifiably secure open source algorithm whose encryption key is properly stored and managed

Important
Identification: The system must provide an initial layer of identification, preferably through a login process to allow users to identify themselves. Must use prepared statements and be safe from injection attacks
Audits: The system is not commercial and should therefore be subject to user audits by Admins
Deletion: The system must securely delete sensitive data

Moderate
Decryption: The system should only allow for the decryption of one password at a time only
Key Derivation: (if we have time in the semester) provide a strong encryption key derivation function to essentially encrypt our encryption key

Privacy Requirements
Were designed with a focus on user trust.

Critical
User Data: Must be protected from other users via the authentication procedure outlined in the security requirements
Sensitive Data: Must be protected from users and admins via the encryption procedure outlined in the security requirements

Important
Dev Control of User Information: reduce the amount of third party components and dependencies used in implementation such that user data is exposed to a minimal number of processors
User Control of User Information: Users must be in full control of their data, with the ability to delete it at any time

Moderate
Notice and Consent: a static text message displayed on the landing page will inform users of the experimental nature of this program and state that further use indicates a users consent for the program to access their data
Data Minimization: Use of this program requires minimum data entry so as to reduce the Attack Surface Area

Quality Gates/Bug Bars

Critical Gates/Bars
Account Privileges: Only administrative accounts are allowed administrative privileges, no user account will have access or higher account privileges than others.
Data protection: User’s accounts are protected and encrypted as to enforce the protection of their account passwords.
Proper data management: User data is stored in a way that the sensitive information associated with their accounts are securely stored and made only accessible to the user and/or an administrator.

Important Gates/Bars
Little to no notification and/or authorization: Users will be notified of the early development of the program and should not be held entirely reliable and secure as the application is a current work in progress.
Data Protection: User data will not be accessible by any administrative accounts.

Moderate Gates/Bars
Privacy Protection: User account data will not be shared with any third party applications or organizations.
User Controls: Users are able to delete any password or account information that they wish. Users should not be able to copy-paste passwords or login information without proper authorization.

Risk Assessment Plan for Security and Privacy

Approach:
Based on our password management program, we will be taking the SDL Privacy Questionnaire template as reference to assess the components of our webapp, and design privacy reviews and analysis.

Initial Assessment
Determining the Privacy Impact Rating

Stores personally identifiable information on the user’s computer or transfers it from the user’s computer. (Rating P1)

Performing a Detailed Privacy Analysis for P1 scenarios
Describe the PII you store or data you transfer:
Essentially, the PII that is being stored and transferred is account usernames, emails, and passwords that are associated with those usernames.
Describe your compelling user value proposition and business justification:
As most of our daily activities and use of the digital world expands, the hassle of creating and remembering unique, well-made passwords is going to be very much present. The password manager allows people to not have to worry about forgetting their many passwords.
Describe any software you install or changes you make to file types, home page, or search page:
No software is required to be installed, however you must access a web browser.
Describe how users will access your public disclosure:
Because it is going to be a web application, the password manager will be accessed through a web browser program, and with internet access, will be making changes to the home and search page of the web browser to access the webapp.
Describe how you will prevent unauthorized access to PII:
The password manager will protect your passwords with strong encryption (AES-256, specifically), even while it's stored in the cloud.

Design
Design Requirements
Were designed with a focus on Availability and ease for users to maintain secure use of the app.

Critical
Minimal Page Design: Landing/login page, saved passwords page, add password page. These three front end pages will reduce the Attack Surface Area
Secure Back End: The database design and data transfer protocols must use verifiably secure open source database tools with encryption capability per security requirements

Important
Encrypt Button: allow the user to add a new password without automatically encrypting their data
Decrypt Button: gives the user the option to view their decrypted password. Only decrypts one password at a time per security requirements

Moderate
Delete Button: gives the user the option to delete a password using a secure deletion protocol per security requirements
No Copy/Paste of Sensitive Data: Copy and paste functions must be restricted from input fields for sensitive information

Attack Surface Analysis & Reduction

Administrators
Can create and delete user accounts
Has no access to user’s sensitive data, they do not have any ability to copy and paste user data from input fields
Is able to grant administrative privileges to other users, making them an administrative account

Users
Can add new login credentials for an account they wish to be managed
Can encrypt their login information with an encrypt button
Can decrypt their login information with a decrypt button
Minimal page design
Minimal data entry required

Potential Attack Surfaces
	The most critical attack surface of the password manager is access to an account in the service. Should an administrative account be compromised or a false account be given administrative privileges, the attacker would then be capable of deleting all existing accounts. Access to an admin account could be done through any means of obtaining the login credentials of an administrator. On the user’s side, they too would be vulnerable to similar attacks wherein, their data could then be decrypted and saved by the hacker. Such an action would then compromise the user’s login information to their accounts. The list of potential attacks is numerous as they include:
Phishing
Access to the web browser’s cookies
Improper storage of the master password used to log into the service
Weak encryption
Interception of data between the web browser and database
SQL Injections
Denial of Service (DDoS) attacks

Threat Modeling

Essentially, this is the model of what the password manager is going to look like. As mentioned previously, a lot of the threats will be stemming from the interaction between users and the web server host (a browser) and how they may be prone to things on the web that may steal sensitive information.

This model is still pending in terms of where the threats are identified, but there are many to be found across the model from user interaction to cloud storage that may be compromised where all the account credentials are stored. These flows of information can easily be intercepted by a hacker. For example, the flow of the web server hosting the password manager webapp can easily be intercepted and in result lose webapp functionality for the users. These users will then be unable to access their passwords and credentials.
