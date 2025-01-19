                package com.conexaoBanco.controller;


                import com.conexaoBanco.login.Login;
                import com.conexaoBanco.service.usuarioService;
                import com.conexaoBanco.usuario.Usuario;
                import org.springframework.beans.factory.annotation.Autowired;
                import org.springframework.http.HttpStatus;
                import org.springframework.http.ResponseEntity;
                import org.springframework.security.crypto.password.PasswordEncoder;
                import org.springframework.web.bind.annotation.PostMapping;
                import org.springframework.web.bind.annotation.RequestBody;
                import org.springframework.web.bind.annotation.RequestMapping;
                import org.springframework.web.bind.annotation.RestController;

                import java.util.Map;
                import java.util.Optional;

                @RestController
                @RequestMapping("/api/auth")

                public class usuarioController {

                    @Autowired
                    private usuarioService serviceUsuario;

                    @Autowired
                    private PasswordEncoder passwordEncoder;


                    @PostMapping("/cadastro")
                    public ResponseEntity<?> cadastrar(@RequestBody Usuario usuario){
                        Optional<Usuario> usuarioExistente = serviceUsuario.buscarPorEmail(usuario.getEmail());

                        if (usuarioExistente.isPresent()) {
                            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email já cadastrado!");
                        }

                        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
                        Usuario novoUsuario = serviceUsuario.salvarUsuario(usuario);
                        return ResponseEntity.ok(novoUsuario);



                    }

                    @PostMapping("/login")
                    public ResponseEntity<?>login(@RequestBody Login login){
                        Optional<Usuario> usuarioOpt = serviceUsuario.buscarPorEmail(login.getEmail());

                        if(usuarioOpt.isPresent()){
                            Usuario usuario = usuarioOpt.get();

                            if(passwordEncoder.matches(login.getSenha(), usuario.getSenha())){
                                return ResponseEntity.ok(
                                        Map.of("message", "Login bem-sucedido", "token", "seu_token_aqui")
                                );

                            }else{

                                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Senha incorreta");
                            }

                        }else{
                            return  ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario não encontrado");
                        }
                    }






                }
