function resultsController($scope, api, date, $http) {

    //initializing date and getting the score to the actual date
    $scope.viewDate = new Date();
    var selectedDate = date.formatDate($scope.viewDate);
    var dateArray = selectedDate.split("/")
    getScore(selectedDate);
  
    $scope.changeViewDate = function () {
      selectedDate = date.formatDate($scope.viewDate);
      dateArray = selectedDate.split("/")
      getScore(selectedDate);
    }
  
    //get the score from APi
    function getScore(date){
      api.getScore(date).then(function(response){
        $scope.rows = response.data.result.candidatesArrayResponse;
      }, function(error){
        $scope.rows = [];
        console.log(error)
      }); 
    }

  $scope.options = {
    pagingStrategy:"PAGINATE",
    rowsPerPage: 25,
    rowsPerPageMessage: "Linhas por Pagina",
    initialSorts: [
      {
        id: 'number',
        dir: '+'
      }
    ]
  }

  $scope.format = function(value){
    return value.substr(0,value.length -2) + "." + value.substr(value.length -2, value.length);
  }

  $scope.columns = [
    {
      id: 'number',
      key: 'number',
      sort: 'number',
      label: 'Numero',
      filter: 'like',
      filterPlaceholder: 'Digite um numero',
      width: '100px'
    },
    {
      id: 'name',
      key: 'name',
      sort: 'string',
      label: 'Nome',
      filter: 'like',
      filterPlaceholder: 'Digite um nome',
      template: '<a href=\"#/detail/' + '{{row.examDate}}' + '/' + '{{row.number}}\">{{row.name}}</a> '
    },
    {
      id: 'gender',
      key: 'gender',
      label: 'Genero',
      width: '80px',
      template: '{{ row.gender == "Masculino" ? "M" : "F" }}'
    },
    {
      id: 'cpf',
      key: 'cpf',
      label: 'CPF',
      filter: 'like',
      filterPlaceholder: 'Digite um CPF',
      width: '150px',
    },
    {
      id: 'height',
      key: 'height',
      label: 'Altura',
      width: '150px',
      template: " {{ row.punctuation.height.result }} m <span class='badge badge-success'>{{ row.punctuation.height.candidateScore ? 'Aprovado' : '' }}</span>" 
      + " <span class='badge badge-danger'>{{ !row.punctuation.height.candidateScore ? 'Reprovado' : '' }}</span>" 
    },
    {
      id: 'pushups',
      key: 'pushups',
      label: 'Flexão',
      width: '150px',
      template: 'Flexões: {{ row.punctuation.pushups.result }}<p>Pontos: {{ row.punctuation.pushups.candidateScore }}' 
        + '</p>'
    },
    {
      id: 'abdominal',
      key: 'abdominal',
      label: 'Abdominais',
      width: '150px',
      template: 'Abdominais: {{ row.punctuation.abdominal.result }}<p>Pontos: {{ row.punctuation.abdominal.candidateScore }}' 
        + '</p>'
    },
    {
      id: 'fiftyMetersRunning',
      key: 'fiftyMetersRunning',
      label: '50 Metros',
      width: '200px',
      template: 'Tempo: {{ row.punctuation.fiftyMetersRunning.result }}  segundos<p>Pontos: {{ row.punctuation.fiftyMetersRunning.candidateScore }}' 
        + '</p>'
    },
    {
      id: 'twelveMinutesRunning',
      key: 'twelveMinutesRunning',
      label: '12 Minutos',
      width: '150px',
      template: 'Metros: {{ row.punctuation.twelveMinutesRunning.result }}<p>Pontos: {{ row.punctuation.twelveMinutesRunning.candidateScore }}' 
        + '</p>'
    },
    {
      id: 'points',
      key: 'Total',
      label: "Resultado",
      width: '100px',
      template: '<span class="' 
        + "{{ (row.punctuation.twelveMinutesRunning.candidateScore + row.punctuation.fiftyMetersRunning.candidateScore + row.punctuation.abdominal.candidateScore + row.punctuation.pushups.candidateScore) > 200 ? 'green-font' : 'red-font'}}" 
        + '">' 
        + '{{row.punctuation.twelveMinutesRunning.candidateScore + row.punctuation.fiftyMetersRunning.candidateScore + row.punctuation.abdominal.candidateScore + row.punctuation.pushups.candidateScore}}</span>' 
        + " <span class='badge badge-success'>{{ ( row.punctuation.twelveMinutesRunning.candidateScore + row.punctuation.fiftyMetersRunning.candidateScore + row.punctuation.abdominal.candidateScore + row.punctuation.pushups.candidateScore ) > 200 ? 'Aprovado' : '' }}</span>" 
        + " <span class='badge badge-danger'>{{ ( row.punctuation.twelveMinutesRunning.candidateScore + row.punctuation.fiftyMetersRunning.candidateScore + row.punctuation.abdominal.candidateScore + row.punctuation.pushups.candidateScore )  <= 200 ? 'Reprovado' : '' }}</span>"
    }
  ];

}

angular
  .module('results')
  .controller('resultsController', resultsController);