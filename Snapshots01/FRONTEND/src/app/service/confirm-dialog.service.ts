import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";
@Injectable({
  providedIn: "root"
})
export class ConfirmDialogService {
  constructor(private modalService: NgbModal) {}

  public confirm(
    title: string,
    message: string,
    btnOkText: string = "OK",
    btnCancelText: string = "Cancel",
    dialogSize: "lg"
  ): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmDialogComponent, {
      size: dialogSize
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }
}
