package com.ifba.lembrebem.repository

import com.ifba.lembrebem.model.DependenteModel
import org.springframework.data.repository.CrudRepository

interface DependenteRepository :CrudRepository<DependenteModel, Int>{

    fun findBynomeContaining(nome: String): List<DependenteModel>
}