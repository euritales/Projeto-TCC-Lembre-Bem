package com.ifba.lembrebem.model

import com.ifba.lembrebem.enums.TratamentoTipo
import javax.persistence.*

@Entity(name = "tratamento")
data class TratamentoModel(

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Int? = null,

        @Column
        var nome: String,

        @Column
        var quantidade: Int, //estoque

        @Column
        var unidade: String, // mg, gota, comprimido

        @Enumerated(EnumType.STRING)
        @Column
        var tipo: TratamentoTipo //Medicamento, Atividade

)

