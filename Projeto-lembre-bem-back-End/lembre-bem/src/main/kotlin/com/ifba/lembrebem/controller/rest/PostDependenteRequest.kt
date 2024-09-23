package com.ifba.lembrebem.controller.rest

import com.ifba.lembrebem.model.DependenteModel
import java.time.LocalDate

data class PostDependenteRequest (
        var nome: String,
        var dataNascimento: LocalDate,
        var peso: String,
        var comorbidade: List<String>,
        var observacao: String,
)

