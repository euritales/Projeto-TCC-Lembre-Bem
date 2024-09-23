package com.ifba.lembrebem.service

import com.ifba.lembrebem.model.DependenteModel
import com.ifba.lembrebem.model.TratamentoModel
import com.ifba.lembrebem.repository.DependenteRepository
import com.ifba.lembrebem.repository.LembreteRepository
import com.ifba.lembrebem.repository.TratamentoRepository
import org.springframework.stereotype.Service
import java.lang.Exception
import java.util.Optional

@Service
class TratamentoService (val tratamentoRepository: TratamentoRepository,  val lembreteRepository: LembreteRepository) {

    fun cadastrarTratamento( tratamento: TratamentoModel){
        tratamentoRepository.save(tratamento);
    }

    fun listarTratamento ( nome: String?): List<TratamentoModel> {
        nome?.let{
            return tratamentoRepository.findBynomeContaining(nome);
        }
        return tratamentoRepository.findAll().toList();
    }
    fun buscarTratamentoPorId ( id: Int): TratamentoModel {
       return tratamentoRepository.findById(id).orElseThrow();
    }

    fun atualizarTratamento ( tratamento: TratamentoModel) {
      if(!tratamentoRepository.existsById(tratamento.id!!)){
          throw Exception()
      }
        tratamentoRepository.save((tratamento));
    }
//    fun deletarTratamento ( id: Int) {
//        if(!tratamentoRepository.existsById(id)){
//            throw Exception()
//        }
//        tratamentoRepository.deleteById(id);
//    }
    fun deletarTratamento(id: Int) {
        val tratamento = tratamentoRepository.findById(id).orElseThrow {
            Exception("Tratamento não encontrado")
        }
        val lembretes = lembreteRepository.findAll().filter { it.tratamentoId.id == id }
        lembreteRepository.deleteAll(lembretes)
        tratamentoRepository.deleteById(id)
    }
}