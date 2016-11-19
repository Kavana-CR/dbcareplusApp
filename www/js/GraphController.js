var dbcare = angular.module('dbcare');

dbcare.controller('GraphCtrl',['$cordovaEmailComposer','$cordovaFile','$cordovaFileOpener2','$ionicLoading','$ionicPopup','$anchorScroll','$location','$scope','$firebaseAuth','ITEMREF','AUTHREF', '$firebaseArray','$ionicActionSheet', function ($cordovaEmailComposer,$cordovaFile,$cordovaFileOpener2,$ionicLoading,$ionicPopup,$anchorScroll,$location,$scope,$firebaseAuth,ITEMREF,AUTHREF,$firebaseArray,$ionicActionSheet, $timeout, graphactionsheet) 
{
	
	$scope.dynamicWidth="300px";
	var graphData=[];// y-axis data
	var label=[];//x-axis data
	var fullBSArray;
	var averageBSValues=0;
	var nameOfUser="";
	var dOB="";
	var hB1ac;
	var fbAuth = $firebaseAuth(AUTHREF).$getAuth();
	
	var defaultFilePath=cordova.file.externalRootDirectory;
	/**
	 * Generic function to fetch all blood sugar values in the DB associated with a purticular ID
	 */
	function getBloodSugars()
	{
		var ref = ITEMREF.child(fbAuth.uid).child("bloodsugar");
		var BSList = $firebaseArray(ref);
		return BSList;
	}
	/**
	 * displays the BS values on graph
	 */
    if(fbAuth)
    {
      var dbList = getBloodSugars();
      //gets the name and DOB of the uer to be used in PDF and Email functionality
      ITEMREF.child(fbAuth.uid).child("profile").on("value",function(data)
      {
			 nameOfUser=data.val().name;
			 dOB=data.val().dob;
	  });
      dbList.$loaded().then(function(data){
    	  fullBSArray=data;
       	  for(var i=0;i<data.length;i++)
		  {
			  graphData.push(Number(data[i].value));
//			  var d=new Date(data[i].date.split('/')[1]+"/"+data[i].date.split('/')[0]+"/"+data[i].date.split('/')[2]);
			  label.push(data[i].date+" at "+data[i].time);
			  averageBSValues=Number(data[i].value)+averageBSValues;
		  }
    	//sets the width of the graph according to the BS values available
    	  graphWidth=data.length*100;
    	  if(graphWidth<2000)
		  {
    		 $scope.dynamicWidth=graphWidth+"px"; 
		  }
    	  else
		  {
    		  $scope.dynamicWidth="2000px";//max width of the graph will be 2000px
		  }
    	  //adding data to the graph
    	  $scope.labels = label;//data on x-axis
    	  $scope.data = [graphData];//data on y-axis
    	  //setting the color of graph
    	  $scope.col=
    	  [{ // default
              "fillColor": "rgba(224, 108, 112, 1)",//fill color of area under the graph
              "strokeColor": "rgba(207,100,103,1)",//line color
              "pointColor": "#fff",// color of the point
              "pointStrokeColor": "rgba(220,220,220,1)",//border color of the point
              "pointHighlightFill": "#fff",//color of the point when mouse hovers it
              "pointHighlightStroke": "rgba(151,187,205,0.8)"//border color of the point when mouse hovers it
          }];
    	  $scope.options=
    	  {
			  showTooltips: true,//show tool tips when mouse hovers over a point
			  scaleShowLabels : true,// show y-axis label
			  bezierCurve : false,// line should be straight or not
			  pointDotRadius : 6,//size of the point
			  datasetFill : false,//whether to fill the area under the line or not
			  scaleShowGridLines :true,//show grid lines or not
			  showScale:true,//whether to show x-axis and y-axis
			  responsive: false,//responsive
			  maintainAspectRatio: true,// aspect ratio
			  scaleIntegersOnly: true,
			  scaleFontSize: 7
    	  };
    	  console.log(averageBSValues);
    	  //checking no. of BS values and generating HB1AC
    	  if(data.length<21)
		  {
    		  $scope.color="white";
    		  $scope.hb1ac="Minimum 21 hb1ac values over a period of 7 days are required to generate HB1AC";
    		  hB1ac=$scope.hb1ac;
		  }
    	  else if(data.length>21)
		  {
	    		hB1ac=(46.7+(averageBSValues/data.length))/28.7;
	    		$scope.hb1ac=Math.round(hB1ac);
			  	if(Math.round(hB1ac)>8)
	      		{
	      			$scope.color="red";
	      		}
	      		else if(8>Math.round(hB1ac)>7)
	      		{
	      			$scope.color="yellow";
	      		}
	      		else if(Math.round(hB1ac)<=7)
	      		{
	      			$scope.color="lightgreen";
	      		}
		  }
      });//end of dbList.$loaded
    }//end of if condition
    
/**
 * deprecated function: to show blood sugar values on click on a point of a graph
 */
$scope.showBS=function(data)
{
	var newHash = data[0].label.split(':')[1];
	ITEMREF.child(fbAuth.uid).child('bloodsugar').child(newHash).on('value',function(data)
	{
		$scope.bvalue=data.val().value;
		$scope.bdate=data.val().date;
		$scope.btime=data.val().time;
	});
}	

function createPdf()
{	
	 return filePath;
}
/**
 * shows the options on click of share button on top right
 */
$scope.show = function() {
   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: '<i class="icon dark ion-document-text"></i>Export To PDF' },
       { text: '<i class="icon dark ion-ios-email"></i>Send To E-mail' }
     ],
     titleText: 'Progress Report',
     cancelText: '<i class="icon assertive ion-close"></i>Cancel',
     cancel: function() 
     {
          hideSheet();
     },
     buttonClicked: function(index){
    	 console.log(index);
    	 /**
    	  * Export to pdf
    	  * gathers data
    	  * creates a pdf
    	  * stores it into external directory
    	  * opens it using a pdf app installed in the phone
    	  */
    	 if(index==0)
		 {
    		 var filePath;
    		 $ionicLoading.show(
    		 {
    	         template: '<center><ion-spinner class="spinner-balanced" icon="lines"></ion-spinner><br>Generating Data</i></center>',

    	     });
    		 var highestBSValue=Math.max(...graphData);
    		 var lowestBSValue=Math.min(...graphData);
    		 var currentDate=new Date();
    		 //gives the current date in dd mm yyyy 
    		 var currentDateFormatted=currentDate.toString().split(" ")[2]+" "+currentDate.toString().split(" ")[1]+" "+currentDate.toString().split(" ")[3]
    		 //converts the graph to an image
    		 html2canvas(document.getElementById('lineHidden'),
    		 {
    		        onrendered: function (canvas) 
    		        {
    	                var data = canvas.toDataURL();
    	                console.log("generating data");
    	                var docDefinition = 
    	                {//pdf content
    	            		content: [{
    	            					text:"Blood Sugar Progress Report\n\n\n",
    	            					style: "header"
    	            				  },
    	            				  {
    	            					text:"Name:	"+nameOfUser+ "\n DOB: "+dOB+"\n Date: "+currentDateFormatted+"\n\n\n",
    	            					style:"personalInfo"
    	            				  },
    	            		          {
    		                			image:data,
    		                			width:300,
    		                			alignment: 'center'
    	            		          },
    	            		          {
    	            		        	  alignment: 'justify',
    	            		        	  columns:
    	            		              [
    	            		               	{
    	            		               		text:[
    	            		               		      "\n\n\nHighest Blood Sugar Value: "+highestBSValue+" mg/dl", 
    	            		               		      "\n\nLowest Blood Sugar value: "+lowestBSValue+" mg/dl",
    	            		               		      "\n\nHbA1c: "+hB1ac+"\n\n\n"
    	            		               		     ],
    	            		               		bold:true
    	            		               	},
    	            		               	{
    	            		               		text:"\n\n\n(Target Blood Sugar: 81 – 150 mg/dl)",
    	            		               		italics: true
    	            		               	}
    	            		        	  ]
    	            		        	  
    	            		          },
    	            		          {
    	            		        	 text:[
    											"\n\n\n(HbA1c is an index of average blood sugar control during the previous 2-3 months.",
    											"\n Normal: 4-6%",
    											"\n Good Control: 6-7%",
    											"\n Average: 7-8%",
    											"\n Poor Control: 8%)"
    	            		        	       ],
    	            		        	 italics: true
    	            		          },
    	            		          {
    	            		        	  text:"\n\n\nCreated using DBCare+ App",
    	            		              alignment: 'center',
    	            		              bold:true
    	            		          }
    	            		         ],//pdf styling
    	            		         styles:
    	            		         {
    	            		        	 header:
    	            		        	 {
    	            		        		 fontSize: 18,
    	            		     			 bold: true,
    	            		     			 alignment: 'center'
    	            		        	 },
    	            		        	 personalInfo:
    	        		        		 {
    	            		        		 fontSize: 14,
    	            		        		 alignment: 'left'
    	        		        		 },
    	            		        	 body:
    	            		             {
    	            		        		 fontSize:12
    	            		             }
    	            		         }
    	    	         };//docDefination ends here
    	                //creating pdf
    	                var pdfDoc=pdfMake.createPdf(docDefinition);
    	          		 $ionicLoading.show(
    		    		 {
    		                 template: '<center><ion-spinner class="spinner-balanced" icon="lines"></ion-spinner><br>Creating PDF</i></center>',
    		
    		             });
    	          		//putting pdf data into an array
    	                pdfDoc.getBuffer(function(buffer) 
    	    	        {
    	                	console.log("converting data");
    	                	var fileName="bloodSugarReport.pdf";//pdf name
    	  	             	var utf8 = new Uint8Array(buffer); // Convert to UTF-8... 
    	                    binaryArray = utf8.buffer; // Convert to Binary...
    	                    $cordovaFile.writeFile(cordova.file.externalRootDirectory, fileName, binaryArray, true).then(function (success)
    		   				{
    		                	filePath=cordova.file.externalRootDirectory+fileName;			                	
    		                	$ionicLoading.hide();
    			       			$cordovaFileOpener2.open(
    			    	  	  	      	    filePath,
    			    	  	  	      	    'application/pdf'
    			    	  	  	      	  ).then(function() {
    			    	  	  	      	      // file opened successfully
    			    	  	  	      	  }, function(err) {
    			    	  	  	      	     console.log("error occured") // An error occurred. Show a message to the user
    			    	  	  	      	  });
    		                }, function (error) 
    		    	        {
    	                        console.log("error");
    		    	        });
    	        			
    		            });//pdfDoc.getBuffer function ends
    		        }//onrendered function ends
    	         });//html2canvas code ends
    		
    		 
    		 
		 } //if condition ends
    	 /**
    	  * code for sending emails
    	  * checks if attachments exists or not
    	  * 
    	  */
    	 else if(index==1)
    	 {
    		 var attachmentPath=defaultFilePath+"bloodSugarReport.pdf";
    		 cordova.plugins.email.open(
    		 {
    			    subject: 'Blood Sugar Progress Report of '+nameOfUser,
    			    attachments:attachmentPath,
    			    body:["Hello, <br><br> Find the attached progress report and HbA1c result generated by ",
    			    	  "“Diabetes Care Plus” based on the blood",
    			          "sugar entries made.<br><br>",
    			          "Regards,<br><br>",
    			          nameOfUser+"<br><br>",
    			          "<i>Sent from DBCare+ App</i>"
    			          
    			    	 ],
    			    isHTML:true
    		 });
                 
    	 }//else if ends
    	 return true;
    }
   });

 };
 

}]);