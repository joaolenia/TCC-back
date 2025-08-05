## Body Para post da CPV ###
### URL : http://localhost:3000/v1/integracao/consultas-previas ###
```JSON
{
  "controle": {
    "nu_identificador_orgao": 99,
    "ds_orgao": "Junta Comercial do Estado Exemplo"
  },
  "dados_consulta_previa": {
		"id":123,
    "co_protocolo_redesim": "SP20240001234",
    "dt_solicitacao": "2025-08-05 14:30:00",
    "nu_cnpj": "12345678000199",
    "nu_cnpj_matriz": "12345678000199",
    "is_atualizacao_receita": false,
    "solicitante": {
      "nu_cpf": "11122233344",
      "ds_nome": "João da Silva",
      "is_contador": true,
      "nu_ddd_telefone": "11",
      "nu_telefone": "987654321",
      "nu_ramal": "123",
      "ds_email": "joao.silva@contador.com"
    },
    "opcoes_nome": [
      { "ds_opcao_nome": "Tecnologia Inovadora Alfa LTDA" },
      { "ds_opcao_nome": "Soluções Digitais Alfa ME" },
      { "ds_opcao_nome": "Consultoria Alfa Eireli" }
    ],
    "ds_objeto_social": "Desenvolvimento e licenciamento de programas de computador customizáveis; consultoria em tecnologia da informação; e suporte técnico, manutenção e outros serviços em tecnologia da informação.",
    "atividades": [
      {
        "co_cnae": "6201501",
        "is_atividade_principal": true,
        "is_exerce_no_endereco": true,
        "atividades_especializadas": [
          {
            "co_cnae_especializada": "6201-5/01-01",
            "is_atividade_principal": true,
            "is_exerce_no_endereco": true
          }
        ]
      },
      {
        "co_cnae": "6204000",
        "is_atividade_principal": false,
        "is_exerce_no_endereco": true
      }
    ],
    "eventos": [
      { "co_evento": 101 },
      { "co_evento": 244 }
    ],
    "co_natureza_juridica": "2062",
    "co_enquadramento": 1,
    "socios": [
      {
        "ds_nome": "Maria Oliveira",
        "nu_cpf_cnpj": "44455566677",
        "ds_nome_mae": "Ana Oliveira"
      },
      {
        "ds_nome": "Pedro Santos",
        "nu_cpf_cnpj": "77788899900",
        "ds_nome_mae": "Beatriz Santos"
      }
    ],
    "endereco": {
      "co_uf": 35,
      "co_cep": "01001000",
      "co_tipo_imovel": 1,
      "co_tipo_logradouro": 171,
      "ds_tipo_logradouro": "Avenida",
      "ds_endereco": "Paulista",
      "nu_numero": "1578",
      "ds_bairro": "Bela Vista",
      "ds_complemento": "Andar 10; Conjunto 101",
      "co_municipio": 3550308,
      "co_municipio_tom": 1004,
      "nu_area_total": "500.00",
      "nu_area_utilizada": "250.00",
      "ds_ponto_referencia": "Próximo ao metrô Consolação",
      "natureza_imovel": {
        "co_tipo_natureza": "1",
        "nu_inscricao": "001.002.0003-4"
      },
      "coordenadas_geograficas": {
        "nu_latitude": "-23.56138",
        "nu_longitude": "-46.65639"
      }
    },
    "tipo_unidade": [
      { "co_tipo_unidade": 1 }
    ],
    "formas_atuacao": [
      { "co_forma_atuacao": 1 },
      { "co_forma_atuacao": 2 }
    ],
    "utilizacao_solo": {
      "co_utilizacao_solo": 2,
      "nu_autorizacao": "AUT-2024-98765",
      "ds_arquivo": [
        { "ds_url_servico": "https://<url-do-orgao>/v1/arquivos/doc1.pdf" }
      ]
    },
    "questionario": [
      {
        "co_pergunta": 101,
        "ds_pergunta": "O estabelecimento possui publicidade externa?",
        "ds_resposta": "Sim"
      }
    ],
    "nu_cnpj_entidade_registro": "99888777000166",
		 "nu_cnpj_entidade_registro_matriz": "12312312312323",
    "classificacao_risco": {
      "ds_tipo_risco": "Baixo Risco A",
      "pergunta_classificacao_risco": [
        {
          "co_identificador_pergunta": "RISCO01",
          "ds_pergunta": "A atividade envolve produtos inflamáveis?",
          "ds_resposta": "Não"
        }
      ]
    },
    "co_inscricao_municipal": "987654321-0"
  }
}
```
