materialAdmin
    .controller('tableCtrl', function($filter, $sce, $http, $scope, ngTableParams, tableService) {
        var data = tableService.data;
        
        $scope.downloadCsv = function(tipodato, nomefiera){
              var request = {
                tipoDato: tipodato,
                nomeFiera: nomefiera
              };

            $http.post('api/csv', request )
            .success(function(response){
              
                //console.log("chiamata con successo");
                downloadInLocale(response);
                console.log(response);
            })
            .error(function(error){
                console.log("errore");
            }); 
        }

        function downloadInLocale(nomefile){

          var filename = nomefile;
          
          var link = angular.element('<a/>');
          link.attr({
            //href: 'data:attachment/csv;base64,' + encodeURI("/output/"+ filename),
            href: 'output/' + filename,
            target: '_blank',
            download: filename
          })[0].click();
          setTimeout(function(){
            link.remove();
          }, 50);
                

        };

        //Basic Example
        this.tableBasic = new ngTableParams({
            page: 1,            // show first page
            count: 10           // count per page
        }, {
            total: data.length, // length of data
            getData: function ($defer, params) {
                $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        })
        
        //Sorting
        this.tableSorting = new ngTableParams({
            page: 1,            // show first page
            count: 10,           // count per page
            sorting: {
                name: 'asc'     // initial sorting
            }
        }, {
            total: data.length, // length of data
            getData: function($defer, params) {
                // use build-in angular filter
                var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
    
                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        })
        
        //Filtering
        this.tableFilter = new ngTableParams({
            page: 1,            // show first page
            count: 10
        }, {
            total: data.length, // length of data
            getData: function($defer, params) {
                // use build-in angular filter
                var orderedData = params.filter() ? $filter('filter')(data, params.filter()) : data;

                this.id = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                this.name = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                this.email = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                this.username = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                this.contact = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

                params.total(orderedData.length); // set total for recalc pagination
                $defer.resolve(this.id, this.name, this.email, this.username, this.contact);
            }
        })

 //Filtering enrico
        this.tableFilterEnrico = new ngTableParams({
            page: 1,            // show first page
            count: 10
        }, {
            //total: data.length, // length of data // length of data
            getData: function($defer, params) {
                
                $http.get('api/fiere').then(function(response){
                    var dati = response.data;

                    
                       // use build-in angular filter
                    var orderedData = params.filter() ? $filter('filter')(dati, params.filter()) : dati;

                    this._id = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    this.TotSchedeCliente = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    this.TotEmail = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    this.TotFax = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    this.TotTelefono = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

                    params.total(orderedData.length); // set total for recalc pagination
                    //$defer.resolve(this.id, this.name, this.email, this.username, this.contact);
                    $defer.resolve(this._id, this.TotSchedeCliente, this.TotEmail, this.TotFax, this.TotTelefono);

                }); 
                
            }
        })
        
        
        
        //Editable
        this.tableEdit = new ngTableParams({
            page: 1,            // show first page
            count: 10           // count per page
        }, {
            total: data.length, // length of data
            getData: function($defer, params) {
                $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });
    })
