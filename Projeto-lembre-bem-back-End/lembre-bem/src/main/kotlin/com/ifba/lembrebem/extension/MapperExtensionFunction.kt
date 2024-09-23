package com.ifba.lembrebem.extension

import com.ifba.lembrebem.controller.rest.*
import com.ifba.lembrebem.model.DependenteModel
import com.ifba.lembrebem.model.HorarioLembrete
import com.ifba.lembrebem.model.LembreteModel
import com.ifba.lembrebem.model.TratamentoModel
import java.time.LocalDateTime

fun PostDependenteRequest.mapperDependenteModel(): DependenteModel {
    return DependenteModel(nome = this.nome, dataNascimento = this.dataNascimento, peso = this.peso, comorbidade = this.comorbidade, observacao = this.observacao)
}

fun PutDependenteRequest.mapperDependenteModel(id: Int): DependenteModel {
    return DependenteModel(id = id, nome = this.nome, dataNascimento = this.dataNascimento, peso = this.peso, comorbidade = this.comorbidade, observacao = this.observacao)
}

fun PostTratamentoRequest.mapperTratamentoModel(): TratamentoModel {
    return TratamentoModel(nome = this.nome, quantidade = this.quantidade, unidade = this.unidade, tipo = this.tipo)
}

fun PutTratamentoRequest.mapperTratamentoModel(id: Int): TratamentoModel {
    return TratamentoModel(id = id, nome = this.nome, quantidade = this.quantidade, unidade = this.unidade, tipo = this.tipo)
}

//fun PostLembreteRequest.mapperLembreteModel(dependente: DependenteModel, tratamento: TratamentoModel): LembreteModel {
//    return LembreteModel(
//            dependenteId = dependente,
//            tratamentoId = tratamento,
//            unidade = this.unidade,
//            dose = this.dose,
//            dias = this.dias,
//            horarios = this.horarios.map { it.mapperHorarioLembrete() }
//    )
//}
fun PostLembreteRequest.mapperLembreteModel(dependente: DependenteModel, tratamento: TratamentoModel): LembreteModel {
    return LembreteModel(
            dependenteId = dependente,
            tratamentoId = tratamento,
            unidade = this.unidade,
            dose = this.dose,
            dias = this.dias,
            horarios = this.horarios.map {
                HorarioLembrete(
                        horaLembrete = it.horaLembrete,
                        status = it.status ?: false, // Define um valor padrão se `status` for null
                        horaAplicacao = it.horaAplicacao
                )
            }
    )
}
fun PutLembreteRequest.mapperLembreteModel(id: Int, dependente: DependenteModel, tratamento: TratamentoModel): LembreteModel {
    return LembreteModel(
            id = id,
            dependenteId = dependente,
            tratamentoId = tratamento,
            unidade = this.unidade,
            dose = this.dose,
            dias = this.dias,
            horarios = this.horarios.map { it.mapperHorarioLembrete() }
    )
}

fun HorarioLembreteRequest.mapperHorarioLembrete(): HorarioLembrete {
    return HorarioLembrete(
            horaLembrete = this.horaLembrete,
            status = this.status,
            horaAplicacao = this.horaAplicacao
    )
}