(function(){
	'use strict';

	angular
	.module('PDIAP')
	.controller('homeCtrl', function($scope, $rootScope, $location, $mdDialog, projetosAPI) {

		var countCertificados = 0;
		var avaliador = undefined;
		var participante = undefined;
		var orientador = [];
		var aluno = [];
		var semanaAcademica = [];
		var saberesDocentes = [];
		var oficina = [];
		var presenca_oficina = undefined;
		var premiados = [];
		var presenca_saberes = undefined;

		var somaHora = function(horaInicio, horaSomada) {
			let horaIni = horaInicio.split(':');
			let horaSom = horaSomada.split(':');
			let horasTotal = parseInt(horaIni[0], 10) + parseInt(horaSom[0], 10);
			let minutosTotal = parseInt(horaIni[1], 10) + parseInt(horaSom[1], 10);
			if(minutosTotal === 60){
				minutosTotal -= 60;
				horasTotal += 1;
			}
			if (minutosTotal.toString().length === 1) {
				minutosTotal = '0'+minutosTotal;
			}
			return horasTotal + ":" + minutosTotal;
		};

		let canvas = document.createElement("canvas");
		let img = document.getElementById("preview");
		canvas.width = img.width;
		canvas.height = img.height;
		let ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0);
		let aaa = canvas.toDataURL();

		var estressado = aaa.length / 2;
		var vsf = aaa.substring(0,estressado);
		var vsf2 = aaa.substring(estressado,aaa.length);
		// window.localStorage.clear();
		// window.sessionStorage.clear();
		var url1 = window.localStorage.getItem('url1');
		if (url1 === null || url1 === undefined) {
			window.localStorage.clear();
			window.localStorage.setItem('url1', vsf);
			console.log('aa');
		}
		var url2 = window.sessionStorage.getItem('url2');
		if (url2 === null || url2 === undefined) {
			window.sessionStorage.clear();
			window.sessionStorage.setItem('url2', vsf2);
			console.log('bb');
		}

		$scope.showLoginDialog = function(ev) {
			$mdDialog.show({
				// controller: () => this,
				templateUrl: '/views/login.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true
			});
		};

		let buscarCPF = function(cpf) {
			projetosAPI.postCertificado(cpf)
			.success(function(data) {
				console.log(data);
				countCertificados = 0;
				if (data.length > 0) {
					let i = data.map(function(e) { return e.tipo; }).indexOf('Avaliador');
					if (i !== -1) {
						countCertificados++;
						avaliador = data[i];
					}
					i = data.map(function(e) { return e.tipo; }).indexOf('Participante');
					if (i !== -1) {
						let evts1 = '';
						let ch1 = '0:00';
						// let evts2 = '';
						let ch2 = '0:00';
						let eventos = '';
						angular.forEach(data[i].eventos, function (value, key){
							countCertificados++;
							if (value.tipo === "Oficina") {
								if (evts1 === '') {
									evts1 = value.titulo;
								} else {
									evts1 = evts1+', '+value.titulo;
								}
								ch1 = somaHora(value.cargaHoraria,ch1);
							} else if (value.tipo === "Seminário Saberes Docentes") {
								if (eventos === '') {
									// evts2 = value.titulo;
									eventos = value.titulo+': '+value.cargaHoraria+'\n';
								} else {
									// evts2 = evts2+', '+value.titulo;
									eventos = eventos + value.titulo+': '+value.cargaHoraria+'\n';
								}
								ch2 = somaHora(value.cargaHoraria,ch2);
							}
						});
						if (evts1 !== '') {
							presenca_oficina = {
								nome: data[i].nome,
								eventos: evts1,
								cargaHoraria: ch1
							};
						}
						if (eventos !== '') {
							presenca_saberes = {
								nome: data[i].nome,
								cargaHoraria: ch2,
								eventos: eventos
							};
						}
					}
					i = data.map(function(e) { return e.tipo; }).indexOf('Projeto');
					if (i !== -1) {
						angular.forEach(data[i].integrantes, function (value, key){
							countCertificados++;
							if (value.tipo === "Orientador") {
								orientador.push(value);
							} else if (value.tipo === "Aluno") {
								aluno.push(value);
							}
						});
					}
					i = data.map(function(e) { return e.tipo; }).indexOf('Evento');
					if (i !== -1) {
						angular.forEach(data[i].evento, function (value, key){
							countCertificados++;
							if (value.tipo === "Semana Acadêmica") {
								semanaAcademica.push(value);
							} else if (value.tipo === "Seminário Saberes Docentes") {
								saberesDocentes.push(value);
							} else if (value.tipo === "Oficina") {
								oficina.push(value);
							}
						});
					}
					i = data.map(function(e) { return e.tipo; }).indexOf('Premiado');
					if (i !== -1) {
						angular.forEach(data[i].projeto, function (value, key){
							countCertificados++;
							premiados.push(value);
						});
					}
					visualizarCertificados(avaliador,participante,orientador,aluno,semanaAcademica,saberesDocentes,oficina,presenca_oficina,premiados,presenca_saberes,countCertificados);
				} else {
					let showAlert = function(ev) {
						$mdDialog.show(
							$mdDialog.alert()
							.parent(angular.element(document.querySelector('#popupContainer')))
							.clickOutsideToClose(false)
							.textContent('O CPF ' +cpf+ ' não possui certificado.')
							.ok('OK')
							.targetEvent(ev)
						);
					};
					showAlert();
				}
			})
			.error(function(status) {
				let showConfirmDialog = function(ev) {
					var confirm = $mdDialog.confirm()
					.title('Oxe...')
					.textContent('Houve algum erro ao enviar o email. Tente mais tarde ou então, entre em contato conosco.')
					.targetEvent(ev)
					.theme('error')
					.ok('Continuar')
					.cancel('Entrar em contato');
					$mdDialog.show(confirm).then(function() {}
					, function() {
						$window.location.href="/contato";
					});
				};
				showConfirmDialog();
			});
		};

		$scope.showEmitCertificate = function(ev) {
			var confirm = $mdDialog.prompt()
			.title('Insira seu CPF')
			.placeholder('CPF')
			.ariaLabel('CPF')
			.targetEvent(ev)
			.ok('Buscar')
			.cancel('Fechar');
			$mdDialog.show(confirm).then(function(result) {
				buscarCPF(result);
			}, function() {});
		};

		let visualizarCertificados = function(avaliador,participante,orientador,aluno,semanaAcademica,saberesDocentes,oficina,presenca_oficina,premiados,presenca_saberes,numCertificados,ev) {
			$mdDialog.show({
				controller: function dialogCertificateController($scope, $window, $mdDialog) {
					$scope.avaliador = [];
					$scope.participante = [];
					$scope.orientador = [];
					$scope.aluno = [];
					$scope.semanaAcademica = [];
					$scope.saberesDocentes= [];
					$scope.oficina = [];
					$scope.presenca_oficina = [];
					$scope.premiados = [];
					$scope.presenca_saberes = [];

					$scope.avaliador = avaliador;
					$scope.participante = participante;
					$scope.orientador = orientador;
					$scope.aluno = aluno;
					$scope.semanaAcademica = semanaAcademica;
					$scope.saberesDocentes= saberesDocentes;
					$scope.oficina = oficina;
					$scope.countCertificados = numCertificados;
					$scope.presenca_oficina = presenca_oficina;
					$scope.premiados = premiados;
					$scope.presenca_saberes = presenca_saberes;

					console.log(presenca_oficina);
					console.log(presenca_saberes);

					// var canvas = document.createElement("canvas");
					// var img = document.getElementById("preview");
					// canvas.width = img.width;
					// canvas.height = img.height;
					// var ctx = canvas.getContext("2d");
					// ctx.drawImage(img, 0, 0);
					// var aaa = canvas.toDataURL();

					var date = new Date();
					var mes = date.getMonth();
					var ano = date.getFullYear();
					if (mes === 0) {
						var mesString = 'janeiro';
					} else if (mes === 1) {
						var mesString = 'fevereiro';
					} else if (mes === 2) {
						var mesString = 'março';
					} else if (mes === 3) {
						var mesString = 'abril';
					} else if (mes === 4) {
						var mesString = 'maio';
					} else if (mes === 5) {
						var mesString = 'junho';
					} else if (mes === 6) {
						var mesString = 'julho';
					} else if (mes === 7) {
						var mesString = 'agosto';
					} else if (mes === 8) {
						var mesString = 'setembro';
					} else if (mes === 9) {
						var mesString = 'outubro';
					} else if (mes === 10) {
						var mesString = 'novembro';
					} else if (mes === 11) {
						var mesString = 'dezembro';
					}

					$scope.emitirCertificado1 = function(tipo,modo,dados) {
						if (tipo === 'Avaliador') {
							var texto = ['Certificamos que ' +dados.nome.toUpperCase()+ ' participou como AVALIADOR (a) de '+
							'trabalhos apresentados na ', {text: 'V MOVACI - Mostra Venâncio-airense de Cultura '+
							'e Inovação, do Instituto Federal de Educação, Ciência e Tecnologia Sul-rio-grandense, ',bold: true},
							'IFSul, Câmpus Venâncio Aires, ocorrida de 28 a 30 de setembro de 2016.\n\n'];
						} else if (tipo === 'Orientador') {
							var texto = ['Certificamos que ' +dados.nome.toUpperCase()+ ' participou como ORIENTADOR (a) do '+
							'projeto ' +dados.nomeProjeto.toUpperCase()+ ' na ', {text: 'V MOVACI - Mostra Venâncio-airense de Cultura '+
							'e Inovação, do Instituto Federal de Educação, Ciência e Tecnologia Sul-rio-grandense, ',bold: true},
							'IFSul, Câmpus Venâncio Aires, ocorrida de 28 a 30 de setembro de 2016.\n\n'];
						} else if (tipo === 'Apresentacao') {
							var texto = ['Certificamos que ' +dados.nome.toUpperCase()+ ' apresentou o projeto '+
							dados.nomeProjeto.toUpperCase()+ ' na ', {text: 'V MOVACI - Mostra Venâncio-airense de Cultura '+
							'e Inovação, do Instituto Federal de Educação, Ciência e Tecnologia Sul-rio-grandense, ',bold: true},
							'IFSul, Câmpus Venâncio Aires, ocorrida de 28 a 30 de setembro de 2016.\n\n'];
						} else if (tipo === 'Premiacao') {
							var texto = ['Certificamos que o projeto ' +dados.nomeProjeto.toUpperCase()+ ' obteve o '+
							dados.colocacao+ 'º LUGAR na categoria ' +dados.categoria.toUpperCase()+ ' e eixo ' +dados.eixo.toUpperCase()+
							', durante a ', {text: 'V MOVACI - Mostra Venâncio-airense de Cultura e Inovação, do Instituto Federal de Educação, '+
							'Ciência e Tecnologia Sul-rio-grandense, ',bold: true}, 'IFSul, Câmpus Venâncio Aires, ocorrida de 28 a 30 de setembro de 2016.\n\n'];
						} else if (tipo === 'Responsavel-saberes') {
							var texto = ['Certificamos que ' +dados.responsavel.toUpperCase()+ ' atuou como conferencista, abordando tema '+
							dados.titulo.toUpperCase()+ ' do Seminário Saberes Docentes, realizado na ', {text: 'V MOVACI - Mostra Venâncio-airense de Cultura '+
							'e Inovação, do Instituto Federal de Educação, Ciência e Tecnologia Sul-rio-grandense, ',bold: true},
							'IFSul, Câmpus Venâncio Aires, ocorrida de 28 a 30 de setembro de 2016.\n\n'];
						} else if (tipo === 'Presenca-oficinas') {
							console.log(dados);
							var texto = ['Certificamos que ' +dados.nome.toUpperCase()+ ' participou da (s) oficina (s) '+
							dados.eventos.toUpperCase()+ ' com carga horária total de ' +dados.cargaHoraria+ ' hora (s), realizada (s) durante a ',
							{text: 'V MOVACI - Mostra Venâncio-airense de Cultura e Inovação, do Instituto Federal de Educação, Ciência e Tecnologia '+
							'Sul-rio-grandense, ',bold: true}, 'IFSul, Câmpus Venâncio Aires, ocorrida de 28 a 30 de setembro de 2016.\n\n'];
						} else if (tipo === 'Responsavel-oficinas') {
							var texto = ['Certificamos que ' +dados.responsavel.toUpperCase()+ ' ofertou a oficina '+
							dados.titulo.toUpperCase()+ ', com carga horária de ' +dados.cargaHoraria+ ' hora (s), durante a ',
							{text: 'V MOVACI - Mostra Venâncio-airense de Cultura e Inovação, do Instituto Federal de Educação, Ciência e Tecnologia '+
							'Sul-rio-grandense, ',bold: true}, 'IFSul, Câmpus Venâncio Aires, ocorrida de 28 a 30 de setembro de 2016.\n\n'];
						} else if (tipo === 'Responsavel-semanaAcademica') {
							var texto = ['Certificamos que ' +dados.responsavel.toUpperCase()+ ' atuou como conferencista, abordando tema '+
							dados.titulo.toUpperCase()+ ', com carga horária de ' +dados.cargaHoraria+ ' hora (s), durante a semana acadêmica, realizada na ',
							{text: 'V MOVACI - Mostra Venâncio-airense de Cultura e Inovação, do Instituto Federal de Educação, Ciência e Tecnologia '+
							'Sul-rio-grandense, ',bold: true}, 'IFSul, Câmpus Venâncio Aires, ocorrida de 28 a 30 de setembro de 2016.\n\n'];
						}

						var url_1 = window.localStorage.getItem('url1');
						var url_2 = window.sessionStorage.getItem('url2');

						var docDefinition = {
							pageSize: 'A4',
							pageOrientation: 'landscape',
							background: [
								{
									image: url_1+url_2,
									width: 841,
									alignment: 'center'
								}
							],
							content: [
								{
									text: texto,
									alignment: 'justify',
									margin: [50,210,50,0],
									fontSize: 16
								},
								{
									text: 'Venâncio Aires, ' +mesString+ ' de '  +ano+ '.',
									alignment: 'center',
									fontSize: 14
								}
							]
						};
						if (modo === 1) {
							pdfMake.createPdf(docDefinition).open();
						} else if (modo === 2) {
							pdfMake.createPdf(docDefinition).download('Certificado_'+tipo+'_MOVACI_2016.pdf');
						}
					}

					$scope.emitirCertificado2 = function(modo,dados) {
						var texto = ['Certificamos que ' +dados.nome.toUpperCase()+ ' participou do IV Seminário Saberes Docentes, com '+
						'carga horária de ' +dados.cargaHoraria+ ' hora (s), nos dias 26 e 27 de setembro de 2016, que integrou a programação da ',
						{text: 'V MOVACI - Mostra Venâncio-airense de Cultura e Inovação, do Instituto Federal de Educação, Ciência e '+
						'Tecnologia Sul-rio-grandense, ',bold: true}, 'IFSul, Câmpus Venâncio Aires, ocorrida de 28 a 30 de setembro de 2016.\n\n'];

						var url_1 = window.localStorage.getItem('url1');
						var url_2 = window.sessionStorage.getItem('url2');

						var canvas1 = document.createElement("canvas");
						var img1 = document.getElementById("verso");
						canvas1.width = img1.width;
						canvas1.height = img1.height;
						var ctx1 = canvas1.getContext("2d");
						ctx1.drawImage(img1, 0, 0);
						var aaa1 = canvas1.toDataURL();

						var docDefinition = {
							pageSize: 'A4',
							pageOrientation: 'landscape',
							background: [
								{
									image: url_1+url_2,
									width: 841,
									alignment: 'center'
								}
							],
							content: [
								{
									text: texto,
									alignment: 'justify',
									margin: [50,210,50,0],
									fontSize: 16
								},
								{
									text: 'Venâncio Aires, ' +mesString+ ' de '  +ano+ '.',
									alignment: 'center',
									fontSize: 14,
									pageBreak: 'after'
								},
								{
									text: dados.eventos+'horas.',
									fontSize: 14,
									background: 'aismdaisd'
								}
							]
						};
						if (modo === 1) {
							pdfMake.createPdf(docDefinition).open();
						} else if (modo === 2) {
							pdfMake.createPdf(docDefinition).download();
						}
					}
					$scope.hide = function() {
						$mdDialog.hide();
					};
					$scope.cancel = function() {
						$mdDialog.cancel();
					};
				},
				templateUrl: 'views/details.certificado.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: false,
				fullscreen: true // Only for -xs, -sm breakpoints.
			});
		};
	});
})();
