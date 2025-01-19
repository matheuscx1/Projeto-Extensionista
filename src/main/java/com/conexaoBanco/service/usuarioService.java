package com.conexaoBanco.service;

import com.conexaoBanco.usuario.Usuario;
import com.conexaoBanco.usuario.usuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class usuarioService {

    @Autowired
    private usuarioRepository repoUsuario;

    public Usuario salvarUsuario(Usuario salvarUsuario){
        return repoUsuario.save(salvarUsuario);
    }

    public Optional<Usuario> buscarPorEmail(String email){
        return repoUsuario.findByEmail(email);
    }
}
