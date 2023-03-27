const axios = require('axios');
const moment = require('moment');

// Define los repositorios que quieres verificar
const repositories = [
  { name: 'admefy-player-flutter', owner: 'cyberkepper' },
  { name: 'repositorio2', owner: 'usuario2' },
  { name: 'repositorio3', owner: 'usuario3' }
];

// Define la fecha límite para las actualizaciones
const deadline = moment().subtract(7, 'days');

// Itera sobre los repositorios y realiza la verificación
repositories.forEach(repo => {
  axios.get(`https://api.github.com/repos/${repo.owner}/${repo.name}/commits`)
    .then(response => {       
      const latestCommitDate = moment(response.data[0].commit.author.date);
      if (latestCommitDate.isBefore(deadline)) {
        console.log(`${repo.name} está desactualizado ❌`);
      } else {
        console.log(`${repo.name} está actualizado ✅`);
      }
    })
    .catch(error => {
      console.log(`${repo.name} no se pudo verificar ❌`);
    });
});
