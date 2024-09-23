package com.ifba.lembrebem.controller

import com.ifba.lembrebem.controller.rest.PostDependenteRequest
import com.ifba.lembrebem.controller.rest.PutDependenteRequest
import com.ifba.lembrebem.extension.mapperDependenteModel
import com.ifba.lembrebem.model.DependenteModel
import com.ifba.lembrebem.service.DependenteService
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
@RequestMapping("dependentes")
class DependenteController (
        val dependenteService: DependenteService
){
    val dependentes = mutableListOf<DependenteModel>()

    @PostMapping("/cadastro")
    @ResponseStatus(HttpStatus.CREATED)
    fun criarDependente(@RequestBody dependente: PostDependenteRequest){
      dependenteService.cadastrarDependente(dependente.mapperDependenteModel())
    }

    @GetMapping("/all")
    fun listarDependentes (@RequestParam nome: String?): List<DependenteModel> {
        return dependenteService.listarDependentes(nome);
    }

    @GetMapping("/{id}")
    fun buscarDependentePorId (@PathVariable id: Int):DependenteModel {
       return dependenteService.buscarDependentePorId(id);
    }


    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun atualizarUsuario (@PathVariable id: Int, @RequestBody dependente: PutDependenteRequest) {
         dependenteService.atualizarDependente(dependente.mapperDependenteModel(id));
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deletarDependente (@PathVariable id: Int) {
        dependenteService.deletarDependente(id)
    }
}

