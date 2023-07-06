import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { TitleAlert } from '../utils/title-alert';
import { TextAlert } from '../utils/text-alert';

const cancelButtonText: string = 'Cancelar';
const confirmButtonText: string = 'Aceptar';

@Injectable({ providedIn: 'root' })
export class AlertService {
  success(text: string = TextAlert.SUCCESS) {
    Swal.fire({
      title: TitleAlert.SUCCESS,
      text,
      icon: 'success',
      confirmButtonText,
    });
  }

  confirm(text: string = TextAlert.DELETE) {
    return Swal.fire({
      title: TitleAlert.CONFIRM,
      text,
      icon: 'info',
      confirmButtonText,
      showCancelButton: true,
      cancelButtonText,
    });
  }

  error(text: string = TextAlert.ERROR) {
    Swal.fire({
      title: TitleAlert.ERROR,
      icon: 'error',
      text,
      confirmButtonText,
    });
  }
}
