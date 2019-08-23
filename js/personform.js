(function () {
    'use strict';
    
    var persondb = document.getElementById('persondb');
  
    // indexeddb  
    var db = new PouchDB('persondb');

    var saveNewPerson = document.getElementById('savePersonBtn');

    if (saveNewPerson) {
        saveNewPerson.addEventListener('click', addPerson);
    }    

    function addPerson()
    {
        console.log('adding person');

        let personId = document.getElementById('person_id').value;
        let name = document.getElementById('person_name').value;
        let surname = document.getElementById('person_surname').value;
        let age = document.getElementById('person_age').value;

        db.put({
            _id: personId,
            name: name,
            surname: surname,
            age: age
          }).then(function (response) {
            // handle response
            window.opener.listAllPersons();              

          }).catch(function (err) {
            console.log(err);
          });       
    }  

  })();