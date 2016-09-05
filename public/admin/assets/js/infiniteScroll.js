// (function(){
//   'use strict';
//
//   angular
//   .module('PDIAPa')
//   .factory('Projetos', function(adminAPI) {
//     var Projetos = function() {
//       this.items = [];
//       this.busy = false;
//       // this.after = '';
//     };
//
//     let items;
//     adminAPI.getTodosProjetos()
//     .success(function(data) {
//       items = data;
//       console.log(items);
//       this.busy = false;
//     }.bind(this));
//
//     let indice = 0;
//
//     Projetos.prototype.nextPage = function() {
//
//       if(indice !== 182) {
//         if (this.busy) return;
//         this.busy = true;
//         console.log("aaa");
//         for (var i = 0; i < 20; i++) {
//           if (indice !== 182) {
//             console.log(indice);
//             this.items.push(items[indice]);
//             indice++;
//           }
//         }
//
//         this.busy = false;
//       }
//
//       // var url = "https://api.reddit.com/hot?after=" + this.after + "&jsonp=JSON_CALLBACK";
//       // $http.jsonp(url).success(function(data) {
//       //   var items = data.data.children;
//       //   for (var i = 0; i < items.length; i++) {
//       //     this.items.push(items[i].data);
//       //   }
//       //   this.after = "t3_" + this.items[this.items.length - 1].id;
//       //   this.busy = false;
//       // }.bind(this));
//
//     };
//
//     return Projetos;
//   });
// })();
