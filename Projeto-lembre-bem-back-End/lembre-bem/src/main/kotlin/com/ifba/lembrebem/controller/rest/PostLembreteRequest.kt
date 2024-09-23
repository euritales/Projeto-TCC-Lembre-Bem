package com.ifba.lembrebem.controller.rest

import com.ifba.lembrebem.enums.TratamentoTipo
import com.ifba.lembrebem.model.DependenteModel
import java.time.LocalDate
import java.time.LocalTime

data class PostLembreteRequest(
        val dependenteId: Int,
        val tratamentoId: Int,
        val unidade: String,
        val dose: Int,
        val dias: List<String>,
        val horarios: List<HorarioLembreteRequest> // lista de horários de aplicação
)