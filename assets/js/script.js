//fetch then catach
// var userData = fetch('https://randomuser.me/api/')
//   .then((raw) => {
//     return raw.json();
//   });
// userData.then(data => {
//     if(data)
//         console.log('data found');
//     else
//         console.log('data not found');
//     console.log(data);
// });

//fetch then catach with promise
// var userData = new Promise((resolves, reject)=>{
//     fetch('https://randomuser.me/api/')
//     .then((raw) => {
//         if(raw){
//             resolves(raw.json());
//         }else{
//             reject();
//         }
//         // return raw.json();
//     });
// })
// userData.then((data)=>{
//     console.log(data);
//     console.log('data found');
// })
// .catch((data)=>{
//     console.log(data);
//     console.log('data not found');
// });

//fetch then with async await
// async function fetchUserData() {
//     try {
//       const response = await fetch('https://randomuser.me/api/');

//       if (!response.ok) {
//         throw new Error('Data not found');
//       }

//       const data = await response.json(); // Parsing the JSON data
//       console.log(data);
//       console.log('Data found');
//     } catch (error) {
//       console.log(error);
//      console.log('Data not found');
//     }
//   }

//   fetchUserData();

// let allUsers = [];

// async function fetchUserData() {
//     console.log('loop start');
//     try {
//         let response = await fetch('https://randomuser.me/api/?nat=in&results=100');
//         let data = await response.json();

//         if (data) {
//             console.log('data found');
//             // console.log(data);
//             // console.log('first name: ' + data.results[0].name.first);

//             for (let i = 1; i <= data.results.length; i++) {
//                 let user = {
//                   "first" : data.results[i].name.first,
//                   "last" : data.results[i].name.last,
//                   "gender" :data.results[i].gender,
//                   "age" :data.results[i].dob.age,
//                   "city" :data.results[i].location.city,
//                   "state" :data.results[i].location.state
//                 };
//                 // console.log(user);
//                 allUsers.push(user);
//             }
//             } else {
//                 console.log('data not found');
//             }
//         } catch (error) {
//             console.error('Error fetching data: ', error);
//         }
//     console.log('loop end');
//     console.log(allUsers);
//     let filterMap = allUsers.filter((x)=> x.gender == 'male' && x.age >50).map((y)=> 'My name is '+ y.first+ ' '+ y.last);
//     console.log(filterMap);
// }
// // fetchUserData();

// let xmlhttp = new XMLHttpRequest();
// xmlhttp.open('GET', 'https://randomuser.me/api/?nat=in&results=100', true);
// xmlhttp.onload = function() {
//     document.getElementById('data').innerHTML = this.responseText;
//     console.log(this.responseText);
// }
// xmlhttp.send();

//Object Oriented JS

import { Calculator, Trigo } from "./Modules/Calculator.js";
import { evaluate } from "./Modules/Evaluate.js";

// const historyAdd = new History;
// historyAdd('12+13+14', 39)
// console.log(History.historyId);
// console.log(Calculator.add(8, 4));

let calculator = new Calculator(8, 4);
console.log(calculator.__proto__);
// let trigoCal = new Trigo(60);
// console.log(trigoCal);
// console.log(trigoCal.sin());
// console.log(Trigo.sin(60));
// console.log('add -> ',calculator.add());
// console.log('subtract -> ',calculator.subtract());
// console.log('multiply -> ',calculator.multiply());
// console.log('sin -> ',calculator.__proto__.Trigo);

// console.log(evaluate("45+45-++--5")); 
// 45+98/5-(10*2)