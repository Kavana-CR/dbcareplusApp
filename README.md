<h2> DBCarePlus (Application Development) </h2>
<p> Group size: 5 <br><br>
DBCare Plus is a health care management app that helps diabetics manage their condition better. There are four main features - “Food and Beverages”, “Log Blood Sugar”, “Reminders” and “Progress Report”. </p> <br>
<p> <b> Role 1: Assisted in coming up with the App Workflow. </b> <br>
<img src="https://github.com/Kavana-CR/DBCarePlus-App-Development/blob/master/AppFlow.PNG"> </p> <br>
<p> <b> Role 2: Assisted in developing the front end of the application using ionic framework. </b> <br>
http://dbcarered.s3-website-us-west-2.amazonaws.com/#/login </p> <br> 
<p> <b> Role 3: Assisted in integrating "Login" and "Sign Up" using firebase </b> <br>
The figure below shows the user list in firebase console as a result of the tests done for Sign Up and Login. <br>
<img src="https://github.com/Kavana-CR/DBCarePlus-App-Development/blob/master/firebase-userslist.png"> </p>
<p> <b> Role 4: Assisted in Validating "Login" and "Sign Up". </b> <br>
Figure 1 shows the validation process for entering an invalid email type and not meeting the min length for password. <br>
Figure 2 shows the error message on the event if the user tries to sign up with an email id that’s already taken. <br>
<img src="https://github.com/Kavana-CR/DBCarePlus-App-Development/blob/master/SignUp%20validation.PNG"> <br>
Login button is initially disabled as shown in Figure 3 until email and password are entered. Email should be of type email id. Incorrect email and password are handled as shown in Figure 4 and Figure 5. <br>
<img src="https://github.com/Kavana-CR/DBCarePlus-App-Development/blob/master/Login%20Validation.PNG"> <br> </p>
<p> <b> Role 5: Assisted in performing CRUD operations on "Log Blood Sugar" feature </b> <br>
In Figure 1, the toast message at the bottom appears on loading. All previous entries from Firebase are loaded. <br>
Figure 2 shows the New Blood Sugar modal for a new entry. <br>
Figure 3 shows the newly added blood sugar entry along with the toast message at the bottom. Blood Sugar Entry is pushed to Firebase. <br>
<img src="https://github.com/Kavana-CR/DBCarePlus-App-Development/blob/master/LoadAdd.PNG"> <br>
Figure 4 shows the updated Blood Sugar Value which is updated in Firebase. <br>
Figure 5 shows a toast message to the user, alerting that the record has been deleted. <br>
<img src="https://github.com/Kavana-CR/DBCarePlus-App-Development/blob/master/UpdateDelete.PNG"> <br>
The figure below shows the record of Blood Sugar Entry in Firebase <br>
<img src="https://github.com/Kavana-CR/DBCarePlus-App-Development/blob/master/BloodLog-Firebase.png"> </p> <br>
<p> <b> Role 6: Acted as a Scrum Master and used Jira for managing Sprints. </b> <br>
Sprint 1 started on 21st May, 2016 with 2 issues: DBCAR-27 (Change Register Screen) and DBCAR-29 (Make Tour Wizard views). <br>
The figure below shows the Burndown chart and Issues of Sprint1 and End of Sprint <br>
<img src="https://github.com/Kavana-CR/DBCarePlus-App-Development/blob/master/Jiraburndown-sprint1.PNG"> <br>
Sprint 2 started on on 28th May, 2016. On 4th June, 2016, 2 Issues were added: DBCAR-43(Blood sugar CRUD) and DBCAR-49 (Reminders- CRUD)
The figure below shows the Burndown chart and Issues of Sprint2 and End of Sprint <br>
<img src="https://github.com/Kavana-CR/DBCarePlus-App-Development/blob/master/Jira-SPrint2.PNG"> <br>
Sprint 3, the final Sprint started on 5th June with 3 issues: Sprint start: DBCAR-60 (Food & Beverage), DBCAR-67 (Validation / Login Auth Validation) and DBCAR-68 (Side Menu / Settings / Demos). <br>
The figure below shows the Burndown chart and Issues of Sprint3 and End of Sprint <br>
<img src="https://github.com/Kavana-CR/DBCarePlus-App-Development/blob/master/Jira-Sprint3.PNG"> </p> <br>
<h3> To view the complete working of the app, follow these steps: </h3>
<p> <b>Requirements:</b> <br>
Windows PC or Mac <br>
Node.js (Download and install Node.js from Download Node.JS) <br>
Cordova (Install Cordova using npm -> npm install cordova –g or just npm install cordova) <br>
Ionic Framework (Install Ionic using npm -> npm install ionic –g or just npm install ionic) <br>
Android Device running Android 4.0 and above <br> </p>
<p> <h3> How to run the App? </h3>
Once the installation of Node.js, Cordova and Ionic Framework is done, create a new project in ionic by running the following command:<br>
$>ionic start DBCare+ blank <br>
Then, download and extract the Source Code folder onto your system by clicking the following link
https://github.com/Kavana-CR/DBCarePlus-App-Development/blob/master/Source%20Code.rar <br>
Next, copy the "www" folder from "Source Code" folder and replace it with the existing "www" folder in ionic project folder i.e DBCare+.
Also copy the "resources" folder from "Source Code" folder and paste it into the same project folder. <br>
Run the following command to serve it to serve the app onto the web browser: <br>
$>DBCare+> ionic serve --lab or ionic serve -l <br> <br>
<b>You will be limited to only those features which are compatible on the web browser.<br>
(PLEASE NOTE : This Mobile Hybrid App will not run on the web browser with full functionality. The App must be installed on to a device to see its complete functionality) </b> </p> 
<p> Start using the App by Signing up. Tap on "New Here, Sign Up? to create a new account or Tap on "F" or "G" icon to Sign Up using Facebook or Gmail respectively. <br>
The functionalities of "Reminders" and "Progress Report" features on the home screen and the "Splash Screen" can only be seen on a device and not on the browser. <br>
All the other features functionalities that can also be viewed on both browser and device are: "Food & Beverages", "Log BLood Sugar", on the Home page and in the Side Menu, the features, "See Demos", "Settings" and "Logout". For any questions regarding app usage, navigate to Side Menu-> Settings-> FAQs. <br> <br>
<b> To install and run the App on android device: </b> <br>
On your Android Phone you need to allow installation from unknown source. Transfer the APK file inside the APK-Android directory and install it from the phone or click on the following link to find the apk: <br>
https://github.com/Kavana-CR/DBCarePlus-App-Development/blob/master/Apk%20-%20Android/DBcare%2B.apk</p>



