const users = [
  {
    id: 1,
    name: "A",
    age: 44,
  },
  {
    id: 2,
    name: "B",
    age: 20,
  },
  {
    id: 3,
    name: "E",
    age: 13,
  },
  {
    id: 4,
    name: "D",
    age: 18,
  },
  {
    id: 5,
    name: "E",
    age: 5,
  },
];

// List of all users without id
const userWithoutId = users.map(({ name, age }) => ({ name, age }));

// Object of user named 'E'
const userNamedE = users.find(({ name }) => name === "E");

// New list of user that is also contains greeting function
const newUserList = users.map((user) => {
  return {
    ...user,
    greeting: function () {
      console.log(`Hello, My name is ${this.name}.`);
    },
  };
});

newUserList[2].greeting();
