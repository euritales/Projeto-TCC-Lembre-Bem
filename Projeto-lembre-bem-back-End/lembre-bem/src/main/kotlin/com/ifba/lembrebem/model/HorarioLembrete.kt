package com.ifba.lembrebem.model

import java.time.LocalDateTime
import java.time.LocalTime
import javax.persistence.*


@Entity(name = "horario_lembrete")
data class HorarioLembrete(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Int? = null,

        @Column
        var horaLembrete: LocalTime, // hora do lembrete

        @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
        var status: Boolean = false, // aplicado ou não

        @Column
        var horaAplicacao: LocalTime? = null // hora em que foi registrada a execução do lembrete
)