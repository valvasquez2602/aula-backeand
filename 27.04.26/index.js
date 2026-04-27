import fs from "fs/promises";

async function readFruits() {
    const data = await fs.readFile("./fruits.json", "utf-8");
    return JSON.parse(data);
}

async function writeFruits(fruits) {
    const data = JSON.stringify(fruits, null, 2);
    await fs.writeFile("./fruits.json", data, "utf-8");
}


async function getAllFruits() {
    return await readFruits();
}


async function getFruitById(id) {
    const fruits = await readFruits();
    return fruits.find(item => item.id === Number(id));
}

async function createFruit(nome) {
    const fruits = await readFruits();
    const alreadyExists = fruits.some(
        item => item.nome.toLowerCase() === nome.toLowerCase()
    );
    if (alreadyExists) {
        console.log("Essa fruta já está cadastrada.");
        return null;
    }
    const newFruit = {
        id: fruits.length > 0 ? fruits[fruits.length - 1].id + 1 : 1,
        nome: nome
    };
    fruits.push(newFruit);
    await writeFruits(fruits);
    return newFruit;
}



async function updateFruit(id, novoNome) {
    const fruits = await readFruits();

    const index = fruits.findIndex(item => item.id === Number(id));

    if (index === -1) return null;

    fruits[index].nome = novoNome;

    await writeFruits(fruits);

    return fruits[index];
}


async function deleteFruit(id) {
    const fruits = await readFruits();

    const index = fruits.findIndex(item => item.id === Number(id));

    if (index === -1) return false;

    fruits.splice(index, 1);

    await writeFruits(fruits);

    return true;
}



async function main() {
    console.log("Todas as frutas:");
    console.log(await getAllFruits());

    console.log("\nBuscar fruta por ID:");
    console.log(await getFruitById(1));

    console.log("\nCriar fruta:");
    console.log(await createFruit("morango"));

    console.log("\nAtualizar fruta:");
    console.log(await updateFruit(1, "Maçã Verde"));

    console.log("\nDeletar fruta:");
    console.log(await deleteFruit(7));

    console.log("\nLista final:");
    console.log(await getAllFruits());


}

main();

console.log("teste")