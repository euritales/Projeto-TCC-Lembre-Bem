package com.ifba.lembrebem.controller.rest

import com.ifba.lembrebem.enums.TratamentoTipo
import java.time.LocalDate

data class PutTratamentoRequest (
        var nome: String,
        var quantidade: Int, //estoque
        var unidade: String, // mg, gota, comprimido
        var tipo: TratamentoTipo //Medicamento, Atividade
)

