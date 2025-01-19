package com.conexaoBanco.controller;


import com.conexaoBanco.instituicao.Instituicao;
import com.conexaoBanco.instituicaoService.InstituicaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequestMapping("/api/instituicao")
@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class InstituicaoController {

    @Autowired
    private InstituicaoService instituicaoService;

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrarInstituicao (@RequestParam("nome") String nome,
                                                   @RequestParam("endereco") String endereco,
                                                   @RequestParam("site") String site,
                                                   @RequestParam("imagem") MultipartFile imagem){

        if (imagem.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Imagem não foi enviada.");
        }

        try{
            Instituicao instituicao = new Instituicao();
            instituicao.setNome(nome);
            instituicao.setEndereco(endereco);
            instituicao.setSite(site);


            Instituicao novaInstituicao  = instituicaoService.cadastrarInstituicao(instituicao, imagem);
            return ResponseEntity.ok(novaInstituicao);

        }catch (IOException e){
            return ResponseEntity.status(500).body("Erro ao salvar imagem");
        }


    }

    @GetMapping("/listar")
    public ResponseEntity<?> listarInstituicoes() {
        return ResponseEntity.ok(instituicaoService.listarInstituicoes());
    }

    @DeleteMapping("/remover/{id}")
    public void removerInstituicao(@PathVariable Long id){
        instituicaoService.removerInstituicao(id);
    }
}
