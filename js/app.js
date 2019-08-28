(function () {
    'use strict';
    
    // indexeddb  
    var db = new PouchDB('persondb');

    var addPersonButton = document.getElementById('addPersonBtn');

    addPersonButton.addEventListener('click', openPersonForm);

    var refreshButton = document.getElementById('refreshBtn');

    refreshButton.addEventListener('click', function () {
        listAllPersons();
    });    
   
    function openPersonForm()
    {
        nw.Window.open('personform.html', 
        {
            width: 500,
            height: 550
        }, 
        function(win) {});
    }

    function openPersonFormForUpdate(myid)
    {
        db.get(myid).then(function (doc){
            if (doc) {
                var name = doc.name;
                var surname = doc.surname;
                var age = doc.age;
                
                var url = `personform.html?id=${myid}&name=${name}&age=${age}&surname=${surname}`;

                nw.Window.open(url, 
                {
                    width: 500,
                    height: 550
                }, 
                function(win) {});
            }
        });
    }        
   
    function openPersonForm()
    {
        nw.Window.open('personform.html', 
        {
            width: 500,
            height: 550
        }, 
        function(win) {});
    }    

    function removePerson(myid)
    {
        console.log('removed:' + myid);
        db.get(myid).then(function(doc) {
            return db.remove(doc);
          }).then(function (result) {
            // handle result
            listAllPersons();
          }).catch(function (err) {
            console.log(err);
        });        
    }

    function listAllPersons() {
        db.allDocs({
            include_docs: true,
            attachments: true
        }).then(function (result) {
    
            var docs = result.rows;
    
            var tableRef = document.getElementById('personlist').getElementsByTagName('tbody')[0];

            while(tableRef.hasChildNodes())
            {
                tableRef.removeChild(tableRef.firstChild);
            }
    
            docs.forEach(function(element) {
                // Insert a row in the table at the last row
                var newRow   = tableRef.insertRow();
                
                // Insert a cell in the row at index 0
                var newCell  = newRow.insertCell(0);
                
                var myid = element.doc._id;
    
                // Append a text node to the cell
                var newText  = document.createTextNode(myid);
                newCell.appendChild(newText);
    
                // Insert a cell in the row at index 0
                newCell  = newRow.insertCell(1);
                
                var myname = element.doc.name;
    
                // Append a text node to the cell
                newText  = document.createTextNode(myname);
                newCell.appendChild(newText); 
                
                // Insert a cell in the row at index 0
                newCell  = newRow.insertCell(2);
                
                var mysurname = element.doc.surname;
    
                // Append a text node to the cell
                newText  = document.createTextNode(mysurname);
                newCell.appendChild(newText);
                
                // Insert a cell in the row at index 0
                newCell  = newRow.insertCell(3);
                
                var myage = element.doc.age;
    
                // Append a text node to the cell
                newText  = document.createTextNode(myage);
                newCell.appendChild(newText);             
                

                
                // Insert a cell in the row at index 0
                newCell  = newRow.insertCell(4);
                
                var anchorUpdate = document.createElement("a");
                anchorUpdate.className = 'button';
                anchorUpdate.onclick = function () {
                    openPersonFormForUpdate(myid);
                }

                var spanIcon = document.createElement("span");
                spanIcon.className = 'icon is-small';

                var icon = document.createElement("i");
                icon.className = "fas fa-pen";

                spanIcon.appendChild(icon);

                anchorUpdate.appendChild(spanIcon);

                newCell.appendChild(anchorUpdate);

                //

                newCell  = newRow.insertCell(5);

                var anchorRemove = document.createElement("a");
                anchorRemove.className = 'button';
                anchorRemove.onclick = function () {
                    removePerson(myid);
                }

                spanIcon = document.createElement("span");
                spanIcon.className = 'icon is-small';

                icon = document.createElement("i");
                icon.className = "fas fa-trash";

                spanIcon.appendChild(icon);

                anchorRemove.appendChild(spanIcon);

                newCell.appendChild(anchorRemove);

            });
        }).catch(function (err) {
            console.log(err);
        });        
    }

    window.listAllPersons = listAllPersons;

    // If there isn't any person in database, add two test person.
    db.allDocs({
        include_docs: true,
        attachments: true
    }).then(function (result) {
        if (result.total_rows === 0) {
            db.put({
                _id: '1',
                name: 'guest',
                surname: 'guest',
                age: '21'
            }).then(function (response) {
                // handle response
            }).catch(function (err) {
                console.log(err);
            });

            db.put({
                _id: '2',
                name: 'guest1',
                surname: 'guest1',
                age: '30'
            }).then(function (response) {
                // handle response
            }).catch(function (err) {
                console.log(err);
            });    
        }

        listAllPersons();
    });     

  })();