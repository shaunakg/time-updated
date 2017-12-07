function schoolPeriod(e,o,t){this.title=e,this.startTime=new Date,this.startTime.setHours(o.split(":")[0]),this.startTime.setMinutes(o.split(":")[1]),this.startTime.setSeconds(0),this.endTime=new Date,this.endTime.setHours(t.split(":")[0]),this.endTime.setMinutes(t.split(":")[1]),this.endTime.setSeconds(0),this.times=[this.startTime,this.endTime]}function calculateNextPeriod(){var e=([new schoolPeriod("Period 1","8:40","10:05"),new schoolPeriod("Period 2","10:10","10:40"),new schoolPeriod("Mentor","11:05","11:20"),new schoolPeriod("Period 3","11:20","12:20"),new schoolPeriod("Period 4","12:25","13:25"),new schoolPeriod("Period 5","14:15","15:15")],[new schoolPeriod("Period 1","8:40","9:35"),new schoolPeriod("Period 2","9:35","10:30"),new schoolPeriod("Period 3","10:55","11:50"),new schoolPeriod("Period 4","11:50","12:45"),new schoolPeriod("Co-curricular","13:30","15:30")]),o=[new schoolPeriod("Period 1","8:40","9:40"),new schoolPeriod("Period 2","9:40","10:40"),new schoolPeriod("Mentor","11:05","11:20"),new schoolPeriod("Period 3","11:20","12:20"),new schoolPeriod("Period 4","12:25","13:25"),new schoolPeriod("Period 5","14:15","15:15")],t=([new schoolPeriod("Mentor","8:30","8:45"),new schoolPeriod("Assembly","8:45","9:50"),new schoolPeriod("Period 2","9:55","10:55"),new schoolPeriod("Period 3","11:20","12:20"),new schoolPeriod("Period 4","12:25","13:25"),new schoolPeriod("Period 5","14:15","15:15")],[[o,o,e,o,o],[o,o,e,o,o]]),i=new Date,n=(new Date).getWeek(),r=n%2?0:1,a=[];0!=i.getDay()&&6!=i.getDay()&&(a=t[r][i.getDay()-1]);for(var s=new Date,d=0,c=0,l=!0,u="",m=0;m<a.length;m++)for(var g=0;2>g;g++)c=a[m].times[g]-i,c>0&&(d>c||1==l)&&(s=a[m].times[g],d=c,l=!1,u="Until "+a[m].title+(g?" ends":" starts"));1==l?(u="No periods left today",document.getElementById("timeLeft").innerHTML="Relax",document.getElementById("titleText").innerHTML="Timetable",tomorrow=new Date,tomorrow.setHours(24),tomorrow.setMinutes(0),tomorrow.setSeconds(0),setTimeout(calculateNextPeriod,tomorrow-i)):(console.log("New periodTime:",s),calculateTime(s)),document.getElementById("timeLabel").innerHTML=u,setRandomBackground()}function calculateTime(e){var o=new Date,t=(e-o)/1e3,i=Math.floor(t/3600),n=Math.floor(t/60)%60,r=Math.floor(t%60);n=formatTime(n),r=formatTime(r);var a=i+":"+n+":"+r;if(document.getElementById("timeLeft").innerHTML=a,document.getElementById("titleText").innerHTML=a,t>0)setTimeout(calculateTime.bind(e,e),500);else{var s=document.getElementById("timeLabel").innerHTML,d=s.replace("Until ","").replace(" starts","").replace(" ends",""),c=s.includes(" starts")?" has started":" has ended";spawnNotification("","./logo.png",d+c),calculateNextPeriod()}}function formatTime(e){return 10>e?"0"+e:e}function requestNotificationPermissions(){try{Notification.requestPermission(),notificationsSupported=!0}catch(e){console.log(e)}}function spawnNotification(e,o,t){if(0!=notificationsSupported){var i={body:e,icon:o};try{new Notification(t,i)}catch(n){console.log(n,"Using ServiceWorkerRegistration.showNotification() instead"),navigator.serviceWorker.register("sw.js"),Notification.requestPermission(function(e){"granted"===e&&navigator.serviceWorker.ready.then(function(e){e.showNotification(t,i)})})}}}function setRandomBackground(){$("#mainDiv").fadeOut(400,setRandomBackgroundLoad)}function setRandomBackgroundLoad(){var e=["./backgrounds/forestbridge.jpg","./backgrounds/landscape1.jpg","./backgrounds/landscape2.jpg","./backgrounds/landscape3.jpg","./backgrounds/landscape4.jpg","./backgrounds/landscape5.jpg","./backgrounds/landscape6.jpg","./backgrounds/landscape7.jpg"],o=Math.floor(Math.random()*e.length);o==lastBackgroundIndex&&(o++,o>=e.length&&(o=0)),lastBackgroundIndex=o;var t=e[o],i=new Image;i.onload=function(){$("#mainDiv").css("background-image","url("+i.src+")"),$("#mainDiv").fadeIn(400)},i.onerror=function(){$("#mainDiv").fadeIn(400)},i.src=t}$(document).ready(function(){requestNotificationPermissions(),$("#mainDiv").fadeOut(0),calculateNextPeriod()});var notificationsSupported=!1,lastBackgroundIndex=-1;Date.prototype.getWeek=function(){var e=new Date(this.getFullYear(),0,1);return Math.ceil(((this-e)/864e5+e.getDay()+1)/7)};
