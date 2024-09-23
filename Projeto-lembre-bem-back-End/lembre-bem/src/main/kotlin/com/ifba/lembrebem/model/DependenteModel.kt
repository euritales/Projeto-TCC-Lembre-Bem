package com.ifba.lembrebem.model

import java.time.LocalDate
import javax.persistence.CollectionTable
import javax.persistence.Column
import javax.persistence.ElementCollection
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.JoinColumn

@Entity(name = "dependente")
data class DependenteModel(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Int? = null,

        @Column
        var nome: String,

        @Column(name = "data_nascimento")
        var dataNascimento: LocalDate,

        @Column
        var peso: String,

        @ElementCollection
        @CollectionTable(name = "dependente_comorbidades", joinColumns = [JoinColumn(name = "dependente_id")])
        @Column(name = "comorbidade")
        var comorbidade: List<String>,

        @Column
        var observacao: String
)

