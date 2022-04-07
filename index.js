const { Console } = require('console');
var http = require('http'); 

var jsondata=[{"Gender": "Male", "HeightCm": 171, "WeightKg": 96 }, {"Gender": "Male", "HeightCm": 161,
"WeightKg":85 }, { "Gender": "Male", "HeightCm": 180, "WeightKg": 77 }, { "Gender": "Female",
"HeightCm": 166,"WeightKg": 62}, {"Gender": "Female", "HeightCm": 150, "WeightKg": 70},
{"Gender": "Female","HeightCm": 167, "WeightKg": 82}];  

  console.log("Before Calculated");  
  console.table(jsondata);  
  var lendata=jsondata.length   
  for(i=0;i<lendata;i++){   
    heightm=jsondata[i].HeightCm/100.0     
    bmi=(jsondata[i].WeightKg/(heightm*heightm)).toFixed(2);  
    if(bmi<18.5)     
    {
      BMICategory= "Under Weight";
      HealthRisk = "Malnutrition risk";
    }
    else if(bmi>=18.5&&bmi<=24.9)   
    {
      BMICategory= "Normal weight";
      HealthRisk = "Malnutrition risk";
    }
    else if (bmi>=25 &&  bmi<=29.9)
    {
      BMICategory= "Overweight";
      HealthRisk = "Low risk";
    }
    else if (bmi>=30 &&  bmi<=39.9)
    {
      BMICategory= "Moderately obese";
      HealthRisk = "Enhanced risk";
    }
    else if (bmi>=40)
    {
      BMICategory= "Severely obese";
      HealthRisk = "High risk";
    }
    else
    {
      BMICategory= "Very severely obese";
      HealthRisk = "Very high risk";
    }
    jsondata[i]["BMI"]=bmi;
    jsondata[i]["BMICategory"]=BMICategory;
    jsondata[i]["HealthRisk"]=HealthRisk;
  }
  console.log("After Calculating BMI");
  console.table(jsondata);      //This shows the calculated data in form of java script console table

  const server=http.createServer(function (req, res) {    //creating node server 
  res.writeHead(200, {'Content-Type':'text/html'});              
  res.write(                                       
    "Person |       Gender |   BMI   |   BMICategory  |   HealthRisk <br />"+"\n");  
  
     
  for(i=0;i<lendata;i++){
    res.write(
      'Person'+i+"|"+jsondata[i].Gender+" |  "+jsondata[i].BMI+" |  "+jsondata[i].BMICategory+" |  "+jsondata[i].HealthRisk+"<br />"+"\n");
  }  
  res.end()
}).listen(8080); // port which the website can be accessed in http://localhost:8080/