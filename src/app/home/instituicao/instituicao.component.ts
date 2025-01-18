import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { InstituicaoService } from './instituicao.service'; // O serviço que você está usando

@Component({
  selector: 'app-instituicao',
  templateUrl: './instituicao.component.html',
  styleUrl: './instituicao.component.css'
})
export class InstituicaoComponent implements OnInit {

  instituicoes: any[] = [];
  mostrarFormulario: boolean = false;
  formEnviado: boolean = false;
  formErro: boolean = false;
  formulario!: FormGroup;
  imagemPreview: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private instituicaoService: InstituicaoService){}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      endereco: ['', Validators.required],
      site: ['', [Validators.required, Validators.pattern('https?://.+')]],
      imagem: [' ', [Validators.required]]
    });

    this.carregarInstituicoes();

  }

  carregarInstituicoes(){
    this.http.get('http://localhost:8080/api/instituicao/listar').subscribe((res: any) => {
      this.instituicoes = res;
    });
  }


  onImage(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

      if (!allowedTypes.includes(file.type)) {
        this.formulario.get('imagem')?.setErrors({ invalidFileType: true });
        console.error('Tipo de arquivo inválido. Apenas imagens PNG, JPEG e JPG são permitidas.');


      } else if (file.size > 2 * 1024 * 1024) {
        this.formulario.get('imagem')?.setErrors({ fileTooLarge: true });


      } else {
        this.imagemPreview = URL.createObjectURL(file);
        this.formulario.get('imagem')?.markAsTouched();
        this.formulario.get('imagem')?.setErrors(null);
        this.formulario.get('imagem')?.setValue(file);
      }
    }
  }


  mostrarFormularioModal(){
    this.mostrarFormulario = !this.mostrarFormulario;
    if(this.mostrarFormulario){
      this.imagemPreview = null;
      this.formulario.reset();
      this.formulario.get('imagem')?.setValue(null);

      const fileInput = document.getElementById('imagem') as HTMLInputElement;
      if (fileInput) {
      fileInput.value = '';
    }
    }
  }

  fecharFormulario(){
    this.mostrarFormulario = false;
    this.formEnviado = false;
    this.formErro = false;
    this.imagemPreview = null;

    const fileInput = document.getElementById('imagem') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }

    this.formulario.reset();
  }

  fecharMensagem() {
    this.formEnviado = false;
    this.formErro = false;
  }

  enviarFormulario(){
     if(this.formulario.valid){
      const formData = new FormData();
      formData.append('nome', this.formulario.value.nome);
      formData.append('endereco', this.formulario.value.endereco);
      formData.append('site', this.formulario.value.site);

      const imagem: File = this.formulario.value.imagem;

      if (imagem instanceof File) {
        formData.append('imagem', imagem, imagem.name);
      }else{
        console.error('O campo imagem não é um arquivo válido.');
      }

      this.http.post('http://localhost:8080/api/instituicao/cadastrar', formData).subscribe({
        next: () => {
          this.formEnviado = true;
          this.carregarInstituicoes();
          this.fecharFormulario();
        },

        error: () =>{
          this.formErro = true;
        }
      });

     }else{
      this.formulario.markAllAsTouched();
     }
  }

  excluirInstituicao(id: number): void {
    if (confirm("Tem certeza que deseja excluir esta instituição?")) {
      this.instituicaoService.excluirInstituicao(id).subscribe({
        next: () => {
          this.instituicoes = this.instituicoes.filter(instituicao => instituicao.id !== id);
          alert('Instituição excluída com sucesso!');
        },
        error: () => {
          alert('Erro ao excluir a instituição');
        }
      });
    }
}



  irParaSite(site: string): void {
    window.open(site, '_blank');
  }


}
