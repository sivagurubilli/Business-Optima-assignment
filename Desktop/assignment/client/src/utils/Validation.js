export const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  export const isValidName = (name) => {
    // validating the name with alphabetic characters only and maximum length of 50 characters
    return /^[a-zA-Z\s']{1,50}$/.test(name);
};


export const isValidPassword = (password) => {
    // Validate password with minimum length of 8 characters, at least one uppercase letter, and at least one digit
    return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
};

 export const isValidDate = (dateString) => {
    // Attempt to create a Date object from the provided string
    const dateObject = new Date(dateString);
    
    // Check if the created Date object is a valid date
    // and the input string is not empty
    return !isNaN(dateObject.getTime()) && dateString.trim() !== '';
};

export const isValidPhoneNumber = (phoneNumber) => {
    // Validate phone number with 10 digits format
console.log((phoneNumber))
    return /^[0-9]{10}$/.test(phoneNumber);
};

export const isValidAddress = (value) => {
    // Check if the length of the value is less than or equal to the maxLength
    return value.length  <= 100;
};

export const isValidCityName = (city) => {
    // Validate city name with only alphabetic characters and maximum length of 50 characters
    return /^[A-Za-z ]{1,50}$/.test(city);
};
export const isValidPincode = (pincode) => {
    // Validate pincode with exactly 6 digits format
    return /^\d{6}$/.test(pincode);
};
export const isValidSecurityAnswer = (answer) => {
    // Validate security answer with maximum length of 100 characters
    return answer.length <= 100;
};


