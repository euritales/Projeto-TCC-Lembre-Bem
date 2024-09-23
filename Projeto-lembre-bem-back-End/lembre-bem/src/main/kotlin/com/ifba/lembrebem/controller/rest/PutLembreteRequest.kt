package com.ifba.lembrebem.controller.rest

import com.ifba.lembrebem.enums.TratamentoTipo
import com.ifba.lembrebem.model.DependenteModel
import com.ifba.lembrebem.model.TratamentoModel
import java.time.LocalDate
import java.time.LocalTime
import javax.persistence.*


data class PutLembreteRequest(
        val dependenteId: Int,
        val tratamentoId: Int,
        val unidade: String,
        val dose: Int,
        val dias: List<String>,
        val horarios: List<HorarioLembreteRequest> // lista de horários de aplicação
)