package com.conexaoBanco;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.conexaoBanco")
public class conexaoBancoApplication {

    public static void main(String[] args) {
        {
            SpringApplication.run(conexaoBancoApplication.class, args);
        }
    }

}
