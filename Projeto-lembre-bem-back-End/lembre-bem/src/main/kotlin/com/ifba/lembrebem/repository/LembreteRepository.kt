package com.ifba.lembrebem.repository

import com.ifba.lembrebem.model.LembreteModel
import org.springframework.data.repository.CrudRepository

interface LembreteRepository : CrudRepository<LembreteModel, Int> {
    fun findByDependenteIdNome(nome: String): List<LembreteModel>

}
