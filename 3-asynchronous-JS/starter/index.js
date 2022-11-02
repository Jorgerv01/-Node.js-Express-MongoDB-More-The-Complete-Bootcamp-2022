const fs = require("fs");
const superagent = require("superagent");
const axios = require("axios");

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) return reject("I could not find that file");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("I could not find that file");
      resolve("success");
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro("./dog.txt");
    console.log(`Breed: ${data}`);

    const all = [];
    for (let i = 0; i < 10; i++) {
      const link = await axios.get(
        `https://dog.ceo/api/breed/${data}/images/random`
      );
      all.push(link);
    }


    // const link2Pro = axios.get(
    //   `https://dog.ceo/api/breed/${data}/images/random`
    // );
    // const link3Pro = axios.get(
    //   `https://dog.ceo/api/breed/${data}/images/random`
    // );

    // const all = await Promise.all([link1Pro, link2Pro, link3Pro]);

    const imgs = all.map((e) => e.data.message);
    console.log(imgs);
    await writeFilePro("dog-img.txt", imgs.join("\n"));
    console.log("Random dog image saved to file");
  } catch (err) {
    console.log(err.message);
    // throw sirve para rechazar la promesa
    throw err;
  }
  return "2: Ready";
};

(async () => {
  try {
    console.log("1: Will get dog pics!");
    // hay que asignar la funcion a una variable para poder asignar o leer en este caso el return
    const x = await getDogPic();
    console.log(x);
    console.log("3: Done getting dog pics");
  } catch (err) {
    console.log("ERROR!");
  }
})();

// console.log("1: Will get dog pics!");
// getDogPic()
//   .then((x) => {
//     console.log(x);
//     console.log("3: Done getting dog pics");
//   })
//   .catch(() => {
//     console.log("Error");
//   });

// readFilePro("./dog.txt")
//   .then((res) => {
//     console.log(`Breed: ${res}`);

//     return superagent.get(`https://dog.ceo/api/breed/${res}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFilePro("dog-img.txt", res.body.message).then(() => {
//       console.log("Random dog image saved to file");
//     });
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
