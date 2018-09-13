
function displayFormatedBirthdate(dob, est){
  var birthdate = new Date(dob);
  var estimated = parseInt(est);
  var year      = birthdate.getFullYear();
  var month     = birthdate.getMonth();
  var day       = birthdate.getDay();

  var months = new Array();
  months[0] = "January";
  months[1] = "February";
  months[2] = "March";
  months[3] = "April";
  months[4] = "May";
  months[5] = "June";
  months[6] = "July";
  months[7] = "August";
  months[8] = "September";
  months[9] = "October";
  months[10] = "November";
  months[11] = "December";

  if(estimated == 1){
    if(month == 7 && day == 1){
      return ("??/???/" + year);
    }else if(day == 15){
      return ("??/" + months[month] + "/" + year);
    }else{
      return (day + "/" + months[month] + "/" + year);
    }
  }
  return (day + "/" + months[month] + "/" + year);
}



function calculate_age(dob) {
  var birthdate = new Date(dob);
  var today = new Date();

  var patient_age = (today.getFullYear() - birthdate.getFullYear()) + ((today.getMonth() - birthdate.getMonth()) + ((today.getDay() - birthdate.getDay()) < 0 ? -1 : 0) < 0 ? -1 : 0);

  return patient_age;
}


