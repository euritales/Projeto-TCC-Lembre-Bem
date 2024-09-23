package com.ifba.lembrebem.controller.rest

import com.ifba.lembrebem.enums.TratamentoTipo
import com.ifba.lembrebem.model.DependenteModel
import java.time.LocalDate

data class PostTratamentoRequest (
        var nome: String,
        var quantidade: Int, //estoque
        var unidade: String, // mg, gota, comprimido
        var tipo: TratamentoTipo //Medicamento, Atividade
)
