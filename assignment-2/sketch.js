let UserName = prompt("Hello, what is your name?");
alert("Welcome " + UserName + ", it's a pleasure to greet you!");
let Age = prompt("May I ask how old are you?");
let born = 2026 - Number(Age);
alert("In that case, you must have been born around " + born + ", right?")
let Temp = prompt("What's the current temperature in F?");
let C = (Temp - 32) * 5 / 9;
alert("Well, " + Temp + " F would be " + C + " in C!");
let Integer_1a = prompt("Please enter an integer value");
let Integer_2a = prompt("Please enter a second integer value");
let Integer_1 = Number(Integer_1a);
let Integer_2 = Number(Integer_2a);
alert("Let me show you what I can do with the numbers " + Integer_1 + " " + "and " + Integer_2);
let sum = Integer_1 + Integer_2;
let sub = Integer_1 - Integer_2;
let mul = Integer_1 * Integer_2;
let div = Integer_1 / Integer_2;
let modu = Integer_1 % Integer_2;
alert(Integer_1 + " " + "+" + " " + Integer_2 + " " + "=" + " " + sum);
alert(Integer_1 + " " + "-" + " " + Integer_2 + " " + "=" + " " + sub);
alert(Integer_1 + " " + "*" + " " + Integer_2 + " " + "=" + " " + mul);
alert(Integer_1 + " " + "/" + " " + Integer_2 + " " + "=" + " " + div);
alert(Integer_1 + " " + "%" + " " + Integer_2 + " " + "=" + " " + modu);
alert("The max of " + Integer_1 + " " + "and " + Integer_2 + " " + "is " + Math.max(Integer_1, Integer_2));
alert("The min of " + Integer_1 + " " + "and " + Integer_2 + " " + "is " + Math.min(Integer_1, Integer_2));
if(Integer_1 % 2 == 0)
  alert(Integer_1 + " is an EVEN number");
else
  alert(Integer_1 + " is an ODD number");
if(Integer_2 % 2 == 0)
  alert(Integer_2 + " is an EVEN number");
else
  alert(Integer_2 + " is an ODD number");
if(Integer_1 > Integer_2)
  alert(Integer_1 + " is greater than " + Integer_2);
else if(Integer_1 < Integer_2)
  alert(Integer_1 + " is smaller than " + Integer_2);
else if(Integer_1 == Integer_2)
  alert(Integer_1 + " is equal to " + Integer_2);
let Dec_s = prompt("Please enter a value with a decimal part");
alert("Let me show you what I can do with the number " + Dec_s);
let Dec = Number(Dec_s);
let neg = -Dec;
let s = Math.sin(Dec);
let c = Math.cos(Dec);
let Square_10 = Math.pow(Dec, 10);
let S_root = Math.sqrt(Dec);
let Round = Math.round(Dec);
let Floor = Math.floor(Dec);
let Ceiling = Math.ceil(Dec);
let Absolute = Math.abs(Dec);
alert("The negative of " + Dec +" is " + neg);
alert("The sine of " + Dec + " radians is " + s.toExponential());
alert("The cosine of " + Dec + " radians is " + c);
alert(Dec + "^10" + " = " + Square_10);
alert("Square root of " + Dec + " is " + S_root);
alert("Rounded " + Dec + " = " + Round);
let Deci = prompt("How many decimals to round to?");
alert(Dec + " rounded to " + Deci + " decimals = " + Dec.toFixed(Deci));
alert("Floor of " + Dec + " = " + Floor);
alert("Ceiling of " + Dec + " = " + Ceiling);
alert("Absolute value of " + Dec + " = " + Absolute);
let Fav = prompt("What's your favorite number?");
let Favn = Number(Fav);
let Squared = Math.pow(Favn, 2);
let Cubed = Math.pow(Favn, 3);
alert("Fun fact: " + Favn +" squared is " + Squared + " and cubed is " + Cubed + "!");
alert("Thanks for chatting with me, " + UserName + "! Have a great day!");



