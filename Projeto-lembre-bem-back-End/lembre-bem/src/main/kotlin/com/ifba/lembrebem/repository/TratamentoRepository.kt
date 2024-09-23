package com.ifba.lembrebem.repository

import com.ifba.lembrebem.model.DependenteModel
import com.ifba.lembrebem.model.TratamentoModel
import org.springframework.data.repository.CrudRepository

interface TratamentoRepository :CrudRepository<TratamentoModel, Int>{
    fun findBynomeContaining(nome: String): List<TratamentoModel>
}