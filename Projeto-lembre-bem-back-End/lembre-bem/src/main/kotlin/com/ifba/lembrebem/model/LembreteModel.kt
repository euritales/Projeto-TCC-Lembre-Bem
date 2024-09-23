package com.ifba.lembrebem.model

import java.time.LocalTime
import javax.persistence.*

@Entity(name = "lembrete")
data class LembreteModel(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Int? = null,

        @ManyToOne
        @JoinColumn(name = "dependente_id")
        var dependenteId: DependenteModel,

        @ManyToOne
        @JoinColumn(name = "tratamento_id")
        var tratamentoId: TratamentoModel,

        @Column
        var unidade: String, // mg, gota, comprimido

        @Column
        var dose: Int, // Dose por lembrete

        @ElementCollection
        @CollectionTable(name = "dias_lembrete", joinColumns = [JoinColumn(name = "lembrete_id")])
        @Column(name = "dia")
        var dias: List<String>, // dias da semana para usar

        @OneToMany(cascade = [CascadeType.ALL], orphanRemoval = true)
        @JoinColumn(name = "lembrete_id")
        var horarios: List<HorarioLembrete> = mutableListOf() // lista de horários de aplicação
)
