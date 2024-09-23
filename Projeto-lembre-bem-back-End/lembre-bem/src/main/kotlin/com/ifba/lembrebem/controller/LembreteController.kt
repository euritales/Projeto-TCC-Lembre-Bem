package com.ifba.lembrebem.controller

import com.ifba.lembrebem.controller.rest.*
import com.ifba.lembrebem.extension.mapperLembreteModel
import com.ifba.lembrebem.model.LembreteModel
import com.ifba.lembrebem.service.DependenteService
import com.ifba.lembrebem.service.LembreteService
import com.ifba.lembrebem.service.TratamentoService
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import java.time.LocalTime

@RestController
@RequestMapping("lembretes")
class LembreteController(
        val lembreteService: LembreteService,
        val dependenteService: DependenteService,
        val tratamentoService: TratamentoService
) {

    @PostMapping("/cadastro")
    @ResponseStatus(HttpStatus.CREATED)
    fun criarLembrete(@RequestBody postLembreteRequest: PostLembreteRequest) {

        val dependente = dependenteService.buscarDependentePorId(postLembreteRequest.dependenteId)
                ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Dependente não encontrado")

        val tratamento = tratamentoService.buscarTratamentoPorId(postLembreteRequest.tratamentoId)
                ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Tratamento não encontrado")

        val lembrete = postLembreteRequest.mapperLembreteModel(dependente, tratamento)
        lembreteService.cadastrarLembrete(lembrete)
    }

    @GetMapping("/all")
    fun listarLembretes(): List<LembreteModel> {
        return lembreteService.listarLembrete()
    }

    @GetMapping("/{id}")
    fun buscarLembretePorId(@PathVariable id: Int): LembreteModel {
        return lembreteService.buscarLembretePorId(id)
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun atualizarLembrete(@PathVariable id: Int, @RequestBody lembrete: PutLembreteRequest) {

        val dependente = dependenteService.buscarDependentePorId(lembrete.dependenteId)
                ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Dependente não encontrado")
        val tratamento = tratamentoService.buscarTratamentoPorId(lembrete.tratamentoId)
                ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Tratamento não encontrado")
        val lembreteModel = lembrete.mapperLembreteModel(id, dependente, tratamento)
        lembreteService.atualizarLembrete(lembreteModel)
    }

    @PutMapping("/lembrete_realizado/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun lembreteAplicado(@PathVariable id: Int, @RequestParam hora: String) {
        val horaLocalTime = LocalTime.parse(hora)
        lembreteService.atualizarStatusParaTrue(id, horaLocalTime)
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deletarLembrete(@PathVariable id: Int) {
        lembreteService.deletarLembrete(id)
    }
}
