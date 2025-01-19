package com.conexaoBanco.instituicaoService;

import com.conexaoBanco.instituicao.Instituicao;
import com.conexaoBanco.instituicao.InstituicaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class InstituicaoService {


    @Autowired
    private InstituicaoRepository instituicaoRepository;

    private static final String UPLOAD_DIR =  "D:/Desktop/Demo/uploads/";


    public Instituicao cadastrarInstituicao(Instituicao instituicao, MultipartFile imagem ) throws IOException{
        if(imagem != null && !imagem.isEmpty()){
            String imagemNome = System.currentTimeMillis() + "_" + imagem.getOriginalFilename();
            Path uploadPath = Paths.get(UPLOAD_DIR);
            Path imagemPatch = Paths.get(UPLOAD_DIR + imagemNome);


            if(!Files.exists(uploadPath)){
                Files.createDirectories(uploadPath);
            }
            Files.createDirectories(imagemPatch.getParent());
            Files.write(imagemPatch, imagem.getBytes());
            instituicao.setImagemNome(imagemNome);

        }
        return instituicaoRepository.save(instituicao);


    }
    public void removerInstituicao(Long id){
        instituicaoRepository.deleteById(id);
    }

    public List<Instituicao> listarInstituicoes(){
        return instituicaoRepository.findAll();
    }

}
