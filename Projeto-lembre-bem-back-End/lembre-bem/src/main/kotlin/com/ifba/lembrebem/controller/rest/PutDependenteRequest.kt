package com.ifba.lembrebem.controller.rest

import java.time.LocalDate

data class PutDependenteRequest (
        var nome: String,
        var dataNascimento: LocalDate,
        var peso: String,
        var comorbidade: List<String>,
        var observacao: String,
)

