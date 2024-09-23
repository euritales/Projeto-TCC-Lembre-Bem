package com.ifba.lembrebem.service

import com.ifba.lembrebem.enums.TratamentoTipo
import com.ifba.lembrebem.model.LembreteModel
import com.ifba.lembrebem.repository.LembreteRepository
import com.ifba.lembrebem.repository.TratamentoRepository
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import java.time.LocalTime

@Service
class LembreteService(val lembreteRepository: LembreteRepository, val tratamentoRepository: TratamentoRepository) {

    fun cadastrarLembrete(lembrete: LembreteModel) {
        lembreteRepository.save(lembrete)
    }

    fun listarLembrete(): List<LembreteModel> {
        return lembreteRepository.findAll().toList()
    }

    fun buscarLembretePorId(id: Int): LembreteModel {
        return lembreteRepository.findById(id).orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Lembrete não encontrado") }
    }

    fun listarLembretesPorNomeDependente(nomeDependente: String): List<LembreteModel> {
        return lembreteRepository.findByDependenteIdNome(nomeDependente)
    }

    fun listarLembretesAtivosOrdenadosPorHora(): List<LembreteModel> {
        val lembretes = lembreteRepository.findAll().filter { lembrete ->
            lembrete.horarios.any { !it.status }
        }.sortedBy { lembrete ->
            lembrete.horarios.minByOrNull { it.horaLembrete }?.horaLembrete
        }
        return lembretes
    }

    fun atualizarLembrete(lembrete: LembreteModel) {
        if (!lembreteRepository.existsById(lembrete.id!!)) {
            throw ResponseStatusException(HttpStatus.NOT_FOUND, "Lembrete não encontrado")
        }
        lembreteRepository.save(lembrete)
    }

    fun atualizarStatusParaTrue(id: Int, hora: LocalTime) {
        val lembreteOptional = lembreteRepository.findById(id)
        if (lembreteOptional.isPresent) {
            val lembrete = lembreteOptional.get()
            val horario = lembrete.horarios.find { it.horaLembrete == hora }
            if (horario != null) {
                horario.status = true
                horario.horaAplicacao = LocalTime.now()

                // Buscar o tratamento atualizado do banco de dados pelo ID
                val tratamentoId = lembrete.tratamentoId.id!!
                val tratamento = tratamentoRepository.findById(tratamentoId).orElseThrow {
                    ResponseStatusException(HttpStatus.NOT_FOUND, "Tratamento não encontrado")
                }

                // Verificar se o tratamento é do tipo MEDICAMENTO
                if (tratamento.tipo == TratamentoTipo.MEDICAMENTO) {
                    // Subtrair a dose da quantidade de medicamento disponível
                    tratamento.quantidade -= lembrete.dose

                    // Certifique-se de que a quantidade não seja negativa
                    if (tratamento.quantidade < 0) {
                        throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Quantidade insuficiente de medicamento")
                    }

                    // Salvar as alterações no tratamento
                    tratamentoRepository.save(tratamento)
                }

                // Salvar o lembrete atualizado
                lembreteRepository.save(lembrete)
            } else {
                throw ResponseStatusException(HttpStatus.NOT_FOUND, "Horário não encontrado")
            }
        } else {
            throw ResponseStatusException(HttpStatus.NOT_FOUND, "Lembrete não encontrado")
        }
    }


//    fun atualizarStatusParaTrue(id: Int, hora: LocalTime) {
//        val lembreteOptional = lembreteRepository.findById(id)
//        if (lembreteOptional.isPresent) {
//            val lembrete = lembreteOptional.get()
//            val horario = lembrete.horarios.find { it.horaLembrete == hora }
//            if (horario != null) {
//                horario.status = true
//                horario.horaAplicacao = LocalTime.now()
//
//                // Verificar se o tratamento é do tipo MEDICAMENTO
//                val tratamento = lembrete.tratamentoId
//                if (tratamento.tipo == TratamentoTipo.MEDICAMENTO) {
//                    tratamento.quantidade -= lembrete.dose
//
//                    // Certifique-se de que a quantidade não seja negativa
//                    if (tratamento.quantidade < 0) {
//                        throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Quantidade insuficiente de medicamento")
//                    }
//
//                    // Salvar alterações no tratamento
//                    tratamentoRepository.save(tratamento)
//                }
//
//                // Salvar o lembrete atualizado
//                lembreteRepository.save(lembrete)
//            } else {
//                throw ResponseStatusException(HttpStatus.NOT_FOUND, "Horário não encontrado")
//            }
//        } else {
//            throw ResponseStatusException(HttpStatus.NOT_FOUND, "Lembrete não encontrado")
//        }
//    }
//
// ESSSA AQUI
//    fun atualizarStatusParaTrue(id: Int, hora: LocalTime) {
//        val lembreteOptional = lembreteRepository.findById(id)
//        if (lembreteOptional.isPresent) {
//            val lembrete = lembreteOptional.get()
//            val horario = lembrete.horarios.find { it.horaLembrete == hora }
//            if (horario != null) {
//                horario.status = true
//                horario.horaAplicacao = LocalTime.now()
//                lembreteRepository.save(lembrete)
//            } else {
//                throw ResponseStatusException(HttpStatus.NOT_FOUND, "Horário não encontrado")
//            }
//        } else {
//            throw ResponseStatusException(HttpStatus.NOT_FOUND, "Lembrete não encontrado")
//        }
//    }

    fun deletarLembrete(id: Int) {
        if (!lembreteRepository.existsById(id)) {
            throw ResponseStatusException(HttpStatus.NOT_FOUND, "Lembrete não encontrado")
        }
        lembreteRepository.deleteById(id)
    }
}
