const jsonString = '{"name": "John Doe", "age": 30}';
const obj = JSON.parse(jsonString);
console.log(obj); // Output: John Doe
const stringify = JSON.stringify(obj);
console.log("stirngfy object is : ",stringify);
console.log(typeof stringify);

