package com.ifba.lembrebem.service

import com.ifba.lembrebem.model.DependenteModel
import com.ifba.lembrebem.repository.DependenteRepository
import com.ifba.lembrebem.repository.LembreteRepository
import org.springframework.stereotype.Service
import java.lang.Exception
import java.util.Optional

@Service
class DependenteService (val dependenteRepository: DependenteRepository,  val lembreteRepository: LembreteRepository) {

    val dependentes = mutableListOf<DependenteModel>()

    fun cadastrarDependente( dependente: DependenteModel){
        dependenteRepository.save(dependente);
    }

    fun listarDependentes ( nome: String?): List<DependenteModel> {
        nome?.let{
            return dependenteRepository.findBynomeContaining(nome);
        }
        return dependenteRepository.findAll().toList();
    }
    fun buscarDependentePorId ( id: Int): DependenteModel {
       return dependenteRepository.findById(id).orElseThrow();
    }

    fun atualizarDependente ( dependente: DependenteModel) {
      if(!dependenteRepository.existsById(dependente.id!!)){
          throw Exception()
      }
        dependenteRepository.save((dependente));
    }
//    fun deletarDependente ( id: Int) {
//        if(!dependenteRepository.existsById(id)){
//            throw Exception()
//        }
//        dependenteRepository.deleteById(id);
//    }

    fun deletarDependente(id: Int) {
        val dependente = dependenteRepository.findById(id).orElseThrow {
            Exception("Dependente não encontrado")
        }
        val lembretes = lembreteRepository.findByDependenteIdNome(dependente.nome)

        lembreteRepository.deleteAll(lembretes)
        dependenteRepository.deleteById(id)
    }
}