const router = require("express").Router();
const { update, updateOne } = require("../models/Person");
const Person = require("../models/Person");

//Add - Criação de dados

router.post("/", async (req, res) => {
  const { nome, salario, aprovado } = req.body;
  const person = { nome, salario, aprovado };

  if (!nome) {
    res.status(402).json({ message: "Você deve inserir um nome!" });
    return;
  }

  try {
    await Person.create(person);
    res
      .status(201)
      .json({ message: "Pessoa inserida no sistema com sucesso!" });
    return;
  } catch (error) {
    res.status(500).json({ error: error });
    return;
  }
});

//READ - Leitura de dados (mostra todos os dados da coluna person)
router.get("/", async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);
    return;
  } catch (error) {
    res.status(500).json({ error: error });
    return;
  }
});

//consulta unica
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const person = await Person.findOne({ _id: id });
    if (!person) {
      res.status(422).json({ message: "O usuario nao foi encontrado" });
      return;
    }
    res.status(200).json({ person });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//update put ou patch
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const person = ({ nome, salario, aprovado } = req.body);

  try {
    const updatePerson = await Person.updateOne({ _id: id }, person);
    if (updatePerson.matchedCount === 0) {
      res.status(422).json({ message: "O usuario nao foi encontrado!" });
      return;
    } else {
      res.status(200).json({ message: "O usuario foi editado com sucesso!" });
      return;
    }
  } catch (error) {
    res.status(500).json({ error: error });
    return;
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const person = await Person.findOne({ _id: id });
  if (!person) {
    res.status(422).json({ message: "Nao foi encontrado nenhum usuario!" });
    return;
  }

  try {
    const deletePerson = await Person.deleteOne({ _id: id });
    if (deletePerson.deletedCount === 1) {
      res.status(200).json({ message: "O usuario foi deletado com sucesso" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
