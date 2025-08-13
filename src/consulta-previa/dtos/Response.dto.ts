// dtos/consulta-previa-response.dto.ts
export enum SituacaoConsultaResponse {
  DEFERIDO = 2,
  INDEFERIDO = 3,
  ANALISE_ESPECIAL = 7,
}

export class ControleResponse {
  nu_identificador_orgao: number; // Ex.: ID do órgão
  ds_orgao: string; // Nome do órgão
}

export class DadosRespostaConsultaPrevia {
  co_protocolo_redesim: string;
  dt_evento: string; // Formato 'YYYY-MM-DD HH:MM:SS'
  co_tipo_consulta: number; // 1 = Nome, 2 = Endereço
  co_situacao_consulta: SituacaoConsultaResponse;
  ds_nome_aprovado?: string;
  dt_reserva?: string; // 'YYYY-MM-DD'
  co_motivo_indeferimento?: number;
  ds_observacao?: string;
  ds_classificacao_risco?: string;
}

export class ConsultaPreviaResponseDto {
  controle: ControleResponse;
  dados_resposta_consulta_previa: DadosRespostaConsultaPrevia;
}
