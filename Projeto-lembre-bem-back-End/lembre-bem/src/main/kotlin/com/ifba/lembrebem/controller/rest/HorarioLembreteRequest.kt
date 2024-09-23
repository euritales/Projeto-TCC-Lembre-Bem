package com.ifba.lembrebem.controller.rest

import java.time.LocalTime


data class HorarioLembreteRequest(
        val horaLembrete: LocalTime,
        val status: Boolean,
        val horaAplicacao: LocalTime?
)