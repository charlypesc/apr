import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Perfil } from 'src/app/models/Perfiles/perfil';
import { mailNotificador } from 'src/app/models/notificaciones/mailNotificador';
import { Usuario } from 'src/app/models/usuario';
import { AppService } from 'src/app/services/app.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mail-notificaciones',
  templateUrl: './mail-notificaciones.component.html',
  styleUrls: ['./mail-notificaciones.component.css'],
})
export class MailNotificacionesComponent implements OnInit {
  public formMail!: FormGroup;
  public usuarios$!: Observable<Usuario[] | null>;
  public correos$!: Observable<mailNotificador[] | null>;
  public perfiles$!: Observable<Perfil[] | null>;
  public rbd!: string;
  constructor(private _fb: FormBuilder, private appService: AppService, private loginService: LoginService) {
    this.formMail = this._fb.group({
      Id: [0],
      UsuarioId: new FormControl(),
      PerfilId: new FormControl(),
      Mail: new FormControl(),
      Rbd: new FormControl(),
    });
    this.usuarios$ = this.appService.getDataAction('/Api/Usuario/getUsuarioRbd');
    this.perfiles$ = this.appService.getDataAction('/Api/PerfilesFuncionarios/GetPerfiles');
  }

  ngOnInit(): void {
    this.rbd = this.loginService.getTokenDecoded().Rbd;
    this.getCorreos();
  }
  getCorreos() {
    this.correos$ = this.appService.GetDataAction('/Api/MailNotificador/GetMailNotificadorByRbd', this.rbd);
  }
  agregarNuevoMail() {
    this.formMail.get('Rbd').setValue(this.rbd);
    let oMail = Object.assign({}, this.formMail.value);
    this.appService.NewControl(oMail, '/Api/MailNotificador/PostSubirMailNotificador').subscribe((data) => {
      this.getCorreos();
    });
  }
  delete(opt: number) {
    if (confirm('Deseas borrar la entrada de mail?')) {
      this.appService.deleteActionById('/Api/MailNotificador/DeleteMailNotificadorById', opt).subscribe((data) => {
        this.getCorreos();
      });
    }
  }
}
