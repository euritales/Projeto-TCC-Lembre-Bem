package com.ifba.lembrebem.controller

import com.ifba.lembrebem.controller.rest.PostDependenteRequest
import com.ifba.lembrebem.controller.rest.PostTratamentoRequest
import com.ifba.lembrebem.controller.rest.PutDependenteRequest
import com.ifba.lembrebem.controller.rest.PutTratamentoRequest
import com.ifba.lembrebem.extension.mapperDependenteModel
import com.ifba.lembrebem.extension.mapperTratamentoModel
import com.ifba.lembrebem.model.DependenteModel
import com.ifba.lembrebem.model.TratamentoModel
import com.ifba.lembrebem.service.DependenteService
import com.ifba.lembrebem.service.TratamentoService
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("tratamentos")
class TratamentoController (
        val tratamentoService: TratamentoService
){

    @PostMapping("/cadastro")
    @ResponseStatus(HttpStatus.CREATED)
    fun criarTratamento(@RequestBody tratamento: PostTratamentoRequest){
      tratamentoService.cadastrarTratamento(tratamento.mapperTratamentoModel())
    }

    @GetMapping("/all")
    fun listarTratamentos (@RequestParam nome: String?): List<TratamentoModel> {
        return tratamentoService.listarTratamento(nome);
    }

    @GetMapping("/{id}")
    fun buscarDependentePorId (@PathVariable id: Int):TratamentoModel {
       return tratamentoService.buscarTratamentoPorId(id);
    }


    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun atualizarUsuario (@PathVariable id: Int, @RequestBody tratamento: PutTratamentoRequest) {
         tratamentoService.atualizarTratamento(tratamento.mapperTratamentoModel(id));
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deletarDependente (@PathVariable id: Int) {
        tratamentoService.deletarTratamento(id)
    }
}

