package com.conexaoBanco.configuracao;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class configuracaoSenha {

    @Bean
    public PasswordEncoder passwordEncoderLogin(){
        return new BCryptPasswordEncoder();
    }
}
