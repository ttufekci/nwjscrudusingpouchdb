(function () {
    'use strict';

    let insertMode = true;
    
    var persondb = document.getElementById('persondb');
  
    // indexeddb  
    var db = new PouchDB('persondb');

    var saveNewPerson = document.getElementById('savePersonBtn');

    saveNewPerson.addEventListener('click', addUpdatePerson);

    var closeWindowBtn = document.getElementById('closeBtn');

    closeWindowBtn.addEventListener('click', function () {
      window.close()
    });    

    var url = window.location;

    let searchParams = new URLSearchParams(url.search);

    var id = searchParams.get('id');

    if (id) {
      insertMode = false;
      var name = searchParams.get('name');
      var surname = searchParams.get('surname');
      var age = searchParams.get('age');      

      console.log(`id=${id} name=${name} surname=${surname} age=${age}`);

      document.getElementById('person_id').value = id;
      document.getElementById('person_name').value = name;
      document.getElementById('person_surname').value = surname;
      document.getElementById('person_age').value = age;
    }

    function addUpdatePerson()
    {
        let personId = document.getElementById('person_id').value;
        let name = document.getElementById('person_name').value;
        let surname = document.getElementById('person_surname').value;
        let age = document.getElementById('person_age').value;

        if (!insertMode) {
          db.get(personId).then(function(doc) {
            return db.put({
              _id: personId,
              _rev: doc._rev,
              name: name,
              surname: surname,
              age: age
            });
          }).then(function(response) {
            window.opener.listAllPersons();
          }).catch(function (err) {
            alert('error occured', err);
          });
        }
        else {
          db.put({
              _id: personId,
              name: name,
              surname: surname,
              age: age
            }).then(function (response) {
              // handle response
              window.opener.listAllPersons();              

            }).catch(function (err) {
              alert('error', err);
            });
        }    
    }  

  })();