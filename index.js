import validator from 'validator';
import {v4 as uuidv4} from 'uuid';
import { appendFileSync } from 'node:fs';

function generateUniqueID(firstName, lastName){
    var uniqueID = "";
    
    // converting input strings to proper case needed in the specs
    var firstN = (firstName.toLowerCase())[0];
    var lastN = lastName.toLowerCase();
    
    // creating unique id
    var new_uuid = uuidv4();

    // concatenating everything to form the full unique id
    uniqueID = firstN + lastN + new_uuid.substring(0,8);
    console.log("Unique id generated: " + uniqueID);
    return uniqueID;
}

function isEmpty(field){
    if(field || field === null){
        return false;
    }
    return true;
    //return true if field is null or empty string
}

function addAccount(input){
    // check if fields are complete 
    if(input.length !== 4){
        console.log("Fields are not complete");
        return false;
    }

    // checking of fields. checks if they are not empty
    for(var i = 0;i < input.length ; i++){
        if(isEmpty(input[i])){
            switch(i){
                case 0:
                    console.log("First name is missing");
                    break;
                case 1:
                    console.log("Last name is missing");
                    break;
                case 2:
                    console.log("Email is missing");
                    break;
                case 3:
                    console.log("Age is missing");
            }
            return false;
        }
    }

    //assigning fields
    var firstName = input[0];
    var lastName = input[1];
    var email = input[2];
    var age = input[3];

    //checking if email is valid and age is over 18
    if(validator.isEmail(email) === true && age >= 18){
        var userInput = firstName + "," +lastName + "," + email + "," + age + "," + generateUniqueID(firstName, lastName) +"\n";
        appendFileSync("users.txt", userInput);
        return true;
    }

    return false;
}

export default {addAccount}