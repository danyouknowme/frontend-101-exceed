const persons = [
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
    name: "C",
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

const getUserById = async (id) => {
  return new Promise((resolve, reject) => {
    console.log("Starting operations...");

    // Simulate network call
    setTimeout(() => {
      console.log("Finding user...");

      const user = persons.find((user) => user.id === id);
      console.log("Operation ended");

      if (user) {
        resolve(user);
      } else {
        reject("User not found!");
      }
    }, 1500);
  });
};

(async () => {
	try {
		const user = await getUserById(3);
		console.log(user);
	} catch (error) {
		console.log(error);
	}
})();
