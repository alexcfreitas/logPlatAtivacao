const request = require('./utils/gateway');
const _ = require('lodash');
const objectUtil = require('./utils/object');

const url =
	'https://prod.apisemparar.com.br/abastece-ativacao/v1/cliente/listar';

const data = {
	rangeDataTTL: {
		dataHoraInicio: '2020-04-01',
		dataHoraFim: '2020-05-01'
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
			voucher_identificador: 'voucher.identificador',
			tipoDescontoVoucher: 'voucher.tipoDescontoVoucher',
			bloqueado: 'dispositivo.bloqueado',
			semTag: 'dispositivo.semTag',
			motivoBloqueio: 'dispositivo.motivoBloqueio',
			identificador: 'dispositivo.identificador',
			cartaoTopUp: 'oferta.conta.cartaoTopUp',
			modalidadePagamento: 'oferta.conta.modalidadePagamento',
			identificadorConta: 'oferta.conta.identificadorConta',
			cartaoTrigger: 'oferta.conta.cartaoTrigger',
			tipoFormaPagamento: 'oferta.conta.tipoFormaPagamento',
			produtoHabilitado: 'oferta.plano.produtoHabilitado',
			oferta_codigo: 'oferta.plano.codigo',
			psup: () =>
				_.chain(prodSuplementar)
					.map(suplementar =>
						objectUtil.renameKeys(suplementar, {
							idProdutoCatalogo: 'identificadorProdutoCatalogo',
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
			prod: 'oferta.elegivelAbastece.produto',
			elegivel: 'oferta.elegivelAbastece.elegivel',
			clivouc: () =>
				_.chain(clienteVouchers)
					.map(voucher =>
						objectUtil.renameKeys(voucher, {
							dataIniVigencia: 'dataIniVigencia',
							tipoParceiro: 'tipoParceiro',
							valorDescontoPercTrans: 'valorDescontoPercTrans',
							vlrMinTransacAplicDesc: 'valorMinTransacaoAplicDesc',
							identificadorVoucher: 'identificadorVoucher',
							flagAtivo: 'flagAtivo',
							qtdLitrosDispDesconto: 'quantidadeLitrosDispDesconto',
							qtdSaldoLitrosDispDesc: 'quantidadeSaldoLitrosDispDesc',
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
							qtdMinLitrosAplicDesc: 'quantidadeMinLitrosAplicDesc',
							codigoPlaca: 'codigoPlaca',
							idCampanhaVoucher: 'identificadorCampanhaVoucher',
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
			rank_flagPossuiVoucher: 'ranking.flagPossuiVoucher',
			rank_perfilCliente: 'ranking.voucher.perfilCliente',
			rank_nomeVoucher: 'ranking.voucher.voucher.nomeVoucher',
			rank_flagUtilizacao: 'ranking.voucher.voucher.flagUtilizacao',
			rank_tipoCombustivel:
				'ranking.voucher.voucher.tipoCombustivel',
			rank_dataIniVigencia:
				'ranking.voucher.voucher.dataIniVigencia',
			rank_identificadorCampanha:
                'ranking.voucher.voucher.identificadorCampanha',
			rank_tipoParceiro:
                'ranking.voucher.voucher.tipoParceiro',
			rank_valorDescontoPercTrans:
                'ranking.voucher.voucher.valorDescontoPercTrans',
			rank_vlrMinTransacaoAplicDesc:
                'ranking.voucher.voucher.valorMinTransacaoAplicDesc',
			rank_flagConsumo:
                'ranking.voucher.voucher.flagConsumo',
			rank_dataFimVigencia:
                'ranking.voucher.voucher.dataFimVigencia',
			rank_valorDescontoFixo:
                'ranking.voucher.voucher.valorDescontoFixo',
			rank_qtdMinLitrosAplicDesc:
                'ranking.voucher.voucher.quantidadeMinLitrosAplicDesc',
			rank_flagAtivo:
                'ranking.voucher.voucher.flagAtivo',
			rank_tipoVoucher:
                'ranking.voucher.voucher.tipoVoucher',
			rank_qtdSaldoLitrosDispDesc:
                'ranking.voucher.voucher.quantidadeSaldoLitrosDispDesc',
			rank_placaVeiculo:
                'ranking.voucher.voucher.placaVeiculo',
			rank_valorDescontoLitro:
                'ranking.voucher.voucher.valorDescontoLitro',
			rank_flagPrioridade:
                'ranking.voucher.voucher.flagPrioridade',
			rank_valorSaldoDescontoFixo:
                'ranking.voucher.voucher.valorSaldoDescontoFixo',
			rank_identificador:
                'ranking.voucher.voucher.identificador',
			rank_tipoDescontoVoucher:
				'ranking.voucher.voucher.tipoDescontoVoucher',
            sms_nomeVoucher:'sms.voucher.nomeVoucher',
            sms_flagUtilizacao:'sms.voucher.flagUtilizacao',
            sms_tipoCombustivel:'sms.voucher.tipoCombustivel',
            sms_dataIniVigencia:'sms.voucher.dataIniVigencia',
            sms_identificadorCampanha:'sms.voucher.identificadorCampanha',
            sms_tipoParceiro:'sms.voucher.tipoParceiro',
            sms_valorDescontoPercTrans:'sms.voucher.valorDescontoPercTrans',
            sms_valorMinTransacaoAplicDesc:'sms.voucher.valorMinTransacaoAplicDesc',
            sms_flagConsumo:'sms.voucher.flagConsumo',
            sms_dataFimVigencia:'sms.voucher.dataFimVigencia',
            sms_valorDescontoFixo:'sms.voucher.valorDescontoFixo',
            sms_qtdMinLitrosAplicDesc:'sms.voucher.quantidadeMinLitrosAplicDesc',
            sms_flagAtivo:'sms.voucher.flagAtivo',
            sms_qtdLitrosDispDesconto:'sms.voucher.quantidadeLitrosDispDesconto',
            sms_tipoVoucher:'sms.voucher.tipoVoucher',
            sms_qtdSaldoLitrosDispDesc:'sms.voucher.quantidadeSaldoLitrosDispDesc',
            sms_placaVeiculo:'sms.voucher.placaVeiculo',
            sms_valorDescontoLitro:'sms.voucher.valorDescontoLitro',
            sms_flagPrioridade:'sms.voucher.flagPrioridade',
            sms_valorSaldoDescontoFixo:'sms.voucher.valorSaldoDescontoFixo',
            sms_identificador:'sms.voucher.identificador',
            sms_tipoDescontoVoucher:'sms.voucher.tipoDescontoVoucher',
            sms_identificadorVoucher:'sms.voucher.identificadorVoucher',
            sms_dataAtualizacaoSaldo:'sms.voucher.dataAtualizacaoSaldo',
            sms_numeroIdentificador:'sms.voucher.numeroIdentificador',
            sms_codigoPlaca:'sms.voucher.codigoPlaca',
            sms_idCampanhaVoucher:'sms.voucher.identificadorCampanhaVoucher',
            sms_tipoProduto:'sms.voucher.sms_tipoProduto',
            sms_mensagem:'sms.mensagem',
            sms_status:'sms.status',
            sms_dataEnvio:'sms.dataEnvio',
            veic_semTag:'veiculo.semTag',
            veic_nomeModeloVeiculo:'veiculo.nomeModeloVeiculo',
            veic_tipoCombustivelVeiculo:'veiculo.tipoCombustivelVeiculo',
            veic_dispositivo:'veiculo.dispositivo',
            veic_placaVeiculo:'veiculo.placaVeiculo',
            veic_codigoCliente:'veiculo.codigoCliente',
            veic_nomeFabricante:'veiculo.nomeFabricante',
            veic_corVeiculo:'veiculo.corVeiculo',
            veic_anoFabricacao:'veiculo.anoFabricacao',
            veic_anoModelo:'veiculo.anoModelo',
            erro_dados:'ERRO.dados',
            erro_error:'ERRO.status.error',
            erro_codigoRetorno:'ERRO.status.codigoRetorno',
            erro_mensagem:'ERRO.status.mensagem',

		});
	});
};

module.exports = {
	obterRegistros,
	processarRegistros
};
