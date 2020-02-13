const request = require('./utils/gateway');
const _ = require('lodash');
const objectUtil = require('./utils/object');

const url =
	'https://prod.apisemparar.com.br/abastece-ativacao/v1/cliente/listar';

const data = {
	rangeData: {
		dataHoraInicio: '01-01-2020T00:00:01',
		dataHoraFim: '13-02-2020T23:59:59'
	}
};

const obterRegistros = async event => {
	return await request.exec(url, data);
};

const processarRegistros = data => {
	return _.map(data.dados.clientes, registro => {
		let prodSuplementar;
		let clienteVouchers;

		if (_.hasIn(registro, ['oferta', 'plano', 'produtoSuplementar'])) {
			let prod = _.get(registro, 'oferta.plano.produtoSuplementar');
			prodSuplementar = !_.isEmpty(prod) ? prod : null;
		} else {
			prodSuplementar = null;
		}

		if (_.hasIn(registro, ['cliente', 'vouchers'])) {
			let vouchers = _.get(registro, 'cliente.vouchers');
			clienteVouchers = !_.isEmpty(vouchers) ? vouchers : null;
		} else {
			clienteVouchers = null;
		}

		return objectUtil.renameKeys(registro, {
			dataInclusao: 'dataInclusao',
			promotor: 'promotor',
			acao: 'acao',
            idUsuario: 'idUsuario',
            geolocalizacao: 'geolocalizacao',
            codigoEstabelecimento: 'codigoEstabelecimento',
			tipoEstabelecimento: 'tipoEstabelecimento',
			chave: 'chave',
			placaVeiculo: 'placaVeiculo',
			dataModificacao: 'dataModificacao',
			status: 'STATUS',
			nomeVoucher: 'voucher.nomeVoucher',
			flagUtilizacao: 'voucher.flagUtilizacao',
			tipoCombustivel: 'voucher.tipoCombustivel',
			dataIniVigencia: 'voucher.dataIniVigencia',
			identificadorCampanha: 'voucher.identificadorCampanha',
			tipoParceiro: 'voucher.tipoParceiro',
			valorDescontoPercTrans: 'voucher.valorDescontoPercTrans',
			valorMinTransacaoAplicDesc: 'voucher.valorMinTransacaoAplicDesc',
			flagConsumo: 'voucher.flagConsumo',
			dataFimVigencia: 'voucher.dataFimVigencia',
			valorDescontoFixo: 'voucher.valorDescontoFixo',
			quantidadeMinLitrosAplicDesc: 'voucher.quantidadeMinLitrosAplicDesc',
			flagAtivo: 'voucher.flagAtivo',
			quantidadeLitrosDispDesconto: 'voucher.quantidadeLitrosDispDesconto',
			tipoVoucher: 'voucher.tipoVoucher',
			quantidadeSaldoLitrosDispDesc: 'voucher.quantidadeSaldoLitrosDispDesc',
			voucher_placaVeiculo: 'voucher.placaVeiculo',
			valorDescontoLitro: 'voucher.valorDescontoLitro',
			flagPrioridade: 'voucher.flagPrioridade',
			valorSaldoDescontoFixo: 'voucher.valorSaldoDescontoFixo',
			identificador: 'voucher.identificador',
			tipoDescontoVoucher: 'voucher.tipoDescontoVoucher',
			bloqueado: 'dispositivo.bloqueado',
			semTag: 'dispositivo.semTag',
			motivoBloqueio: 'dispositivo.motivoBloqueio',
			identificador: 'dispositivo.identificador',
			oferta_chave: 'oferta.chave',
			cartaoTopUp: 'oferta.conta.cartaoTopUp',
			modalidadePagamento: 'oferta.conta.modalidadePagamento',
			identificadorConta: 'oferta.conta.identificadorConta',
			cartaoTrigger: 'oferta.conta.cartaoTrigger',
			tipoFormaPagamento: 'oferta.conta.tipoFormaPagamento',
			produtoHabilitado: 'oferta.plano.produtoHabilitado',
			oferta_codigo: 'oferta.plano.codigo',
			produtoSuplementar: () =>
				_.chain(prodSuplementar)
					.map(suplementar =>
						objectUtil.renameKeys(suplementar, {
							identificadorProdutoCatalogo: 'identificadorProdutoCatalogo',
							nomeProdutoCatalogo: 'nomeProdutoCatalogo',
							dataNegociacao: 'dataNegociacao',
							nomeUsuarioInclusao: 'nomeUsuarioInclusao',
							codigoGrupoProduto: 'grupoProduto[0].codigoGrupo',
							nomeGrupoProduto: 'grupoProduto[0].nomeGrupo'
						})
					)
					.value(),
			dispositivosAtivos: 'oferta.plano.dispositivosAtivos',
			flagAtivacaoOptIn: 'oferta.flagAtivacaoOptIn',
			oferta_descricao: 'oferta.plano.descricao',
			produto: 'oferta.elegivelAbastece.produto',
			elegivel: 'oferta.elegivelAbastece.elegivel',
			cliente_vouchers: () =>
				_.chain(clienteVouchers)
					.map(voucher =>
						objectUtil.renameKeys(voucher, {
							dataIniVigencia: 'dataIniVigencia',
							tipoParceiro: 'tipoParceiro',
							valorDescontoPercTrans: 'valorDescontoPercTrans',
							valorMinTransacaoAplicDesc: 'valorMinTransacaoAplicDesc',
							identificadorVoucher: 'identificadorVoucher',
							flagAtivo: 'flagAtivo',
							quantidadeLitrosDispDesconto: 'quantidadeLitrosDispDesconto',
							quantidadeSaldoLitrosDispDesc: 'quantidadeSaldoLitrosDispDesc',
							dataAtualizacaoSaldo: 'dataAtualizacaoSaldo',
							valorDescontoLitro: 'valorDescontoLitro',
							valorSaldoDescontoFixo: 'valorSaldoDescontoFixo',
							tipoDescontoVoucher: 'tipoDescontoVoucher',
							numeroIdentificador: 'numeroIdentificador',
							nomeVoucher: 'nomeVoucher',
							tipoCombustivel: 'tipoCombustivel',
							flagUtilizacao: 'flagUtilizacao',
							flagConsumo: 'flagConsumo',
							dataFimVigencia: 'dataFimVigencia',
							valorDescontoFixo: 'valorDescontoFixo',
							quantidadeMinLitrosAplicDesc: 'quantidadeMinLitrosAplicDesc',
							codigoPlaca: 'codigoPlaca',
							identificadorCampanhaVoucher: 'identificadorCampanhaVoucher',
							flagPrioridade: 'flagPrioridade',
							tipoProduto: 'tipoProduto'
						})
					)
					.value(),
			cpf: 'cliente.cliente.cpf',
			clienteDesde: 'cliente.cliente.clienteDesde',
			nome: 'cliente.cliente.nome',
			codigo: 'cliente.cliente.codigo',
			telefone: 'cliente.cliente.telefone',
			sexo: 'cliente.cliente.sexo',
			ranking: 'ranking.ranking',
			ranking_flagPossuiVoucher: 'ranking.flagPossuiVoucher',
			perfilCliente: 'ranking.voucher.perfilCliente',
			ranking_voucher_nomeVoucher: 'ranking.voucher.voucher.nomeVoucher',
			ranking_voucher_flagUtilizacao: 'ranking.voucher.voucher.flagUtilizacao',
			ranking_voucher_tipoCombustivel:
				'ranking.voucher.voucher.tipoCombustivel',
			ranking_voucher_dataIniVigencia:
				'ranking.voucher.voucher.dataIniVigencia',
			ranking_voucher_identificadorCampanha:
				'ranking.voucher.voucher.identificadorCampanha'
		});
	});
};

module.exports = {
	obterRegistros,
	processarRegistros
};
