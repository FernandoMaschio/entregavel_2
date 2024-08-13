/* Crie uma classe "Aluno" com as propriedades: Nome, Idade e Nota;

Crie um construtor que preencha as 3 propriedades;

Crie um array para armazenar os Alunos cadastrados;

Crie uma função "CadastrarAluno()" que recebe três parâmetros: nome, idade e nota. 
Nesta função crie um novo objeto de aluno com as informações  recebidas via parâmetro, 
adicione esse objeto ao array de alunos e retorne o objeto Aluno. Antes de salvar no array,
valide se já não existe um objeto com o mesmo Nome, para evitar duplicidade.

Cria uma função "OrdenarPorNota()" que  recebe um array de alunos como parâmetro e ordene 
o array da menor para a maior nota e retorne o array ordenado;

Crie uma função "OrdenarPorIdade()" que recebe um array de alunos como parâmetro e ordene 
o array da maior para a menor idade e retorne o array ordenado;

Crie uma função "OrdenarPorNome()" que recebe um array de alunos como parâmetro e ordene 
o array em ordem alfabética com base no nome e retorne o array ordenado; (essa é um desafio, 
se necessário façam uma pesquisa)

Crie uma função "CalcularMedia()" que recebe um array de alunos como parâmetro
 e calcule a média das notas e retorne a media calculada; */

class Aluno {
  constructor(nome, idade, nota) {
    this.Nome = nome;
    this.Idade = idade;
    this.Nota = nota;
  }
}

let alunosCadastrados = [];

function CadastrarAluno(nome, idade, nota) {
  let objetoAluno = new Aluno(nome, idade, nota);
  if (!alunosCadastrados.some(x => x.Nome === nome)) {
    alunosCadastrados.push(objetoAluno);
    return objetoAluno;
  } else {
    alert("Erro: aluno com este nome já cadastrado!");
    return null;
  }
}

function OrdenarPorNota(array = alunosCadastrados) {
  array.sort((a, b) => Number(a.Nota) - Number(b.Nota));
  return array;
}

function OrdenarPorIdade(array = alunosCadastrados) {
  array.sort((a, b) => Number(a.Idade) - Number(b.Idade));
  return array;
}

function OrdenarPorNome(array = alunosCadastrados) {
  array.sort((a, b) => {
    const nomeA = a.Nome.toUpperCase();
    const nomeB = b.Nome.toUpperCase();

    if (nomeA < nomeB) return -1;
    if (nomeA > nomeB) return 1;
    return 0;
  });
  return array;
}

function CalcularMedia(array = alunosCadastrados) {
  if (array.length === 0) return 0;
  let somaNotas = 0;
  array.forEach(aluno => {
    somaNotas += Number(aluno.Nota);
  });
  return somaNotas / array.length;
}

////////////////////////////////////////////////////////////////////////
////////////////// FAÇA O SEU CÓDIGO AQUI \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////////////////////////////////////////////////////

function ExcluirAluno(array, nome) {
  let index = array.findIndex(aluno => aluno.Nome === nome);
  if (index !== -1) {
    array.splice(index, 1);
    return true;
  }
  return false;
}

function PesquisarAluno(array, nome) {
  return array.some(aluno => aluno.Nome.includes(nome));
}

// Seleção de elementos
const alunoForm = document.querySelector("#aluno-form");
const alunoInput = document.querySelector("#aluno-input");
const alunoInput2 = document.querySelector("#aluno-input-2");
const alunoInput3 = document.querySelector("#aluno-input-3");
const alunoList = document.querySelector("#aluno-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

// Funções
const saveAluno = (nome, idade, nota, done = 0, save = 1) => {
  let objetoAluno = CadastrarAluno(nome, idade, nota);

  if (objetoAluno === null) return; // Não adicionar aluno se já existe

  const aluno = document.createElement("div");
  aluno.classList.add("aluno");

  const alunoNome = document.createElement("h3");
  alunoNome.innerText = objetoAluno.Nome;
  aluno.appendChild(alunoNome);

  const alunoIdade = document.createElement("h3");
  alunoIdade.innerText = objetoAluno.Idade;
  aluno.appendChild(alunoIdade);

  const alunoNota = document.createElement("h3");
  alunoNota.innerText = objetoAluno.Nota;
  aluno.appendChild(alunoNota);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("remove-aluno");
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  aluno.appendChild(deleteBtn);

  alunoList.appendChild(aluno);

  const media = document.querySelector("#media");
  media.textContent = CalcularMedia(alunosCadastrados).toFixed(2);

  alunoInput.value = "";
  alunoInput2.value = "";
  alunoInput3.value = "";
};

const toggleForms = () => {
  editForm.classList.toggle("hide");
  alunoForm.classList.toggle("hide");
  alunoList.classList.toggle("hide");
};

const getBuscarAluno = (busca) => {
  const alunos = document.querySelectorAll(".aluno");

  let pesquisa = PesquisarAluno(alunosCadastrados, busca);

  alunos.forEach(aluno => {
    const alunoNome = aluno.querySelector("h3").innerText.toLowerCase();
    aluno.style.display = alunoNome.includes(busca.toLowerCase()) ? "flex" : "none";
  });
}

const filterAlunos = (filterValue) => {
  const alunos = document.querySelectorAll(".aluno");

  alunos.forEach(aluno => aluno.remove());

  switch (filterValue) {
    case "nota":
      alunosCadastrados = OrdenarPorNota();
      break;
    case "idade":
      alunosCadastrados = OrdenarPorIdade();
      break;
    case "nome":
      alunosCadastrados = OrdenarPorNome();
      break;
    default:
      break;
  }

  alunosCadastrados.forEach(aluno => saveAluno(aluno.Nome, aluno.Idade, aluno.Nota));
};

// Eventos
alunoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = alunoInput.value;
  const inputValue2 = alunoInput2.value;
  const inputValue3 = alunoInput3.value;

  if (inputValue && inputValue2 && inputValue3) {
    saveAluno(inputValue, inputValue2, inputValue3);
  }
});

document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest("div");
  let alunoTitle;

  if (parentEl && parentEl.querySelector("h3")) {
    alunoTitle = parentEl.querySelector("h3").innerText || "";
  }

  if (targetEl.classList.contains("remove-aluno")) {
    alunoTitle = parentEl.querySelector("h3").innerText;
    let removido = ExcluirAluno(alunosCadastrados, alunoTitle);
    if (removido) {
      parentEl.remove();
      const media = document.querySelector("#media");
      media.textContent = CalcularMedia(alunosCadastrados).toFixed(2);
    }
  }
});

searchInput.addEventListener("keyup", (e) => {
  const busca = e.target.value;
  getBuscarAluno(busca);
});

eraseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  searchInput.value = "";
  searchInput.dispatchEvent(new Event("keyup"));
});

filterBtn.addEventListener("change", (e) => {
  const filterValue = e.target.value;
  filterAlunos(filterValue);
});
