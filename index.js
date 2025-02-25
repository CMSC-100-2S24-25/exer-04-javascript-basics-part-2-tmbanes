import validator from 'validator';
import {v4 as uuidv4} from 'uuid';
import { appendFileSync } from 'node:fs';

function generateUniqueID(firstName, lastName){
    var uniqueID = "";
    var firstN = (firstName.toLowerCase())[0];
    var lastN = lastName.toLowerCase();
    var new_uuid = uuidv4();

    uniqueID = firstN + lastN + new_uuid.substring(0,8);
    console.log("Unique id generated!");
    return uniqueID;
}

function isEmpty(string){
    if(string){
        return false;
    }
    return true;
}

function addAccount(firstName, lastName, email, age){
    if(
        !isEmpty(firstName) &&
        !isEmpty(lastName) &&
        !isEmpty(email) &&
        !isEmpty(age) &&
        validator.isEmail(email) === true && 
        age >= 18
    ){
        console.log("hi");
        var userInput = firstName + "," +lastName + "," + email + "," + age + "," + generateUniqueID(firstName, lastName) +"\n";
        appendFileSync("users.txt", userInput);
    }
}
