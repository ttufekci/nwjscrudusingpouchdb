(function () {
    'use strict';
    
    // indexeddb  
    var db = new PouchDB('persondb');

    var addPersonButton = document.getElementById('addPersonBtn');

    if (addPersonButton) {
        addPersonButton.addEventListener('click', openPersonForm);
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
                
                var updatebutton = document.createElement("BUTTON");
                updatebutton.innerText = 'Update';
                updatebutton.className = 'button';
                updatebutton.onclick = function () {
                    removePerson(myid);
                }
    
                newCell.appendChild(updatebutton);                  
                
                // Insert a cell in the row at index 0
                newCell  = newRow.insertCell(5);
                
                var removebutton = document.createElement("BUTTON");
                removebutton.innerText = 'Remove';
                removebutton.className = 'button';
                removebutton.onclick = function () {
                    removePerson(myid);
                }
    
                newCell.appendChild(removebutton);              
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